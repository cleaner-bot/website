# April Recode

We recoded the bot to implement some sweet sweet new features.

## A Dashboard

We worked hard to create a Dashboard and here it is!

You can change all settings on the website now which hopefully provides a
better experience than switching between documentation and Discord to
type commands.

[Check it out!](/dash)

## Timeouts are here!

We added timeouts!
We'll automatically timeout people sending shady stuff now instead
of immediately banning!

## Anti Discord impersonation

Automatically kick all users that are likely to be impersonating Discord!

Bots that with names like `Discord Mod Application` send phishing links in DMs
and that isn't cool.

## [Languages!](/docs/i18n)

Guten Tag!

The bot part of the The Cleaner now supports mulitple languages!
We are still working on adding more languages, but we currently support:

-   English
-   German
-   Polish

Wish to contribute? [https://crowdin.com/project/the-cleaner](https://crowdin.com/project/the-cleaner)

## Bye link checker

We are removing link checker because it was barely used and the way it was
implemented was very terrible.

We currently have no plans to introduce it again.
Very sorry about that :/

## We got more coming...

We are still working on some sweet new features that are coming soon!

Features that are pretty much ready but need some small adjustments:

-   Anti Raid

    -   Set a joinlimit, automatically kicks everyone that joins after the limit is exceeded
    -   [Feeling risky?](/dash?component=antiraid)

-   Super Verification
    -   Stops 100% of bots
    -   Prevents DMs while pending verification
    -   Does not impact innocent users during raids
    -   [Feeling risky?](/dash?component=verification)

Features that are planned but still take a bit:

-   Backup

    -   Take a snapshot of your channels/roles that you can restore if a admin goes rogue

-   Bot

    -   Custom bot (maybe?)
    -   Dedicated bot (maybe?)

-   Workers

    -   Run your javascript code

-   Statistics
    -   Basically /radar but restricted to your server
