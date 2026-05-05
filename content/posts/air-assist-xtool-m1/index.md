+++
title        = "DIY Air Assist for the xTool M1"
date         = 2023-03-09
author       = "pmoscode"
description  = "Fix the design flaw of the xTool M1 – weak air flow leaves dust on every cut."
categories   = ["Lasercutter", "Hardware"]
tags         = ["mod"]
featured     = true

summary      = "The xTool M1 leaves a dark dust trail on every cut. Makerblock's official fix costs €159. Mine cost €30 – and works just as well."
+++

It has been a long-awaited dream of mine to own a laser cutter to cut or engrave lots of awesome things.
For a very long time, most laser cutters were too expensive or did poorly in the ratings. That meant: wait and see...

...until I came across a Kickstarter campaign that changed all that.

## The Story

It is the xTool M1 from Makerblock, which I supported via **[Kickstarter](https://www.kickstarter.com/projects/makeblock/xtool-m1-superb-hybrid-laser-and-blade-cutter-and-engraver/description)**.
This project was successfully funded on 12/10/2021.

On May 30th, 2022 I held the long-awaited device in my hands. After unpacking I tried it right away.
It ran straight away, and I was also able to engrave/cut a few sample designs with the materials that came with it.

{{< divider >}}

## The Problem

So far so good…

What I noticed relatively quickly was the fact that the laser left a relatively dark trail of dust after the burning process. This was always aligned to the north – i.e. as seen from the laser head.

{{< img src="img/dust.jpg" alt="Dust trail left by the laser" >}}

The more I worked with the laser cutter, the more this discoloration bothered me. I was able to mitigate the whole thing a bit by wiping the spots with a damp sponge.
But that's not the point. Something like this shouldn't even happen...

The announcement of Makerblock on Kickstarter on September 7th, 2022 surprised me all the more. Because a so-called "Air Assist Set" was **[announced](https://www.kickstarter.com/projects/makeblock/xtool-m1-superb-hybrid-laser-and-blade-cutter-and-engraver/posts/3602265)**, which was supposed to eliminate this problem.

Here in Germany, this device should cost €159. In the end it was an air blower mounted around the laser lens. It then blows air, which gets the fine dust away from the material better.

I have my own opinion on this design flaw. But I'm not willing to pay €160 for a fix that should have been done before the devices were shipped to the backers.

{{< divider >}}

## The Solution

That's why I started looking for an alternative to this "Air Assist".

I found what I was looking for on **[Thingiverse](https://www.thingiverse.com/thing:5493245)**:

{{< img src="img/thingiverse-1.png" alt="Air Assist on Thingiverse" >}}

This is exactly what is sold by Makerblock, except it mounts to the laser head a little differently.

So I printed it on my 3D printer and assembled it. It attached very well to the lower part of the laser head – the existing screws were simply reused.

{{< img src="img/thingiverse-2.png" alt="Mounted to the laser head" >}}

Then I ordered a rubber hose (actually intended for a **[windshield washer](https://www.amazon.de/dp/B08ZHL16BS)**) and two **[12V air pumps](https://www.amazon.de/dp/B0786L1C3R)**:

{{< imgrow "img/pump.jpg" "img/hose.jpg" >}}

After everything arrived, I started to assemble all the stuff. This is how it looks now:

{{< imgrow "img/hose_connection.jpg" "img/hose_corner.jpg" >}}

{{< imgrow "img/hose_mount.jpg" "img/pumps_assembled.jpg" >}}

These simple air pumps don't have the air flow rate of the real "Air Assist", but it is enough for now. The result is perfect:

{{< imgrow "img/material_dusty.jpg" "img/material_clean.jpg" >}}

Both side by side:

{{< img src="img/comparison.jpg" alt="Before/after comparison" >}}

I will also build a case for it with a power switch to make it look nice and tidy. And then I must not forget to turn it on...

{{< divider >}}

## Conclusion

For around €30 you get the same result as with the official Air Assist. So it was worth it.
