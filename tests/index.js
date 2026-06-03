#!/usr/bin/env node

/**
 * Test suite for @obinexusltd/node-polycall
 * Validates API exports, CLI functionality, and module integrity
 */

const assert = require('assert');
const path = require('path');

// Color output for test results
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[36m'
};

let testsPassed = 0;
let testsFailed = 0;

function test(name, fn) {
    try {
        fn();
        console.log(`${colors.green}✓${colors.reset} ${name}`);
        testsPassed++;
    } catch (error) {
        console.error(`${colors.red}✗${colors.reset} ${name}`);
        console.error(`  ${error.message}`);
        testsFailed++;
    }
}

function section(title) {
    console.log(`\n${colors.blue}${title}${colors.reset}`);
}

// ============================================================================
// TESTS
// ============================================================================

section('Module Loading');

test('Load main index.js', () => {
    const polycall = require('../src/index.js');
    assert(polycall, 'Module should export an object');
});

test('Load via package.json main field', () => {
    const polycall = require('../');
    assert(polycall, 'Package should export via main field');
});

// ============================================================================
section('API Exports');

const polycall = require('../src/index.js');

test('PolyCallClient exported', () => {
    assert(typeof polycall.PolyCallClient === 'function', 'PolyCallClient should be a class/constructor');
});

test('Router exported', () => {
    assert(typeof polycall.Router === 'function', 'Router should be a class/constructor');
});

test('StateMachine exported', () => {
    assert(typeof polycall.StateMachine === 'function', 'StateMachine should be a class/constructor');
});

test('State exported', () => {
    assert(typeof polycall.State === 'function', 'State should be a class/constructor');
});

test('NetworkEndpoint exported', () => {
    assert(typeof polycall.NetworkEndpoint === 'function', 'NetworkEndpoint should be a class/constructor');
});

test('ProtocolHandler exported', () => {
    assert(typeof polycall.ProtocolHandler === 'function', 'ProtocolHandler should be a class/constructor');
});

test('PROTOCOL_CONSTANTS exported', () => {
    assert(polycall.PROTOCOL_CONSTANTS && typeof polycall.PROTOCOL_CONSTANTS === 'object', 'PROTOCOL_CONSTANTS should be an object');
});

test('MESSAGE_TYPES exported', () => {
    assert(polycall.MESSAGE_TYPES && typeof polycall.MESSAGE_TYPES === 'object', 'MESSAGE_TYPES should be an object');
});

test('PROTOCOL_FLAGS exported', () => {
    assert(polycall.PROTOCOL_FLAGS && typeof polycall.PROTOCOL_FLAGS === 'object', 'PROTOCOL_FLAGS should be an object');
});

test('MESSAGE_TYPES has content', () => {
    const typeCount = Object.keys(polycall.MESSAGE_TYPES).length;
    assert(typeCount > 0, `MESSAGE_TYPES should have properties, found ${typeCount}`);
});

test('PROTOCOL_FLAGS has content', () => {
    const flagCount = Object.keys(polycall.PROTOCOL_FLAGS).length;
    assert(flagCount > 0, `PROTOCOL_FLAGS should have properties, found ${flagCount}`);
});

// ============================================================================
section('Package Metadata');

const pkg = require('../package.json');

test('Package name is @obinexusltd/node-polycall', () => {
    assert.strictEqual(pkg.name, '@obinexusltd/node-polycall', 'Package name should be @obinexusltd/node-polycall');
});

test('Package is published (private: false)', () => {
    assert.strictEqual(pkg.private, false, 'Package should be publishable');
});

test('Package has bin field', () => {
    assert(pkg.bin && typeof pkg.bin === 'object', 'Package should define bin field');
});

test('Package has polycall command', () => {
    assert(pkg.bin.polycall, 'Package should have polycall command');
});

test('Package has node-polycall command', () => {
    assert(pkg.bin['node-polycall'], 'Package should have node-polycall command');
});

test('Repository points to obinexusltd', () => {
    assert(pkg.repository.url.includes('obinexusltd'), 'Repository URL should point to obinexusltd');
});

test('Homepage points to obinexusltd', () => {
    assert(pkg.homepage.includes('obinexusltd'), 'Homepage URL should point to obinexusltd');
});

test('Bugs URL points to obinexusltd', () => {
    assert(pkg.bugs.url.includes('obinexusltd'), 'Bugs URL should point to obinexusltd');
});

// ============================================================================
section('CLI Integration');

test('CLI bin file exists', () => {
    const fs = require('fs');
    const binPath = path.join(__dirname, '..', 'bin', 'node-polycall.js');
    assert(fs.existsSync(binPath), 'bin/node-polycall.js should exist');
});

test('CLI bin file has shebang', () => {
    const fs = require('fs');
    const binPath = path.join(__dirname, '..', 'bin', 'node-polycall.js');
    const content = fs.readFileSync(binPath, 'utf8');
    assert(content.startsWith('#!/usr/bin/env node'), 'CLI bin file should have shebang');
});

// ============================================================================
section('CommonJS Require');

test('Can require with CommonJS', () => {
    const mod = require('../');
    assert(mod.PolyCallClient, 'Should be able to require module');
    assert(mod.MESSAGE_TYPES, 'Should have MESSAGE_TYPES');
    assert(mod.PROTOCOL_FLAGS, 'Should have PROTOCOL_FLAGS');
});

// ============================================================================
// RESULTS
// ============================================================================

console.log(`\n${colors.blue}${'='.repeat(60)}${colors.reset}`);
console.log(`${colors.blue}Test Results${colors.reset}`);
console.log(`${colors.blue}${'='.repeat(60)}${colors.reset}`);

const total = testsPassed + testsFailed;
const passRate = total > 0 ? ((testsPassed / total) * 100).toFixed(1) : 0;

if (testsFailed === 0) {
    console.log(`${colors.green}✓ All ${testsPassed} tests passed (${passRate}%)${colors.reset}\n`);
    process.exit(0);
} else {
    console.log(`${colors.red}✗ ${testsFailed} test(s) failed, ${testsPassed} passed (${passRate}%)${colors.reset}\n`);
    process.exit(1);
}
