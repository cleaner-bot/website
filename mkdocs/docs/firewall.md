# Rules

Every detection in The Cleaner is a rule.

Who is ignored by The Cleaner?

-   the server owner
-   members with `ADMINSTRATOR` or `MANAGE SERVER` permission
-   moderator roles added on the [Dashboard](/dash/?component=firewall)
-   bots

You can change the action of each rule on the [Dashboard](/dash/?component=firewall).

## phishing.content

Catches suspicious messages with at least one url.

Default action: `CHALLENGE`

## phishing.domain.blacklisted

Catches blacklisted domains.

Default action: `CHALLENGE`

## phishing.domain.heuristic

Catches suspicious domain names.

Default action: `CHALLENGE`

## phishing.embed

Catches Discord imposters by analyzing assets used in the embed.

Default action: `CHALLENGE`

## selfbot.embed

Catches selfbots.

Default action: `CHALLENGE`

## ping.hidden

Catches people abusing hidden pings. (the spoiler trick)

Default action: `CHALLENGE`

## ping.roles

Catches people pinging more than 5 roles.

Default action: `CHALLENGE`

## ping.users.many

Catches people pinging more than 15 users.

Default action: `CHALLENGE`

## ping.users.few

Catches people pinging more than 5 users.

Default action: `BLOCK`

## ping.broad

Catches people pinging `@everyone` or `@here` without having permissions to do so.

Default action: `BLOCK`

## advertisement.discord.invite

Catches any discord invite.  
We currently do not resolve invites for performance reason, so this will also trigger for invalid, expired or invites to the current server.

Default action: `BLOCK`

## emoji.mass

Catches mass emoji. (>= 7)

Default action: `DISABLED`

---

[Ready to invite the Cleaner?](/dash/) | [Need Support Instead?](/discord)
