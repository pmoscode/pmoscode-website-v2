#!/usr/bin/env python3
"""
transcribe.py – Audio/Video transcription via OpenAI Whisper

Usage:
    python transcribe.py <input_file> [options]

Examples:
    python transcribe.py interview.mp4
    python transcribe.py podcast.mp3 --model medium --language de --format srt
    python transcribe.py video.mov --format txt --model large
"""

import argparse
import json
import os
import sys
import tempfile

import ffmpeg
import whisper


# ── Supported formats ────────────────────────────────────────────────────────

SUPPORTED_INPUT = {
    ".mp3", ".mp4", ".m4a", ".wav", ".ogg", ".flac",
    ".mov", ".mkv", ".avi", ".webm", ".aac",
}

OUTPUT_FORMATS = ("txt", "srt", "vtt", "json")

MODELS = ("tiny", "base", "small", "medium", "large")


# ── Helpers ──────────────────────────────────────────────────────────────────

def extract_audio(input_path: str, tmp_path: str) -> str:
    """Extract mono 16 kHz WAV from any audio/video file via ffmpeg."""
    print(f"[ffmpeg] Extracting audio from: {input_path}")
    (
        ffmpeg
        .input(input_path)
        .output(tmp_path, ac=1, ar=16000, format="wav")
        .overwrite_output()
        .run(quiet=True)
    )
    return tmp_path


def format_timestamp(seconds: float) -> str:
    """Convert float seconds to SRT/VTT timestamp string (HH:MM:SS,mmm)."""
    ms = int(round(seconds * 1000))
    h, ms = divmod(ms, 3_600_000)
    m, ms = divmod(ms, 60_000)
    s, ms = divmod(ms, 1_000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def format_timestamp_vtt(seconds: float) -> str:
    """VTT uses dots instead of commas."""
    return format_timestamp(seconds).replace(",", ".")


def write_txt(segments, out_path: str) -> None:
    with open(out_path, "w", encoding="utf-8") as f:
        for seg in segments:
            f.write(seg["text"].strip() + "\n")


def write_srt(segments, out_path: str) -> None:
    with open(out_path, "w", encoding="utf-8") as f:
        for i, seg in enumerate(segments, start=1):
            f.write(f"{i}\n")
            f.write(f"{format_timestamp(seg['start'])} --> {format_timestamp(seg['end'])}\n")
            f.write(seg["text"].strip() + "\n\n")


def write_vtt(segments, out_path: str) -> None:
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("WEBVTT\n\n")
        for i, seg in enumerate(segments, start=1):
            f.write(f"{i}\n")
            f.write(f"{format_timestamp_vtt(seg['start'])} --> {format_timestamp_vtt(seg['end'])}\n")
            f.write(seg["text"].strip() + "\n\n")


def write_json(result: dict, out_path: str) -> None:
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)


WRITERS = {
    "txt":  write_txt,
    "srt":  write_srt,
    "vtt":  write_vtt,
    "json": write_json,
}


# ── Main ─────────────────────────────────────────────────────────────────────

def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Transcribe audio/video files using OpenAI Whisper.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument("input", help="Path to the input audio or video file.")
    parser.add_argument(
        "--model", "-m",
        choices=MODELS,
        default="base",
        help="Whisper model size (default: base).",
    )
    parser.add_argument(
        "--language", "-l",
        default=None,
        help="Language code, e.g. 'de', 'en'. Auto-detected if omitted.",
    )
    parser.add_argument(
        "--format", "-f",
        choices=OUTPUT_FORMATS,
        default="txt",
        dest="fmt",
        help="Output format (default: txt).",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()

    # ── Validate input ───────────────────────────────────────────────────────
    input_path = os.path.abspath(args.input)
    if not os.path.isfile(input_path):
        print(f"Error: File not found: {input_path}", file=sys.stderr)
        sys.exit(1)

    ext = os.path.splitext(input_path)[1].lower()
    if ext not in SUPPORTED_INPUT:
        print(
            f"Error: Unsupported file type '{ext}'.\n"
            f"Supported: {', '.join(sorted(SUPPORTED_INPUT))}",
            file=sys.stderr,
        )
        sys.exit(1)

    # ── Determine output path (next to input file) ───────────────────────────
    base = os.path.splitext(input_path)[0]
    out_path = f"{base}.{args.fmt}"

    # ── Extract audio to temp WAV ────────────────────────────────────────────
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
        tmp_wav = tmp.name

    try:
        extract_audio(input_path, tmp_wav)

        # ── Load model & transcribe ──────────────────────────────────────────
        print(f"[whisper] Loading model: {args.model}")
        model = whisper.load_model(args.model)

        transcribe_kwargs = {"fp16": False}
        if args.language:
            transcribe_kwargs["language"] = args.language

        print(f"[whisper] Transcribing…")
        result = model.transcribe(tmp_wav, **transcribe_kwargs)

        detected = result.get("language", "unknown")
        if not args.language:
            print(f"[whisper] Detected language: {detected}")

        # ── Write output ─────────────────────────────────────────────────────
        writer = WRITERS[args.fmt]
        if args.fmt == "json":
            writer(result, out_path)
        else:
            writer(result["segments"], out_path)

        print(f"[done] Output written to: {out_path}")

    finally:
        if os.path.exists(tmp_wav):
            os.remove(tmp_wav)


if __name__ == "__main__":
    main()
