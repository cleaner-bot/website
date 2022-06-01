# May updates

Update time! We worked hard on several new features and improvements in May.

## Domain move

We moved from cleaner.leodev.xyz to cleanerbot.xyz!

## Anti raid & Super Verification

Anti raid & super verification move out of beta and are now fully accessible
on the Dashboard!

## Firewall & Antispam channel whitelist

You can now whitelist channels to completely disable certain firewall or
antispam rules.
(we do not recommend whitelisting channels from antispam unless absolutely necessary)

Note to antispam: If the antispam was triggered in a different channel, the
mitigation will still affect whitelisted channels.

## Risk rating

We updated the formular we use for calculating risk to punish new accounts harsher.

## Automatic dehoisting

We updated automatic dehoisting to not reset the nickname to the username, but
remove all exclamation marks.

-   `!!! test` -> `test`
-   `!!!!!` -> username
-   `!!!!!` and username is also only `!` -> `dehoisted`

Automatic dehoisting will now also remove leading "!" when joining!

## Other

- firewall also runs on message edit now
- bot now uses bulk delete to delete messages after and more consistently
- fixed being able to report staff
- report logs actions taken to log now
- a lot more logs support username#discriminator now
- fixed a few dashboard bugs
- dashboard slowmode shows channels it cant change
- database backups
- improved internal security (secured database with password + more)
- [workers](/docs/worker)
