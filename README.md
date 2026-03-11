# libpolycall Node.js Bindings

## Overview

`libpolycall` provides a data-oriented programming interface. This package publishes Node.js bindings and a small CLI for inspecting the installed API surface.

## Installation

Install the published package with:

```sh
npm install @obinexusmk2/node-polycall
```

## Library usage

### CommonJS (`require`)

```js
const { PolyCallClient } = require('@obinexusmk2/node-polycall');

const client = new PolyCallClient({ host: 'localhost', port: 8080 });
console.log(client.toString());
```

### ESM (`import`)

```js
import polycall from '@obinexusmk2/node-polycall';

const { PolyCallClient } = polycall;
const client = new PolyCallClient({ host: 'localhost', port: 8080 });
console.log(client.toString());
```

## CLI usage

The package exposes a CLI command via the `bin` mapping:

- Command: `polycall`

Show help:

```sh
polycall --help
```

Practical example (list exported symbols from the installed package):

```sh
polycall exports
```

## Publishing checklist

1. Verify the package contents before publishing:
   ```sh
   npm pack
   ```
2. Publish the scoped package publicly:
   ```sh
   npm publish --access public
   ```
3. Confirm the CLI command resolves and runs after install (global or local via `npx`):
   ```sh
   polycall --help
   # or
   npx @obinexusmk2/node-polycall --help
   ```

## Development

Install dependencies:

```sh
npm install
```

Run the available test script:

```sh
npm test
```

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
