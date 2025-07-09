#!/usr/bin/env node

// Simple test to verify all exports are working
const pkg = require('./dist/index.js');

console.log('Testing resource-manager-ui exports...');

const expectedExports = [
  'ResourceManager',
  'ResourceFormGenerator',
  'Button',
  'Dialog',
  'DialogContent',
  'DialogHeader',
  'DropdownMenu',
  'DropdownMenuContent',
  'DropdownMenuItem',
  'DropdownMenuTrigger',
  'Input',
  'Select',
  'SelectContent',
  'SelectItem',
  'SelectTrigger',
  'SelectValue',
  'SelectGroup',
  'SelectLabel',
  'Table',
  'TableBody',
  'TableCell',
  'TableHead',
  'TableHeader',
  'TableRow',
  'Textarea',
  'cn'
];

let passed = 0;
let failed = 0;

expectedExports.forEach(exportName => {
  if (pkg[exportName] !== undefined) {
    console.log(`✅ ${exportName}`);
    passed++;
  } else {
    console.log(`❌ ${exportName} - Missing!`);
    failed++;
  }
});

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('🎉 All exports are working correctly!');
  process.exit(0);
} else {
  console.log('💥 Some exports are missing!');
  process.exit(1);
}
