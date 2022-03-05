
# Features

## Raid Protection

Raids are handled by [Mitigation Rules](mitigation.md) which deploy dynamic rules to detect and mitigate the raid.

If 10 messages are blocked in 5 minutes, the server will enter *under attack mode*:

1. Any blocked message will instantly challenge. (instead of only after 3)
1. Challenge cooldown will be increased by 2 stages.


## Automatic slow mode

The slow mode of a channel is automatically adjusted depending on the volume of incoming messages.

More messages = higher slow mode

If the slow mode is above 10 seconds or if the `MANAGE_CHANNELS` permission is missing, it won't be automatically adjusted.



## Phishing Prevention

Phishing is prevented mainly through the following rules:

- [phishing.content](rules.md#phishingcontent)
- [phishing.domain.heuristic](rules.md#phishingdomainheuristic)
- [phishing.embed](rules.md#phishingembed)
- [ping.broad](rules#pingbroad)

And the following mitigation rule:

- [traffic.exact](mitigation.md#trafficexact)


## Other

### Automatic de-hoisting

This automatically removes starting `!` from member's nicknames.


### Mass ping

Messages with more than 5 pings are blocked. ([ping.users.few](rules.md#pingusersfew))

Messages with more than 15 pings are blocked and result in a challenge. ([ping.users.many](rules.md#pingusersmany))


### Discord invites

Discord invites are automatically deleted by default with the [`advertisement.discord_invite`](rules.md#advertisementdiscord_invite) rule.



---

[Ready to invite the Cleaner?](/dash/) | [Need Support Instead?](/discord)
