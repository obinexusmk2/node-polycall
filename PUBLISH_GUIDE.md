# OBINexus node-polycall Publishing Guide

**Updated:** June 3, 2026  
**Package:** `@obinexusltd/node-polycall`  
**Status:** Ready for npm publication

## Migration Summary

This package has been migrated from the `@obinexusmk2` namespace to `@obinexusltd` and is now ready for publication to the npm registry.

### What Changed

| Field | Before | After |
|-------|--------|-------|
| Package Name | `@obinexusmk2/node-polycall` | `@obinexusltd/node-polycall` |
| Repository | `obinexusmk2/libpolycall` | `obinexusltd/libpolycall` |
| Private | `true` | `false` |
| Test Script | ❌ Not configured | ✅ `npm test` |
| Bin Commands | `node-polycall` | `polycall`, `node-polycall` |
| npm Registry | N/A | Configured in publishConfig |

## Verification Results

### ✅ All Systems Pass

```
Module Loading: 2/2 ✓
API Exports: 11/11 ✓
Package Metadata: 8/8 ✓
CLI Integration: 2/2 ✓
CommonJS Require: 1/1 ✓

Total: 24/24 tests passed (100%)
```

### ✅ CLI Commands Work

```sh
# Version
$ node bin/node-polycall.js --version
1.0.0

# Info
$ node bin/node-polycall.js info
Exports (9): MESSAGE_TYPES, NetworkEndpoint, PROTOCOL_CONSTANTS, 
             PROTOCOL_FLAGS, PolyCallClient, ProtocolHandler, Router, 
             State, StateMachine
MESSAGE_TYPES: 6
PROTOCOL_FLAGS: 5
```

### ✅ Module Exports Verified

- ✓ PolyCallClient (class)
- ✓ Router (class)
- ✓ StateMachine (class)
- ✓ State (class)
- ✓ NetworkEndpoint (class)
- ✓ ProtocolHandler (class)
- ✓ PROTOCOL_CONSTANTS (object)
- ✓ MESSAGE_TYPES (object, 6 types)
- ✓ PROTOCOL_FLAGS (object, 5 flags)

## Pre-Publication Checklist

Before running `npm publish`:

### Account & Configuration

- [ ] Logged into npm: `npm login`
- [ ] npm user account is authorized for `@obinexusltd` scope
- [ ] Git tags are set up for version tracking

### Package Validation

- [ ] Run final tests: `npm test` (should show all 24 passing)
- [ ] Verify package.json:
  ```json
  {
    "name": "@obinexusltd/node-polycall",
    "version": "1.0.0",
    "private": false,
    "publishConfig": {
      "registry": "https://registry.npmjs.org/"
    },
    "bin": {
      "polycall": "bin/node-polycall.js",
      "node-polycall": "bin/node-polycall.js"
    }
  }
  ```

### Documentation

- [ ] README.md updated with:
  - [x] Updated package name throughout
  - [x] npx usage examples
  - [x] Publishing checklist
  - [x] Full API reference
  - [x] Complete examples

### Local Smoke Test

Before publish, simulate real-world installation:

```sh
# Create test directory
mkdir -p /tmp/polycall-test
cd /tmp/polycall-test

# Pack the current version
npm pack /path/to/node-polycall

# Extract and test
tar -xzf @obinexusltd-node-polycall-1.0.0.tgz
cd package

# Install and run tests
npm install
npm test

# Test CLI
node bin/node-polycall.js --help
node bin/node-polycall.js info
node bin/node-polycall.js --version
```

## Publishing Steps

### Step 1: Final Verification

```sh
cd /path/to/node-polycall
npm test  # Should show 24/24 passing
```

### Step 2: Publish to npm

For a scoped package, use `--access public`:

```sh
npm publish --access public
```

### Step 3: Verify Publication

```sh
# Check package info
npm info @obinexusltd/node-polycall

# Verify it's downloadable
npm view @obinexusltd/node-polycall

# Check bin commands
npm list -g | grep polycall
```

### Step 4: Test Installation

```sh
# Global install
npm install -g @obinexusltd/node-polycall

# Test global command
polycall --help
polycall info

# Or use npx (no install needed)
npx @obinexusltd/node-polycall --help
npx @obinexusltd/node-polycall info
```

### Step 5: Release Management

```sh
# Tag the release
git tag v1.0.0
git push origin main --tags

# Update CHANGELOG
# Create release notes on GitLab
```

## Post-Publication Verification

### npm Registry Check

```sh
# Verify on npm
npm info @obinexusltd/node-polycall

# Expected output should include:
# - name: '@obinexusltd/node-polycall'
# - version: '1.0.0'
# - bin commands: polycall, node-polycall
# - dist.tarball: https://registry.npmjs.org/@obinexusltd/node-polycall/-/...
```

### npx Availability

```sh
# Should work without installation
npx @obinexusltd/node-polycall --version
npx @obinexusltd/node-polycall info
```

### CLI Commands

Both commands should be available after global install:

```sh
npm install -g @obinexusltd/node-polycall

# Primary command
polycall --help

# Alias command
node-polycall --help

# Should both output same help text
```

## Troubleshooting

### "npm ERR! You need to be logged in"

```sh
npm login
# Then retry: npm publish --access public
```

### "npm ERR! 403 Forbidden"

- Verify you have permissions for `@obinexusltd` scope
- Check npm account has 2FA enabled (if required)
- Ensure `publishConfig.registry` is set correctly

### CLI Not Found After Install

```sh
# Option 1: Use global install
npm install -g @obinexusltd/node-polycall
polycall --help

# Option 2: Use npx
npx @obinexusltd/node-polycall --help

# Option 3: Use local path
./node_modules/.bin/polycall --help
```

### Old Namespace Issues

If users installed the old `@obinexusmk2/node-polycall`:

```sh
# They need to uninstall old, install new
npm uninstall @obinexusmk2/node-polycall
npm install @obinexusltd/node-polycall
```

## Version Management

This is **version 1.0.0** (stable release).

For future updates:

```sh
# Patch (bug fixes): 1.0.1
npm version patch
npm publish

# Minor (features): 1.1.0
npm version minor
npm publish

# Major (breaking changes): 2.0.0
npm version major
npm publish
```

## Related Documentation

- **README.md** - Full user-facing documentation
- **package.json** - Package metadata and configuration
- **tests/index.js** - Automated test suite (24 tests)
- **bin/node-polycall.js** - CLI entry point

## Support & Questions

For issues or questions about the package:

1. Check the README.md for usage examples
2. Review test cases in tests/index.js for API usage
3. File issues on [GitLab](https://gitlab.com/obinexusltd/libpolycall/issues)
4. Contact the OBINexus team

---

**Last Updated:** June 3, 2026  
**Status:** ✅ Ready for Publication  
**Next Step:** Run `npm publish --access public`
