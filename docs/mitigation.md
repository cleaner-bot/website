
# Mitigation Strategies


Mitigation strategies analyze recent messages (traffic) and looks for patterns.
If a pattern is found, a [dynamic rule](rules.md#dynamic-rules) will be deployed to block messages matching that pattern.

Dynamic rules disappear after they haven't been triggered for the specified time.

This is the primary defense against raids or other kinds of spam that is directed to only one guild.


#### traffic.similar

Detects similar messages. This is the most basic defense.


- Action: `BLOCK`
- Expires: 120s (2m)


#### traffic.token

Detects repeated tokens in messages.
This tries to detect the "goal" of the spam.


- Action: `BLOCK`
- Expires: 120s (2m)


#### traffic.exact

Detects exact messages across multiple channels.
This is intended for catching bots that send the same message into every channel.


- Action: `CHALLENGE`, `BLOCK`
- Expires: 300s (5m)


#### traffic.sticker

Detects sticker spam. (3/30s)


- Action: `BLOCK`
- Expires: INSTANTLY  (does not deploy rule)
