---
title: "Migration from LastPass to local KeePassXC"
description: ""
date: '2024-07-09'
id: 'with-wide-img'
categories:
    - 'system setup'
    - 'privacy'
---

![Goodbye LastPass](/lastpass-goodbye.webp "Goodbye LastPass")

This morning the first email I've noticed ( right after one more regular reset password confirmation from booking.com which I'm ignoring for the last 3 months ) in my inbox was a successful login notification in one of online shopping service I used before. It contains my credit card data, so the someone who's owned my account instantly started to make purchases. Hopefully, the bank required OTP in this case. This time I was lucky, ( still remember that time I was drained with Aliexpress to about 500$ in one evening in the same case ). Well, I've got a dosage of inspiration to continue work on improoving my security and finish my migration from LastPass to [KeePassXC](https://keepassxc.org/) i've already started.

Having a cloud password storage sounds very cool, but I think i don't really need it. Additionally, since my account is in free-tier, I shouldn't expect a "good service" from that side, but something rediculous like selling my data over a counter. 

I choosen keepassxc by simple following [the article](https://blog.paranoidpenguin.net/2018/12/migrating-from-lastpass-to-keepassxc/)  from a blog with a name "paranoidpenguin". What can be most trustworthy?
The app provides preconfigured import settings for OnePass and some other, nothing for LastPass in particular, hovewer columns detection from CSV works almost perfect.

### The plan
- 1 Export my data
- 2 import to keepassxc
- 3 Make sure all good
- 4 Remove my data from LastPass

1-2-3 was pice of cake.
Only one step left. Real talk, what's the point for migration from A to B, if you keep your data in the A afterall? What is became a little headache - their web-application.
I was about to delete all my entries, but oh ah, there is no "Select all" button. They have a bunch action selector with "Delete" but you have to select it manually. Ok, I bypassed it with old good developer console. Selected all those checkboxes ( which actually are buttons in this app ) and click to tick! Go to the header to select a bulk action to remove all, and what? Error! Oh no! Not again!

My favorite, love it, because you know, I do web apps too. 

Reach out the team. Well, who am I? Just a free-tier user. No hope.
But! I'm a free-tier user with opened developer tools in my browser. It's a golden one. Priceless. So let's do the business!

How ironically it is because the other day I was working on select-all feature improvements on my client's project with a HUGE table. In case you have never heard about a checkbox's indetermenated state please check [this](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#indeterminate_state_checkboxes) . How to easily deal with it in react ( there is no a specific prop for it ) by passing a ref you can take a look in the official react issues [link](https://github.com/facebook/react/issues/1798#issuecomment-417047897)  [This article](https://coyleandrew.medium.com/design-better-pagination-a022a3b161e1) shows some ideas on design side.

Recent [post on HackerNews](https://readhacker.news/s/6a8eB) shows a similar problem when a service ( facebook ) don't want you to have a smooth easy way to reduce their profit

For LastPass is much simplier:

```js
(async function () {
	var list = document.querySelectorAll('.itemButton.delete');

	for (index in list) {
		list[index].click();
		await new Promise(resolve => setTimeout(resolve, 300));
		document.getElementById('submitButton').click();
		await new Promise(resolve => setTimeout(resolve, 300));
	}
})()
```

So now you are 100% ready to pivot your security level to a another dimension! Don't waste your time in the clouds and come back to a solid ground!
