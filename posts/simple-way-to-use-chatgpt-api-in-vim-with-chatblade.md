---
title: 'How to use Vim as ChatGPT ui with chatblade'
description: "There has to be a better way to deal with ChatGPT, for the people who prefer Vim as the main text editing tool"
date: '2023-11-08'
categories:
    - 'chatgpt'
    - 'vim'
---

I use Vim as the default text editing tool. It made me very picky about text editing in others' UI. That's why I was curious about how to apply it to my ChatGPT experience. And here is the receipt! I'm 100% sure it's very far from ideal flow, but at the moment, it's just awesome!
Here is the list of tools
- [chatblade](https://github.com/npiv/chatblade) - "A CLI Swiss Army Knife for ChatGPT"
- [dotenv-cli](https://www.npmjs.com/package/dotenv-cli) - for populating variables from .env to the shell ( not required tho, if you like to specify variables right in the shell. Who am I to judge? )

Don't forget to install all of them in any way you prefer.

Create somewhere .env file with your OPENAI_API_KEY
```bash
echo "OPENAI_API_KEY=__PASTE_YOUR_KEY__" >> .env
```

Choose a model
```bash
echo "OPENAI_API_MODEL=gpt-4-1106-preview" >> .env
```

The real magic is simple. Open Vim, type a prompt, visually select it with `Shift + v`, press `:` and execute

`:'<,'>!dotenv -e .env chatblade`

`'<,'>`  stand for the current selected text

`!` send it as input to the following command

`dotenv -e .env` upload variables from .env file

`chatblade`  call the API with the selected text as payload

What for an answer ( it can take a while for a complex prompts ), and BOOM! You get it right in your buffer.

Who knows what next? Maybe upload a whole module of code and ask to do something good with it?

That's all. Happy hacking.
