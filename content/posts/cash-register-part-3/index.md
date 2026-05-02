+++
title        = "DIY Cash Register Toy – Part 3 (Testing)"
date         = 2022-06-29
author       = "pmoscode"
description  = "Third part of the DIY cash register toy. Thermal printer graphics and LCD display."
categories   = ["Hardware"]
tags         = ["raspberry-pi", "mod"]
featured     = false
editors_pick = false
trending     = false
inspiration  = false
summary      = "Printing graphics with the thermal printer via CUPS on Raspberry Pi – plus testing the 128×64 LCD display as a drop-in replacement with the ST7920 driver."
+++

In this article I will continue to write about my testing of the components for the DIY cash register – starting with the configuration of the thermal printer to print graphics...

This article continues the tests from [Part 2](/posts/cash-register-part-2/).

## Thermal Printer Graphics

The simple text print is working now, and it was very easy. Compared to that, getting the printer to print graphics was more challenging.
The main thing is that I had to install a driver to get this working. And there was some CUPS configuration needed...

Here is how I did it:

### First: connect the thermal printer to the Raspberry Pi

I used the TTL connectivity instead of USB, because USB didn't work for me. If you want to use USB, here is how:

[https://learn.adafruit.com/networked-thermal-printer-using-cups-and-raspberry-pi/connect-and-configure-printer](https://learn.adafruit.com/networked-thermal-printer-using-cups-and-raspberry-pi/connect-and-configure-printer)

The TTL connection steps:

1. Connect the printer to a 5V power source with 2A or larger
2. The TX/RX pins should be "cross" connected between Pi and printer (TX on printer should go to RX on Pi)
3. Connect GND between printer and Pi
4. Disable the serial console option and enable the serial port hardware → described in the [last article](/posts/cash-register-part-2/)

Now install the printer driver and CUPS:

```bash
sudo apt-get update
sudo apt-get install libcups2-dev libcupsimage2-dev git build-essential cups system-config-printer
git clone https://github.com/adafruit/zj-58
cd zj-58
make
sudo ./install
```

You'll see some warning messages as this compiles. That's normal and can be ignored.

When done, configure everything:

```bash
sudo systemctl start cups && sudo systemctl enable cups
lpinfo -v  # should show the serial port
sudo lpadmin -p ThermalPrinter -v serial:/dev/serial0?baud=19200 -P /usr/share/cups/model/zjiang/ZJ-58.ppd
lpoptions -p ThermalPrinter -l
sudo lpadmin -p ThermalPrinter -o FeedDist=3feed12mm
lpoptions -d ThermalPrinter
sudo cupsaccept ThermalPrinter
sudo cupsenable ThermalPrinter
```

"ThermalPrinter" is the name of the printer – you can choose your own. :)

Don't forget to set this every time the Pi restarts:

```bash
stty -F /dev/serial0 19200
```

## LCD Display

The next thing was the LCD, which has dimensions of 128×64 pixels. I tried to use the original one.
The driver on that display was the *ks0108*. All this information I – luckily – found on the service manual for the cash register on the internet.

I searched a lot, and what I found was:

- [https://github.com/olikraus/u8g2/wiki/u8g2setupcpp#ks0108-128x64](https://github.com/olikraus/u8g2/wiki/u8g2setupcpp#ks0108-128x64)
- [https://www.instructables.com/Arduino-GPS-speedometer-with-a-ks0108-128x64-GLCD-/](https://www.instructables.com/Arduino-GPS-speedometer-with-a-ks0108-128x64-GLCD-/)

Unfortunately none of the two solutions worked for me… :(

On the bright side: I noticed that the dimension of the PCB and the screw holes were standardized. So I could use an LCD with a newer driver chip.

I ordered this one: [https://www.ebay.de/itm/271513573302](https://www.ebay.de/itm/271513573302)

Now I could use the Go library for the ST7920 driver (SPI interface): [https://github.com/olikraus/u8g2/wiki/u8g2setupcpp#st7920-128x64-2](https://github.com/olikraus/u8g2/wiki/u8g2setupcpp#st7920-128x64-2)

And the periph.io library for Go: [https://github.com/periph/cmd/blob/main/ssd1306/main.go](https://github.com/periph/cmd/blob/main/ssd1306/main.go)

This is everything for now. In the next article, I will add a short video of the LCD in action… Stay tuned.
