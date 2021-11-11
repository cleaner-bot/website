
# Commands

You need the `Manage Server` or `Administrator` permission to any of these commands.

Arguments in [] are optional.


## Config

#### /config verify set

/config verify set #channel (give|take) @role

Sends the verification message into the channel and saves the verification mode and role.

Mode `give` gives you the verification role after you verify, `take` takes the role instead.


#### /config verify join

/config verify join (True|False)

**`take` mode only!**

Enables verification for your server by giving new members the verification role automatically.


#### /config logging

/config verify [#channel]

Sets the logging channel. If the channel is not specified, the channel is reset.


#### /config modrole

/config modrole (add|remove) @role

Adds or removes moderator privileges from the role.

Moderators are ignored by The Cleaner.


#### /config exception

/config exception (add|remove) #channel

Adds or removes the exception flag for the channel.

Channels marked with this have higher antispam limits and [mitigations](mitigation.md) trigger later.
This should only be used for channels that consist of *pure* spam because it makes defending against raids happening in that channel *a lot* harder.


## Diagnose

/diagnose

Diagnoses common issues! (missing permissions, wrong setup etc)


## Rules

You can disable all kinds of rules. (builtin, dynamic, global, lua)

You can either use the rule name (`mass_ping.few`) or an * (`mass_ping.*`).  
The syntax for these patterns is very simple and the implementation is intended to be fast.

Allowed characters in a pattern: `a-z0-9_*.` (max len: 64)

```plain
> /rules disable mass_ping.few
Done.
> /rules list patterns
Patterns: mass_ping.few

> /rules disable mass_ping.*
Done.
> /rues list patterns
Patterns: mass_ping.few, mass_ping.*
```

Disabling a children will also disable the parents (but not siblings):

```plain
> /rules disable mass_ping.few
Done.
> /rules test mass_ping
Disabled.
```


#### /rules disable

/rules disable (add|remove) (pattern)

Adds or removes a pattern.


#### /rules list

/rules list (rules|patterns)

Lists all rules or patterns.


#### /rules test

/rules test (rule)

Tests if the rule is disabled.


#### /rules banwave

/rules banwave (rule)

Bans everyone who triggered the rule in the last hour.
