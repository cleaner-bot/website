
# Commands

You need the `Manage Server` or `Administrator` permission to use any of these commands.

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


#### /config verify reset

/config verify reset

Resets verification setup. (does not delete the embed with buttons)


#### /config logging

/config verify [#channel]

Sets the logging channel. If the channel is not specified, the channel is reset.


#### /config modrole add

/config modrole add @role

Adds moderator privileges to the role.

Moderators are ignored by The Cleaner.


#### /config modrole remove

/config modrole remove @role

Removes moderator privileges to the role.


#### /config modrole list

/config modrole list


#### /config linkchecker

/config linkchecker (enable|disable)

Enables or disables link checker. (you need to setup a [logging channel](#config-logging) first)


#### /config exception add

/config exception add #channel

Adds exception flag to the channel.

Channels marked with this have higher antispam limits and [mitigations](mitigation.md) trigger later.
This should only be used for channels that consist of *pure* spam because it makes defending against raids happening in that channel *a lot* harder.


#### /config exception remove

/config exception remove #channel

Removes exception flag from the channel.


#### /config exception list

/config exception list

Lists all channels with the exception flag.


## Diagnose

/diagnose

Diagnoses common issues! (missing permissions, wrong setup etc)


## Rules

You can disable all kinds of rules. (builtin, dynamic, global, js)

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

## Rules TLDR

1. Disable a rule with `/rules disable add advertisement.discord`.
2. Re-enable it with `/rules disable remove advertisement.discord`.
3. Disable all matching rules with `/rules disable add mass_ping.*`
4. Re-enable them with `/rules disable remove mass_ping.*`
5. Check all enabled rules with `/rules list rules`


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


---

[Ready to invite the Cleaner?](/quickstart/) | [Need Support Instead?](/discord)
