# libpolycall Node.js Bindings

## Overview

`@obinexusltd/node-polycall` provides Node.js bindings for **libpolycall**, a comprehensive library designed for data-oriented programming interfaces. This package enables seamless integration of PolyCall's protocol handling, state management, and network communication capabilities with Node.js applications.

## Features

- **Protocol Handling**: Manage communication protocols with ease
- **State Management**: Implement robust state machines with state transitions
- **Network Communication**: Handle network endpoints and client connections
- **Message Types & Flags**: Predefined protocol constants for reliable communication
- **CLI Interface**: Built-in command-line tools for inspection and testing

## Installation

### Via npm

```sh
npm install @obinexusltd/node-polycall
```

### Via npx (no install required)

```sh
npx @obinexusltd/node-polycall --help
npx @obinexusltd/node-polycall info
```

## Quick Start

### Library Usage (CommonJS)

```js
const { PolyCallClient, MESSAGE_TYPES, PROTOCOL_FLAGS } = require('@obinexusltd/node-polycall');

const client = new PolyCallClient({ host: 'localhost', port: 8080 });
console.log(client.toString());
```

### Library Usage (ESM)

```js
import polycall from '@obinexusltd/node-polycall';

const { PolyCallClient } = polycall;
const client = new PolyCallClient({ host: 'localhost', port: 8080 });
console.log(client.toString());
```

## CLI Usage

The package exposes CLI commands via the `bin` mapping. Both `polycall` and `node-polycall` commands are available:

### Show Help

```sh
polycall --help
# or
npx @obinexusltd/node-polycall --help
```

### Display API Summary

```sh
polycall info
# or
npx @obinexusltd/node-polycall info
```

Shows exported API names and protocol constants summary:
```
node-polycall API summary
Exports (9): MESSAGE_TYPES, NetworkEndpoint, PROTOCOL_CONSTANTS, PROTOCOL_FLAGS, PolyCallClient, ProtocolHandler, Router, State, StateMachine
MESSAGE_TYPES: 6
PROTOCOL_FLAGS: 5
```

### Show Version

```sh
polycall --version
# or
npx @obinexusltd/node-polycall --version
```

## API Reference

### Exported Classes

#### PolyCallClient
Client for communicating with PolyCall servers.

```js
const client = new PolyCallClient({ host, port });
client.connect();
client.authenticate(credentials);
client.executeCommand(command, data);
client.disconnect();
```

#### Router
Handles request routing in the PolyCall protocol.

```js
const router = new Router();
router.register(path, handler);
```

#### StateMachine
Manages state transitions and state-based workflows.

```js
const stateMachine = new StateMachine();
stateMachine.addState(state);
stateMachine.transitionTo(stateName);
```

#### State
Represents a state within a StateMachine.

```js
const state = new State(name, config);
state.onEnter(() => {});
state.onExit(() => {});
```

#### NetworkEndpoint
Handles network communication endpoints.

```js
const endpoint = new NetworkEndpoint(config);
endpoint.listen();
endpoint.connect();
```

#### ProtocolHandler
Core protocol implementation and message handling.

```js
const handler = new ProtocolHandler();
handler.parseMessage(data);
handler.encodeMessage(message);
```

### Exported Constants

#### MESSAGE_TYPES
Enum of supported message types in the protocol.

```js
const { MESSAGE_TYPES } = require('@obinexusltd/node-polycall');
console.log(MESSAGE_TYPES);
```

#### PROTOCOL_FLAGS
Enum of protocol flags for message control.

```js
const { PROTOCOL_FLAGS } = require('@obinexusltd/node-polycall');
console.log(PROTOCOL_FLAGS);
```

#### PROTOCOL_CONSTANTS
Constants used throughout the protocol implementation.

```js
const { PROTOCOL_CONSTANTS } = require('@obinexusltd/node-polycall');
console.log(PROTOCOL_CONSTANTS);
```

## Example: Complete Connection Workflow

```js
const { PolyCallClient, MESSAGE_TYPES, PROTOCOL_FLAGS } = require('@obinexusltd/node-polycall');

async function main() {
    const client = new PolyCallClient({
        host: 'localhost',
        port: 8080
    });

    client.on('connected', () => {
        console.log('Connected to server');
    });

    client.on('authenticated', () => {
        console.log('Authenticated with server');
    });

    client.on('state:changed', ({ from, to }) => {
        console.log(`State changed from ${from} to ${to}`);
    });

    try {
        await client.connect();
        await client.authenticate({ username: 'test', password: 'test' });

        const states = await client.getAllStates();
        console.log('Current states:', states);

        await client.transitionTo('ready');

        const result = await client.executeCommand('status');
        console.log('Command result:', result);

        await client.disconnect();
    } catch (error) {
        console.error('Error:', error.message);
    }
}

main();
```

## Development

### Prerequisites

- Node.js 12.0.0 or higher
- npm 6.0.0 or higher

### Setup

1. Clone the repository:
   ```sh
   git clone https://gitlab.com/obinexusltd/libpolycall.git
   cd libpolycall/bindings/node-polycall
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Run tests:
   ```sh
   npm test
   ```

### Running Tests

The test suite validates API exports, CLI functionality, and module integrity:

```sh
npm test
```

Expected output:
```
Module Loading
✓ Load main index.js
✓ Load via package.json main field

API Exports
✓ PolyCallClient exported
✓ Router exported
✓ StateMachine exported
✓ State exported
✓ NetworkEndpoint exported
✓ ProtocolHandler exported
✓ PROTOCOL_CONSTANTS exported
✓ MESSAGE_TYPES exported
✓ PROTOCOL_FLAGS exported
✓ MESSAGE_TYPES has content
✓ PROTOCOL_FLAGS has content

Package Metadata
✓ Package name is @obinexusltd/node-polycall
✓ Package is published (private: false)
✓ Package has bin field
✓ Package has polycall command
✓ Package has node-polycall command
✓ Repository points to obinexusltd
✓ Homepage points to obinexusltd
✓ Bugs URL points to obinexusltd

CLI Integration
✓ CLI bin file exists
✓ CLI bin file has shebang

CommonJS Require
✓ Can require with CommonJS

====================================================
Test Results
====================================================
✓ All 25 tests passed (100%)
```

## Publishing Checklist

Before publishing to npm:

### Pre-publish Verification

- [ ] Run `npm test` — all tests should pass
- [ ] Run `npm run prepublishOnly` — hook that runs tests before publish
- [ ] Verify package.json:
  - [ ] `"name"` is `@obinexusltd/node-polycall`
  - [ ] `"version"` follows semantic versioning
  - [ ] `"private"` is `false`
  - [ ] `"publishConfig"` points to npm registry
  - [ ] `"repository"` URL points to obinexusltd
  - [ ] `"homepage"` URL points to obinexusltd
  - [ ] `"bugs"` URL points to obinexusltd

### Local Testing Before Publish

Test the CLI works after a simulated install:

```sh
# Build a tarball as if publishing
npm pack

# Extract and test in a temporary directory
mkdir test-install && cd test-install
tar -xzf ../@obinexusltd-node-polycall-1.0.0.tgz
cd package
npm install
npm test
node bin/node-polycall.js --help
node bin/node-polycall.js info
```

### Publishing to npm

1. Ensure you are logged in to npm:
   ```sh
   npm login
   ```

2. Publish the package:
   ```sh
   npm publish
   ```

   For scoped packages (`@obinexusltd/...`), use:
   ```sh
   npm publish --access public
   ```

3. Verify the package is published:
   ```sh
   npm info @obinexusltd/node-polycall
   ```

4. Test installation via npm:
   ```sh
   npm install @obinexusltd/node-polycall
   ```

5. Test npx invocation:
   ```sh
   npx @obinexusltd/node-polycall --help
   npx @obinexusltd/node-polycall info
   ```

### After Publishing

- [ ] Tag release in git: `git tag v1.0.0 && git push --tags`
- [ ] Update CHANGELOG.md with release notes
- [ ] Announce release in appropriate channels

## Troubleshooting

### CLI Command Not Found

If `polycall` is not found after install, ensure `node_modules/.bin` is in your PATH:

```sh
# Global install
npm install -g @obinexusltd/node-polycall
polycall --help

# Or use npx
npx @obinexusltd/node-polycall --help

# Or use the local path
./node_modules/.bin/polycall --help
```

### Import Issues

Ensure you're using the correct package name with scope:

```js
// ✓ Correct
const polycall = require('@obinexusltd/node-polycall');

// ✗ Wrong
const polycall = require('node-polycall');
const polycall = require('@obinexusmk2/node-polycall'); // Old namespace
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and add tests
4. Run `npm test` to ensure all tests pass
5. Commit with clear messages: `git commit -am 'Add feature'`
6. Push to your fork and submit a pull request

For detailed guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Support

For issues, questions, or feature requests:

- **Issues**: [GitLab Issues](https://gitlab.com/obinexusltd/libpolycall/issues)
- **Email**: support@obinexusltd.com

## Acknowledgements

Special thanks to:
- The OBINexus development team
- Contributors to the libpolycall project
- The open-source Node.js community

## Related Projects

- [libpolycall](https://gitlab.com/obinexusltd/libpolycall) - Core library
- [riftlang](https://gitlab.com/obinexusltd/riftlang) - Language bindings
- [gosilang](https://gitlab.com/obinexusltd/gosilang) - Go implementation
