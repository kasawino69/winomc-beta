## WinoMC 2.1.3b - Manager Create Form Hotfix

### Fixed
- Fixed instance creation failing with Cannot read properties of null (reading 'reset').
- The Manager UI now stores the submitted form element before async API calls and resets that stored form safely after successful creation.
- Instance creation remains fully instance-scoped and continues to use POST /api/instances.

### Changed
- Bumped beta version to 2.1.3b.

### Notes
- This is a frontend hotfix for the 2.1b Manager-only rebuild.
- The Manager-only boot behavior remains unchanged.