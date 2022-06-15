# Join Guard

> **Note**: Sceptical users may not want to join your server, because our bot
> requires the `guild.join` scope for this feature, which some people do not
> wish to grant to bots.

Join Guard will guard all joins to come from The Cleaner and have verified
their identity there.

## How does it work

All users have to use our special join link which will verify their identity
as human before inviting them to the server.

Users that join through normal invites are immediately kicked.

## Setup

-   `1.` Remove the `Create Invite` permission from all roles.
-   `2.` Enable Join Guard on [the dashboard](/dash?component=joinguard).
-   `3.` Start using your special join link instead of invites. You can find it on the dashboard.

## Demo

We have a demo server you can [checkout here](/demo/joinguard).
