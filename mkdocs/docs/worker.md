
# Lua Worker

A lua worker is a piece of lua code that we run on every message that can
trigger actions and punishments.

## Environment

The lua version used is LuaJIT 2.1.0-beta3.

The environment is severily restricted:

- cpu limit (~1 million instructions)
- memory limit (~128 kb)
- [limited functions/libraries](#global-scope)

### Global scope

Only the following functions/libraries are available, everything else is removed:

- _VERSION
- assert
- error
- getmetatable
- ipairs
- load
- math
- next
- pairs
- pcall
- rawequal
- rawget
- rawlen
- rawset
- require
- select
- setmetatable
- string
- table
- tonumber
- tostring
- type
- xpcall

## API

A lua worker returns a function that takes a single argument (`event`) and 
returns a list of actions to take.


### event

All ids are given as strings because Lua's number type can't represent them 
without losing information.

- message_id: string
- channel_id: string
- guild_id: str
- member_id: str
- member_roles: list[string]
- member_is_bot: boolean
- member_permissions: string
- member_is_owner: boolean
- content: ?string
- attachments: list
  - attachment_id: string
  - filename: string
  - content_type: ?string
  - size: int
  - url: string
  - proxy_url: string
  - height: ?int
  - width: ?int
- embeds: list
  - title: ?string
  - description: ?string
  - url: ?string
  - timestamp: ?int
  - color: ?int
  - footer_text: ?string
  - footer_icon: ?string
  - image_url: ?string
  - image_height: ?int
  - image_width: ?int
  - thumbnail_url: ?string
  - thumbnail_height: ?int
  - thumbnail_width: ?int
  - video_url: ?string
  - video_height: ?int
  - video_width: ?int
  - provider_name: ?string
  - provider_url: ?string
  - author_name: ?string
  - author_url: ?string
  - author_icon: ?string
  - fields: list
    - name: string
    - value: string
    - inline: boolean
- message_type: int
- application_id: ?string
- mention_everyone: bool
- mention_users: list[string]
- mention_roles: list[string]
- mention_channels: list[string]
- interaction: table
  - id: string
  - type: ?int
  - name: string
  - user_id: ?string

### actions

Possible actions:

- `delete:reason`, deletes the message
- `block:reason`, blocks the author \* \*\*
- `challenge:reason`, challenges the author \*\*
- `log:message`, logs the message
- `announcement:message`, sends the message in the channel (prefixed by `[WORKER]`)\*\*\*\*

`*` 3 blocks in an hour result in a challenge and might immediately issue a
challenge in raid conditions.  
`**` Does NOT delete the message.  
`***` Announcement may not be sent in raid conditions.

Note: reason/message is limited to 500 characters.

## Example

### Block all links

```lua
return function(event)
    if event.content and (event.content:match("http://") or event.content:match("https://")) then
        return { "delete", "block" }
    end
end
```

### Log discord invites

```lua
return function(event)
    -- very terrible check
    if not event.content or not (event.content:match("discord.gg") or event.content:match("/invite/")) then
        return
    end
    local message_link = "https://discord.com/channels/" .. event.guild_id .. "/" .. event.channel_id .. "/" .. event.message_id
    return {
        "log:<@" .. event.member_id .. "> sent an invite. [Jump](" .. message_link .. ")."
    }
end
```
