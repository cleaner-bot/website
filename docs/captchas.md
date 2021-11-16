
# CAPTCHAs

Everyone hates them, especially bots.

You have to solve a challenge when:

- you trigger a rule with the `CHALLENGE` action
- 3 of your messages in the last hour were `BLOCK`ed
- 1 of your message in the last hour was `BLOCK`ed and there were at least 10 `BLOCK`s in the last 5 minutes


## CAPTCHA delay

The moment the bot decided to give you a challenge, a delay is also decided.
This can range from 0 seconds to *a day*.

Factors that can increase the delay:

- total challenges received on the server
- total challenges received globally
- server is under attack


Total global and per server challenges currently do not reset.


## One-click passthrough

You may passthrough the on-join captcha with one click without having to solve a CAPTCHA.

Requirements:

- never had to solve a challenge (on-join captchas don't count)
- server is not under attack
- account is older than 3 days


---

[Ready to invite the Cleaner?](/quickstart/) | [Need Support Instead?](/discord)
