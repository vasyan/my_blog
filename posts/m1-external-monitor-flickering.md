---
title: 'How to fix flickering for DELL P2723QE monitor'
description: "Many external monitors have problems with m1 macbook like flickering or glitches. It's a hardware bug and we can't fix it permanently. But here is solution how to fix it for a while."
date: '2023-08-11'
banner:
    src: '../../images/dell_monitor.jpg'
    alt: 'Dell P2723QE'
    caption: 'Photo by officials'
categories:
    - 'devices'
---

Long story short:

Turn on Self-Diagnostic mode and left it on the first gray color screen for 30 minutes

OR

Your monitor is tired and needs a little warm-up! Open [this monitor-exercise video](https://youtu.be/NPKTHZutvCE) in full-screen and left it for 30 minutes

Long story long:

I swapped my 15" MacBook Pro for a super-cute-little-goldy air 13". It turned out that those extra two inches were crucial to the job, and I had to buy a monitor. I was intrigued by the fact that models connected via USB-c work as USB-hub and charge a laptop. Wow! That's so cool!

But it was not. Unaware of the impending disaster in the first week, I debugged regular expressions on https://regexr.com and hovered over some elements showing the tooltip. Suddenly the picture started to twitch and seemed to leave the old image. Of course, I'm fucked up that some other front-end a$$нole (and not myself) broke my monitor with their PIECE OF CSS gradients, box-shadows, or whatever it was.

Later it turned out that these glitches were due to some specific interfaces. Appearing tooltips or mouse hover effects break my monitor. Currently, the list of resources that bring problems is not significant:
- https://netlify.com
- https://regexr.com
- https://render.io

If I have to go to Netlify, I just turn off the external monitor for a while, do the necessary things, close the site and plug it back in. Since otherwise it will take about 30 minutes to return it to working condition, fuck it. There are quite a lot of discussions on this topic on support forums, or YouTube videos show all sorts of "magic" manipulations with the frequency settings, color profile, and other garbage that is useless for my case. In the style of a call to ISP support, you will be advised to turn the router on and off. I have tried everything for my DELL P2723QE. Nothing works except enabling its color-checking mode. On the first screen with the gray color ( such a coincidence! ), the whole image flickers as OHMYG, so painful to look at and leave it like that for a while. This is a working version without unnecessary action. But if you want action, open [the video](https://youtu.be/NPKTHZutvCE) and expand it to full screen.


UPDATE: The same problem can happen for other Dell monitors S2722QC, S2721QS, P2723QE name it
I've fixed problems with websites by using Firefox with disabled some of visual effects
```
Type about:config in the address bar and press enter.
Search for toolkit.cosmeticAnimations.enabled and set its value to False.
Search for layout.frame_rate and set its value to 0.
```