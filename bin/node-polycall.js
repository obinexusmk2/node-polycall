#!/usr/bin/env node

const pkg = require('../package.json');

console.log(`${pkg.name} v${pkg.version}`);
console.log('CLI scaffolding is set up. Add command handlers in bin/node-polycall.js.');
