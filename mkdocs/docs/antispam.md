# Anti Spam

Analyzes recent messages (traffic) and looks for patterns.
If a pattern is found, we will automatically block all messages matching that pattern.

Patters expire after they haven't been triggered for a while.

This is the primary defense against raids or other kinds of spam that is directed to only one guild.

#### traffic.similar

Detects similar messages. This is the most basic defense. (5/30s/user, 12/30s/guild)

#### traffic.token

Detects repeating parts ("tokens") in messages.
This tries to detect the "goal" of the spam.

#### traffic.exact

Detects exact messages across multiple channels. (3/30s)
This is intended for catching bots that send the same message into every channel.

#### traffic.sticker

Detects spam of the same sticker. (3/30s)

#### traffic.attachment

Detects spam of the same attachment (only compares filesize). (3/30s)

---

[Ready to invite the Cleaner?](/dash/) | [Need Support Instead?](/discord)
