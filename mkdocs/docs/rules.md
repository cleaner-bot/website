
# Rules

Every detection in The Cleaner is a rule.

Who is ignored by The Cleaner?

- the server owner
- members with `ADMINSTRATOR` or `MANAGE SERVER` permission
- moderator roles added on the dashboard

You can change the action of each rule on the Dashboard.


## phishing.content

Catches suspicious messages with at least one url.

Default action: `CHALLENGE`


## phishing.domain.heuristic

Catches suspicious domain names.

Default action: `CHALLENGE`


## phishing.embed

Catches Discord imposters by analyzing assets used in the embed.

Default action: `CHALLENGE`


## self_bot.embed

Catches selfbots.

Default action: `CHALLENGE`


## mass_ping.hidden

Catches people abusing hidden pings. (the spoiler trick)

Default action: `CHALLENGE`


## mass_ping.roles

Catches people pinging more than 5 roles.

Default action: `CHALLENGE`


## mass_ping.users.many

Catches people pinging more than 15 users.

Default action: `CHALLENGE`


## mass_ping.users.few

Catches people pinging more than 5 users.

Default action: `BLOCK`


## mass_ping.broad

Catches people pinging `@everyone` or `@here` without having permissions to do so.

Default action: `BLOCK`


## advertisement.discord_invite

Catches any discord invite.  
We currently do not resolve invites for performance reason, so this will also trigger for invalid, expired or invites to the current server.

Default action: `BLOCK`


## emoji.mass

Catches mass emoji. (>= 7)

Default action: `DISABLED`



---

[Ready to invite the Cleaner?](/dash/) | [Need Support Instead?](/discord)