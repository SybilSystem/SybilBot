# TinyBot

## Requirements

- `git` command line ([Windows](https://git-scm.com/download/win)|[Linux](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)|[MacOS](https://git-scm.com/download/mac)) installed
- `node` [Version 8.0.0 or higher](https://nodejs.org)

You also need your bot's token. This is obtained by creating an application in the Developer section of discordapp.com.

This bot will require the node-gyp project for a few dependencies. You can install node-gyp by running this command:

`npm install -g node-gyp`

## Downloading

In a command prompt in the directory you want the bot to live, run the following command:

`git clone https://github.com/SybilSystem/TinyBot.git`

Once finished:

- In the folder from where you ran the git command, run `npm install`
- Rename or copy `config.js.example` to `config.js`
- Edit `config.js` and fill in all the relevant details as indicated in the file's comments.

## Starting the bot

To start the bot in the terminal, run the following command: `node bot.js`

## Inviting to a guild

To add the bot to your guild, you have to get an OAuth link for it.

You can use this site to help you generate a full OAuth Link, which includes a calculator for the permissions: <https://finitereality.github.io/permissions-calculator/?v=0>

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/e5a623175e8d4f0d8c0f2d791f5af2fb)](https://www.codacy.com/app/SybilSystem/TinyBot?utm_source=github.com&utm_medium=referral&utm_content=SybilSystem/TinyBot&utm_campaign=Badge_Grade) [![Build Status](https://travis-ci.org/SybilSystem/TinyBot.svg?branch=master)](https://travis-ci.org/SybilSystem/TinyBot)
