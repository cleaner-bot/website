---
title: About the Cleaner
summary: The Cleaner is built for keeping servers clean.
authors:
    - Leo Developer
date: 2022-03-05
---


# About The Cleaner

The Cleaner is a bot developed by [Leo](https://leodev.xyz).

Special thanks to:

- Rxvan for testing and feedback
- A7U for website feedback and dev help
- Rynav and Tech for being there and helping with the name
- MJK for designing the profile picture
- Rynav, Tech, usernamep, coodin and MJK for website feedback

- **You**! Thanks for using my bot <3


## Infrastructure

Bot:

- Hosted on Raspberry Pi 3b
- Redis database
- Written in Python using [hikari](https://www.hikari-py.dev/)

Website (I **love** Cloudflare):

- Nextjs + TailwindCSS
- Docs using MkDocs
  
- Frontend hosted on [Cloudflare Pages](https://pages.cloudflare.com)
- Backend hosted on my Raspberry Pi (using Cloudflare Tunnel)


## Story

The Cleaner (originally Mr. Clean) was designed to be a small antiraid bot for my private server.

However, phishing waves became more and more common in July, so I added phishing detection.
Really simple distance calculation between steamcommunity and every domain in every message sent.
If it's similar, it just bans.

And it worked!

I convinced two friends of mine with medium sized servers (2,3k and 3,4k members) to invite the bot and it was decimating the urls of that time.

With time I improved the bot, added more detections and made The Cleaner even better.

Early September the bot went public after a recode to make it more user friendly.


---

[Ready to invite the Cleaner?](/dash/) | [Need Support Instead?](/discord)
