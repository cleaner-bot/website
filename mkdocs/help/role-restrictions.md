
# Role restrictions

Roles cannot be given or taken if ANY of the following is true:

- the role is the @everyone role
- the role is managed by an integration
- the role is above The Cleaner in the [role hierarchy](hierarchy.md)
- the role has [dangerous permissions](#dangerous-permissions)


## Dangerous permissions

All permissions that require 2FA in a server with 2FA requirement are deemed
dangerous, that includes:

- `ADMINISTRATOR`
- `MANAGE SERVER`
- `MANAGE CHANNELS`
- `MANAGE ROLES`
- `BAN MEMBERS`
- `KICK MEMBERS`
- `MANAGE MESSAGES`
- `MANAGE EMOJIS AND STICKERS`
- `MANAGE THREADS`
- `MODERATE MEMBERS`

Roles used for verification or challenges should not have any of the above permissions.
