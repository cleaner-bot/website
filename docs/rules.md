
# Rules

Every detection in The Cleaner is a rule.

There are multiple types of rules:

- builtin rules, premade rules by the developers  (@everyone pings, basic scam detection, ...)
- on-the-fly dynamic rules, deployed to combat spam
- global dynamic rules, combating global spam, scam and threats  (phishing)
- javascript rules  (in experiment)


Who is ignored by The Cleaner?

- the server owner
- members with `ADMINSTRATOR` permission
- [moderator roles](commands.md#config-modrole)


## Builtin rules

Builtin rules are hardcoded, premade rules by the developers.


#### heuristic.content

Catches suspicious messages with at least one url.

Action: `CHALLENGE`, `BLOCK`


#### heuristic.domain

Catches suspicious domain names.

Action: `CHALLENGE`, `BLOCK`


#### embed.asset

Catches Discord imposters by analyzing assets used in the embed.

Action: `CHALLENGE`, `BLOCK`


#### self_bot.embed

Catches selfbots.

Action: `CHALLENGE`, `BLOCK`


#### mass_ping.hidden

Catches people abusing hidden pings. (the spoiler trick)

Action: `CHALLENGE`, `BLOCK`


#### mass_ping.many

Catches people pinging more than 15 users.

Action: `CHALLENGE`, `BLOCK`


#### mass_ping.few

Catches people pinging more than 5 users.

Action: `BLOCK`


#### mass_ping.broad

Catches people pinging `@everyone` or `@here` without having permissions to do so.

Action: `BLOCK`


#### advertisement.discord

Catches any discord invite.  
We currently do not resolve invites for performance reason, so this will also trigger for invalid, expired or invites to the current server.

Action: `BLOCK`


#### emoji.mass

Catches mass emoji. (>= 7)

Action: `BLOCK`


#### link.checker

Catches blacklisted urls/domains that were blacklisted by the Link Checker.

Action: `BLOCK`


## Dynamic Rules

Dynamic rules are not pre-defined and generated on the fly.

Dynamic rules are created by [Mitigation Strategies](mitigation.md).


## Global rules

Global rules are for combatting global spam waves, in particular phishing.

Once a guild service is challenging an user, the message will be sent to the command service for futher analytics.
If the same message is sent from multiple different guilds to the command server and if certain conditions are met, the command server will issue a global rule to combat the potential wave faster and better.


## Javascript Rules

> **Warning**: This is experimental and only available to a small group of people.

Javascript rules allow for running *your* js code on every message.
Basically like builtin rules but they're made by you, not the devs!

Restrictions (subject to change):

- cpu time: 10ms
- memory: 128kb (131,072 bytes)
- script size: 16kb (16,384 bytes)



---

[Ready to invite the Cleaner?](/quickstart/) | [Need Support Instead?](/discord)
