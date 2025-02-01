---
title: "DIY Guide to Creating a VSCode Color Theme for Developers with Deuteranomaly"
description: "Struggling to find an accessible VSCode color theme for Deuteranomaly? Learn how to customize your editor's colors step-by-step using Chromium DevTools to achieve better contrast and readability."
date: '2025-01-02'
articleId: 'with-wide-img'
categories:
    - 'accessibility'
    - 'vscode'
---

The word of the day is "Deuteranomaly"

![deuteranopia-test](/deuteranopia-article/0.jpg)

There are ~5% of people have trouble with red-green colors [link](https://www.color-blindness.com/deuteranopia-red-green-color-blindness/). I imagine some of them code daily, but surprisingly, there's no well-known color scheme designed specifically for colorblind developers. I usually just stick with Monokai, which worked fine for me until recently when its red tones started looking weird. This task had been on my TODO list for ages. To lazy to play with color palete in graphical editor since it's not my comfort zone. Eventually, I opened the developer tools in VSCode and remembered it's essentially a browser under the hood. So, here's a guide on how to tweak any color in your editor for better accessibility with almost no efford.

### How To

Those red `return` keywords make me feel uneasy.

![bad-example](/deuteranopia-article/1.jpg)

In the command palette, search for "Developer: Toggle Developer Tools."

![open-toolbox](/deuteranopia-article/3.jpg)

Click on "Select an element in the page to inspect it" or press `Cmd+Shift+C` on Mac.

![select-element](/deuteranopia-article/4.jpg)

Hover over the problematic token and view the popup with its information. Pay attention to the "Contrast" section, especially if it's marked with an attention symbol. Surprisingly, the contrast ratio is what helps me to spot a problematic color for my eyes.

![contrast-is-the-king](/deuteranopia-article/7.jpg)

Clicking on it reveals the element in the developer tool, where you can tweak the color using a handy color picker.

![color-picker](/deuteranopia-article/8.jpg)

Here's the key: If you click on "Contrast ratio," it will show literal guidelines on the color matrix and the current values.

![contast-ratio-adjustment](/deuteranopia-article/11.jpg)

![contast-ratio-adjustment-2](/deuteranopia-article/12.jpg)

Move the picker circle above the guideline to pass the ratio test. The token's appearance in the editor view will update accordingly. For my taste, this pinkish tone works much better than the red.

![poopa](/deuteranopia-article/14.jpg)

Check how it look and feel. Tweak it for your own.

![poopa](/deuteranopia-article/15.jpg)

Before/After:

![poopa](/deuteranopia-article/16.jpg)

### Time to change!

The simplest option is to change the editor configuration in `Preferences: Open User Settings JSON`. This approach doesn't work for all themes (e.g., Monokai Pro), but it's worth trying first.

```
"editor.tokenColorCustomizations": {
  "textMateRules": [
    {
      "scope": "keyword, storage, invalid, entity.name.tag, meta.tag.sgml.doctype.html",
      "settings": {
        // "foreground": "#ff007f"
        "foreground": "#ff4e8e"
      }
    }
  ]
}
```

If there's no effect, back up your active theme file (usually found in `~/.vscode/extensions/.../*-theme.json`), and perform a find-replace for the old values to the new ones. Done.

![poopa](/deuteranopia-article/17.jpg)
