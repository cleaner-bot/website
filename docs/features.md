
# Features

## Raid Protection

Raids are handled by [Mitigation Rules](mitigation.md) which deploy dynamic rules to detect and mitigate the raid.

After 10 blocked messages in 5 minutes, the server will enter *under attack mode*:

1. New members **must** solve a CAPTCHA.
2. Any blocked message will instantly trigger a CAPTCHA. (instead of only after 3)
3. CAPTCHA delay will be increased by 2 stages.


You can use the [/rules banwave](commands.md#rules-banwave) command to ban everyone who triggered a rule in the last hour.


## Phishing Prevention

Phishing is prevented mainly through the following rules:

- [heuristic.content](rules.md#heuristiccontent)
- [heuristic.domain](rules.md#heuristicdomain)
- [embed.asset](rules.md#embedasset)
- [mass_ping.borad](rules#mass_pingbroad)

And the following mitigation rule:

- [traffic.exact](mitigation.md#trafficexact)


## Other

### Automatic de-hoisting

This is automatically enabled as long as The Cleaner has the `MANAGE_NICKNAMES` permissions.
If you want to this disable this feature, take the permission from The Cleaner.

A config setting is planned.


### Mass ping

Messages with more than 5 pings are blocked.  ([mass_ping.few](rules.md#mass_pingfew))

Messages with more than 15 pings are blocked and result in a challenge.  ([mass_ping.many](rules.md#mass_pingmany))


### Discord invites

Discord invites are automatically deleted by default with the [`advertisement.discord`](rules.md#advertisementdiscord) rule.

You can disable that (and other rules) with [/rules disable add](commands.md#rules-disable).

For example: `/rules disable add advertisement.discord` will disable the rule and with `/rules disable remove advertisement.discord` you enable it again.



---

[Ready to invite the Cleaner?](/quickstart/) | [Need Support Instead?](/discord)
