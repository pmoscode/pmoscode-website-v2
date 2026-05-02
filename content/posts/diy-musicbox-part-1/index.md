+++
title        = "DIY Music Box – Part 1"
date         = 2023-01-31
author       = "pmoscode"
description  = "A DIY music box for children based on Raspberry Pi Zero."
categories   = ["Hardware", "Lasercutter"]
tags         = ["raspberry-pi", "gift"]
featured     = false
editors_pick = true
trending     = false
inspiration  = true
draft        = true
summary      = "A handmade wooden music box for children – driven by Raspberry Pi Zero, NFC cards, HiFiBerry DAC and laser-cut cottonwood panels. Part 1: hardware, case design and laser cutting."
+++

It is a good choice to let children read books. But when they are very young and can't read yet, it's better to let them listen to stories, tales or music.

There are many "Music Boxes" out there you can buy, but why not do it yourself and add some personal touch?

So, let's get to it...

## The Idea

It should be something like the [Toniebox](https://tonies.com). But just to buy it was way too easy, and one wouldn't learn anything...
And the main issue when buying something: There is no personal touch...

So, the idea was born – and luckily very early, because it took "some" time to get it done...

After some brainstorming with myself, I wrote down some rough points.
It should...

* ...consist of wood
* ...have a simple but "breakable" power connection (wire)
* ...have a battery (so: be portable)
* ...have some buttons (probably volume and back/forward)
* ...be easy to use
* ...work with NFC to distinguish between the audio files (music tracks or audiobooks)

This was my starting point.

## The Hardware

### The Components

The main target was: It should be lightweight and stable...

| Component                | Product                                      | Link                                                                                                             |
|--------------------------|----------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| "Machine"                | Raspberry Pi Zero W                          | [BerryBase](https://www.berrybase.de/raspberry-pi-zero-wh)                                                       |
| Power-bank               | Green Cell Powerbank GC PowerPlay20 20000mAh | [Amazon](https://smile.amazon.de/gp/product/B08BPJ9QW3)                                                          |
| RFID reader              | RFID Kit RC522                               | [AZ-Delivery](https://www.az-delivery.de/products/rfid-set)                                                      |
| Speaker                  | Diameter: 80mm                               | (from old PC speakers)                                                                                           |
| Audio-DAC                | HifiBerry DAC Zero                           | [BuyZero.de](https://buyzero.de/products/hifiberry-dac-zero-raw)                                                 |
| Mini Amp.                | PAM8403                                      | [Eckstein-shop](https://eckstein-shop.de/PAM8403VolumeAdjustment2-KanalDigitalAmplifierModuleAudioverstC3A4rker) |
| Battery Expansion Shield | 18650 V3                                     | [AZ-Delivery](https://www.az-delivery.de/products/battery-expansion-shield-18650-v3-inkl-usb-kabel)              |
| Buttons                  | Arcade buttons 24mm                          | [Amazon](https://smile.amazon.de/UYUYong-Schalter-Arcade-Taste-Druckknopf-Kampfspiele/dp/B09T5VXG8Z)            |

Pictures of the components:

![Raspberry Pi Zero WH](img/RaspiZero.jpg) ![Powerbank](img/Powerbank.jpg)

![RFID RC522](img/RFID_RC522.webp) ![DAC Zero](img/DACPZ.webp)

![PAM8403](img/pam8403_amplifier.webp) ![Battery Expansion Shield](img/BatteryExpansionShield18650.webp)

![Arcade Buttons](img/Buttons.jpg)

> **Note:** I recommend a PowerBank with Pass-Through capability to charge and power the Pi simultaneously. Otherwise, you will need the Battery Expansion Shield.

### The Wiring

Now the fun part: putting the hardware together.

*(Fritzing wiring diagram will follow in Part 2)*

## The Case

The case should be simple and made from wood. Every part should have enough space to fit.
Because there will be only one access point – at the bottom – the placement of the parts is very important.
Ideally the Raspi should be mounted on the side wall, the RFID reader on top – of course – and the power bank on the bottom for easy removal.

### Fusion 360

With all that in mind, I started with a first sketch in Fusion 360. For better visualization, I got some 3D models for the Raspberry Pi Zero and the RFID reader. For all remaining parts, I got the measurements and created simple cube mock objects.

Basically, the case is just a cube. For a 3D printer this wouldn't necessarily be a problem. But for a wood case, the connections have to be strong. Simple gluing, dowels or nailing wouldn't be enough here.
Instead, finger joints proved to be ideal. Fortunately, there is a suitable plugin for Fusion 360:

[https://github.com/FlorianPommerening/FingerJoints](https://github.com/FlorianPommerening/FingerJoints)

Once the cube was finished, the positions for the wooden plates, buttons, power connector and base plate were added.

![Fusion 360 Model](img/fusion360-box.png)

The next step was to export all surfaces to Inkscape for further processing...

### Inkscape

Once imported into Inkscape, all areas to be engraved were given the appropriate SVG graphics. For example:
The front features a house with children playing, and the sides feature a sunflower encasing the speakers.

![Front design](img/Vorn.svg) ![Side design](img/Seite.svg)

The challenging part here wasn't piecing the graphics together in Inkscape but finding the right graphics.

### xTool M1

For this I used 6 mm cottonwood as the material. I set up everything with xTool's own software from Makerblock.
It was very straightforward. The result (here already assembled):

![Final box](img/box-final.jpg)

The only flaw was the dust the laser left (you can see it around the finger joints). I managed this a little later –
you can read about it [here](/posts/air-assist-xtool-m1/).

## Conclusion

That was part one of my documentation. So far it's been exciting, challenging, and I've learned a lot about CAD drawings, SVG and lasers.

Part two will follow soon. It deals with the software and details of the assembly.
