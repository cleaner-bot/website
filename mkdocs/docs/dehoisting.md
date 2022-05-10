
# Automatic dehoisting

Automatic dehoisting removes leading "!" from username/nicknames to prevent
hoisting in the memberlist.

Example renames:

- `!!! top` -> `top`
- `! Leo` -> `Leo`

If the nickname consists of only "!"s, the nickname will be set to the username
(also stripped of leading "!"s)

- `!!!!` -> `Leo` (username)
- `!!!!` -> `! Leo` (username) -> `Leo`

If the username also only consists of "!"s, the nickname is changed to "dehoisted".

- `!!!!` -> `!!!!` (username) -> `dehoisted`


---

[Ready to invite the Cleaner?](/dash/) | [Need Support Instead?](/discord)
