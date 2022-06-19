# Super Verification

> **Note**: The Verification plugin is intended only for high-risk servers
> that are frequently hit by bot attacks.

The Cleaner Verification will stop all raids and dm raids without impacting
ANY innocent users.

## How does it work

The issue with conventional reaction or button based verification is that
it doesn't prevent new members from dming other members.

There are 2 Discord features that can prevent new members from sending dms:

-   Membership screening (bypassed very easily)
-   Verification level (members can't react or press buttons)

However, we can bypass the limitation of the verification level by guiding
members to a link/website that will verify them.

So, we set the verification level to "High" which means members have to be in
the Discord for 10 minutes to send dms, react or click buttons.
To prevent people from just waiting the 10 minutes out instead of verifying
we automatically kick members if they haven't verified after 8-9 minutes to
prevent unverified people from accessing the server and member's dms.

## Setup

-   `1.` Create a Discord role that will be given to verified people (eg `Member` or `Verified`)
-   `2.` Create a channel on your Discord that only people without the verified role can access
-   `3.` Prevent people without the verified role to access all other channels

![](/img/docs/restricted_to_verified.png)

-   `4.` Go to [the Dashboard](/dash/?component=verification) and select a server
-   `5.` Enable verification
-   `6.` Select your verified role
-   `7.` Send a message in the channel that only people without the verified role can access with the link you'll see on the Dashboard

Example: `https://cleanerbot.xyz/verify?guild=123456789012345678`

-   `8.` Set the verification level of your Discord server to `High` (**IMPORTANT!**)

![](/img/docs/verification_level.png)

## Demo

We have a demo server you can [check out here](/demo/verification).
