
# Role restrictions

Roles cannot be given or taken if ANY of the following is true:

- the role is the @everyone role
- the role is managed by an integration
- the role is above The Cleaner in the [role hierarchy](#hierarchy)
- the role has [dangerous permissions](#dangerous-permissions)


## Dangerous permissions

The following permissions are considered to be "dangerous" and no role with them can be given or taken:

- `KICK MEMBERS`
- `BAN MEMBERS`
- `ADMINISTRATOR`
- `MANAGE CHANNELS`
- `MANAGE SERVER`
- `MANAGE MESSAGES`
- `MUTE MEMBERS`
- `DEAFEN MEMBERS`
- `MOVE MEMBERS`
- `MANAGE NICKNAMES`
- `MANAGE ROLES`
- `MANAGE WEBHOOKS`
- `MANAGE EMOJIS AND STICKERS`
- `MANAGE EVENTS`
- `MANAGE THREADS`
- `MODERATE MEMBERS`

## Hierarchy

Can't give roles that are above me in the role hierarchy :/

<video width="964" height="648" controls style="width: 100%; height: auto;">
  <source src="/vid/help/hierarchy_fix.mp4" type="video/mp4">
</video>
