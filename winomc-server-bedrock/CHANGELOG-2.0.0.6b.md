# 2.0.0.6b

- Mobile web UI starts again after the 2.0.0.5b mode split.
- Mode detection now respects the existing winomc-mobile and winomc-pc classes.
- Existing allowlist.json and permissions.json are preserved on restart when the related add-on options are empty.
- Add-on options still intentionally regenerate access files when ALLOW_LIST_USERS, OPS, MEMBERS or VISITORS are set.
- Applied first-start profiles keep server.properties persistent across restarts while .winomc/applied-profile.json exists.
