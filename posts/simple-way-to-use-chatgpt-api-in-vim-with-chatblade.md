---
title: 'How to use chatblade as ChatGPT cli client with Vim or vscode'
description: "Discover cli power of ChatGPT. Transform your VIM or Vscode with Chatblade—your CLI Swiss Army Knife for ChatGPT, and elevate your coding experience!"
date: '2023-11-08'
articleId: 'with-wide-img'
categories:
    - 'chatgpt'
    - 'vim'
    - 'vscode'
---

![Chatblade CLI with VIM](/chatblade-post-hero.webp "Chatblade cli with VIM")

## UPD 2024-07: VScode vim-mode

It turns out vim-mode in vscode can do the same. Just do the same setup and call command from ex-mode. So easy.


Hey everyone! Let’s dive into something super cool today: Chatblade, your very own CLI Swiss Army Knife for dabbling with ChatGPT. Imagine having a nifty tool right in your command line that lets you chat with OpenAI's genius bot. Whether it’s piping in some inputs, tossing in arguments, or a mix of both, Chatblade has got your back. Plus, it’s a champ at saving those common prompt starters for quick access and can even spit out responses in JSON or Markdown.

Before we jump into the fun stuff, make sure you’ve got your OpenAI API key ready to roll. You can either wave it in with `--openai-api-key KEY` or, even better, set it as an `OPENAI_API_KEY` environment variable (which is what the cool kids recommend).

## Chatbalde with VIM

I use Vim as the default text editing tool. It made me very picky about text editing in others' UI. That's why I was curious about how to apply it to my ChatGPT experience. And here is the receipt! I'm 100% sure it's very far from ideal flow, but at the moment, it's just awesome!
Here is the list of tools:
- [chatblade](https://github.com/npiv/chatblade) - "A CLI Swiss Army Knife for ChatGPT"
- [dotenv-cli](https://www.npmjs.com/package/dotenv-cli) - for populating variables from .env to the shell ( not required tho, if you like to specify variables right in the shell. Who am I to judge? )

Don't forget to install all of them in any way you prefer.

Create somewhere .env file with your OPENAI_API_KEY

```sh
echo "OPENAI_API_KEY=__PASTE_YOUR_KEY__" >> .env
```

Choose a model

```sh
echo "OPENAI_API_MODEL=gpt-4-1106-preview" >> .env
```

The real magic is simple. Open Vim, type a prompt, visually select it with `Shift + v`, press `:` and execute

```
:'<,'>!dotenv -e .env chatblade
```

`'<,'>`  stand for the current selected text

`!` send it as input to the following command

`dotenv -e .env` upload variables from .env file

`chatblade`  call the API with the selected text as payload

What for an answer ( it can take a while for a complex prompts ), and BOOM! You get it right in your buffer.

### Diving Deeper with Chatblade

- **Want the latest?** Grab the main branch to stay up-to-date. Either clone the project and `pip install .`, or if you’re feeling fancy, `pip install 'chatblade @ git+https://github.com/npiv/chatblade'`.
- **Prefer the stable release?** Just run `pip install chatblade --upgrade`.
- **Are you a Brew fan?** Simply `brew install chatblade`.

### The Fun Begins: Making ChatGPT Queries with Chatblade in Terminal

- **Starting a fresh convo** is as easy as typing away. Like, `chatblade how can I extract a still frame from a video at 22:01 with ffmpeg`.
- **Wanna revisit the last chat?** Just pop in `-l` and it’s like you never left.
- **Keeping the chat going**? Use `-l` with your new question to add on to the context.
- **Feeling indecisive between gpt-3.5 and 4?** Switch on the fly with `-c 4` for the latest or `-c 4t` for the gpt-4-1106-preview. And yes, you can totally specify any model by its full name.
- **Into interactive chatting?** Just add `-i` to your chatblade command and dive in.
- **Streaming text (because why not?)** Combine `-s` and `-i` to get responses flowing like you’re in a web UI.

### Tweaking Your Results

Sometimes the default formatting isn’t what you’re after. If you want the raw output as ChatGPT spat it out, use `-r`. Or, if you’re hunting for just a snippet of that response, `-e` is your friend, especially handy for coding or when you’re piping results around.

### Piping Content Like a Pro

Got a chunky prompt or need to set the stage with some context? Pipe it right into chatblade and let it do its magic.

### Chatting with Sessions

Chatblade isn’t just a one-hit wonder. Start a session with a name and keep adding to it. Or, keep it simple and go sessionless with the knowledge that `last` is always there to catch your last exchange (just don’t expect it to hold onto it forever).

### Tokens and Costs? Check!

Curious about how much your query’s gonna cost in tokens? Tack on `-t` and get a glimpse before you commit.

### Custom Prompts for Days

Ever wanted ChatGPT to act a certain way? Use `-p` with a prompt under `~/.config/chatblade/`, and you’re all set. This is perfect for those specialized tasks or when you’re feeling extra creative.

### Azure OpenAI, Anyone?

If Azure’s more your style, don’t worry, Chatblade’s got you. Just set a few environment variables, and you’re good to go.

So there you have it, folks! Chatblade is your go-to for making your command line chats with ChatGPT not just possible, but fun, flexible, and totally customizable. Whether you’re coding, querying, or just messing around, give Chatblade a whirl and see where the conversation takes you. Happy chatting!
