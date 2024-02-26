---
title: 'DELL P2723QE Flickering | Life as a Programmer with an M1 Flickering Monitor '
description: "How to deal with it? Is it permanent? Check my solution for a flickering monitor with an M1 chip."
date: '2023-08-11'
banner:
    src: '../public/m1-monitor.webp'
    alt: 'm1 monitor flickering'
categories:
    - 'devices'
---

![monitor flickeering](/m1-monitor.webp "Monitor flickering with M1 chip")

### In a nutshell:

Poor-quality gray colors can cause your monitor to flicker. However, a specific "good gray" color can stop it. To do this, activate the Self-Diagnostic mode and leave it on the first gray color screen for 10-15 minutes.

![Self-Diagnostic meny](/self-diagnostic.webp "flickering solution by self-diagnostic")

### Alternative

Perhaps your monitor just needs to warm up! Play [this monitor-exercise video](https://youtu.be/NPKTHZutvCE){:rel="nofollow" target="_blank"} in full-screen mode for about 30 minutes.

### A more detailed explanation:

Many external monitors, when connected to an M1 MacBook, experience problems such as flickering or glitches due to a hardware bug. Unfortunately, there's no permanent fix, but I've found a temporary solution.

I replaced my 15" MacBook Pro with a 13" MacBook Air, only to realize that the size difference was significant for my work, necessitating the purchase of a monitor. I was excited about models that connect via USB-C, serving as a USB hub and charging the laptop simultaneously.

However, the excitement was short-lived. While debugging regular expressions on regexr.com, I encountered unexpected monitor flickering as if the display was retaining images from previous frames. Initially, I thought a poorly designed website was to blame, but it turned out to be an issue with specific UI interactions, like tooltips or mouse hover effects, causing the monitor to glitch.

## Sites that consistently caused flickering:
- [https://netlify.com](https://netlify.com){:rel="nofollow" target="_blank"}
- [https://regexr.com](https://regexr.com){:rel="nofollow" target="_blank"}
- [https://render.io](https://render.io){:rel="nofollow" target="_blank"}

If I have to go to Netlify, I just turn off the external monitor for a while, do the necessary things, close the site and plug it back in. Because otherwise it takes about 30 minutes to return it to a working condition, fuck it. There are quite a lot of discussions on this topic on support forums, or YouTube videos show all sorts of "magic" manipulations with the frequency settings, color profile, and other garbage that is useless for my case. In the style of a call to ISP support, you will be advised to turn the router on and off. I have tried everything for my DELL P2723QE. Nothing works except enabling its color-checking mode. On the first screen with the gray color ( such a coincidence! ), the whole image flickers as OHMY, so painful to look at, and leave it like that for a while. This is a working version without unnecessary action. But if you want action, open [the video](https://youtu.be/NPKTHZutvCE){:rel="nofollow" target="_blank"} and expand it to full screen.

## Do Other Dell Monitors Have Problems with the M1?

The same problem can happen for Dell monitors, such as the S2722QC, S2721QS, P2723QE and probably others.

## How to fix m1 monitor flickering with Firefox


I've fixed problems with websites by using Firefox with disabled some of visual effects.

Type `about:config` in the address bar and press enter.
Search for toolkit.cosmeticAnimations.enabled and set its value to False.
Search for layout.frame_rate and set its value to 0.


## Is DELL P2723QE a good choice for code?

Overall it is! But if you're doing lot's of front-end it can be painfull.

---

Just in case if you like motorcycles here is my fun project - all about exhaust sound. It's 100% M1 external display flickering safe! Visit [https://revfella.com](https://revfella.com/?ref=m1){:rel="nofollow" target="_blank"}