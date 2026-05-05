+++
title = "Rebuilding pmoscode.dev: From hugo-theme-stack to a Fully Custom Theme"
date = 2026-05-04
author = "pmoscode"
description = "How and why I rebuilt this blog from scratch — ditching a third-party Hugo theme for a fully custom one, and adding a proper multi-environment CI/CD pipeline."
categories = ["Computer"]
tags = ["hugo", "web", "development", "css", "cicd"]
featured = true
editors_pick = false
trending = false
inspiration = false
summary = "This blog just got a major overhaul. Same Hugo engine under the hood, but the theme and the pipeline were rebuilt from scratch. Here's how and why."
+++

If you have visited this blog before, you might notice things look a little different. That's because basically
everything was rebuilt — from the visual design to the deployment pipeline. Here's the full story.

## Where We Came From (v1)

The previous version of this site was already built with [Hugo](https://gohugo.io/), the Go-based static site generator.
Content as Markdown, fast builds, no database — all the things you'd want from a personal blog. For the theme, I
used [hugo-theme-stack](https://github.com/CaiJimmy/hugo-theme-stack) by CaiJimmy: a polished, feature-rich theme that
handles a lot out of the box — reading time, table of contents, related posts, Giscus comments, dark mode, the works.

The site lived at `pmoscode.dev`. It worked fine. So why change anything?

## The Problem with "Fine"

The short answer: ownership and flexibility.

hugo-theme-stack is a great theme, but it's someone else's code. Every layout decision, every color, every piece of HTML
is theirs. Customizing beyond the config file means either forking the theme or fighting against it with overrides. The
theme is also delivered as a **Hugo Module** (a Go module), which means a `go.mod`, a `go.sum`, and a `_vendor/`
directory just to manage a theme dependency. For a personal blog, that felt like too much overhead.

Beyond that, I wanted a proper **multi-environment setup** (development, staging, production) and — frankly — the
satisfaction of building something from scratch.

## The New Stack (v2)

The core stays the same: [Hugo](https://gohugo.io/). But everything around it changed.

### A Fully Custom Theme

The new `pmoscode-theme` is written entirely from scratch — **vanilla CSS, vanilla JavaScript, zero external
dependencies**. No SCSS, no TypeScript, no npm, no `node_modules`. The design is inspired by
the [Katen](https://themeforest.net/item/katen-personal-blog-html-template) HTML template: coral-red accent color (
`#f75c5c`), dark blue headings, clean card layout, wave SVG dividers.

A few things that came for free by owning the theme:

- **Dark mode** toggle without any framework overhead
- **JSON-powered search overlay** built on Hugo's output formats
- **Custom shortcodes** for floating images (`img`), side-by-side image rows (`imgrow`), and videos
- Exactly the partials I need — nothing more

The CSS lives in a single `main.css` file. If something looks wrong, I know exactly where to look.

### Multi-Environment CI/CD

The Hugo config is now split across three environments:

| Environment   | Base URL         | Build drafts | Comments           | Analytics |
|---------------|------------------|--------------|--------------------|-----------|
| `development` | `localhost:1313` | yes          | Giscus (dev repo)  | off       |
| `staging`     | staging URL      | no           | off                | off       |
| `production`  | `pmoscode.dev`   | no           | Giscus (prod repo) | Matomo    |

Deployments are handled by GitHub Actions. A push to the `main` branch triggers a staging build; creating a version
tag (`v*.*.*`) triggers a production deploy via SFTP. Tasks like starting a local dev server, building, or deploying are
managed with [Taskfile](https://taskfile.dev/) — a clean YAML-based alternative to Makefiles.

### Analytics: Matomo (as Before)

[Matomo](https://matomo.org/) was already running in v1 — a self-hosted, privacy-respecting analytics platform. It
carries over unchanged into v2.

### Comments: Giscus (Again)

[Giscus](https://giscus.app/) stays. It maps blog post comments to GitHub Discussions, which means no separate database,
no spam problem, and commenters need a GitHub account — a reasonable filter for a technical blog.

## Content Migration

Since both versions use Hugo Page Bundles, migrating content was mostly a matter of copying directories and adjusting
front matter fields. The main structural difference: v1 organized posts by year (`post/2017/`, `post/2020/`, ...), while
v2 uses a flat `posts/` directory. Slugs and URLs were kept consistent where possible to avoid breaking old links.

## Was It Worth It?

For a pure cost/benefit calculation: probably not. The old site worked. But this was never purely about functionality.
Building the theme from scratch meant learning where Hugo's template system actually draws the line between layouts,
partials, and shortcodes. Owning every line of CSS means the site loads exactly what it needs. And having a CI/CD
pipeline that I understand end-to-end makes future changes feel much less risky.

If you're considering a similar move: if you're happy with hugo-theme-stack (or any other third-party theme), stay with
it — it's genuinely good. But if you find yourself fighting the theme more than writing content, building your own is a
worthwhile exercise.

The source for this site is on [GitHub](https://github.com/pmoscode/pmoscode-website-v2) if you want to dig into the
details.
