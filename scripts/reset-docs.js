#!/usr/bin/env node

const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Simple console colors
const colors = {
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  gray: (text) => `\x1b[90m${text}\x1b[0m`,
};

const isQuick = process.argv.includes('--quick');

const docsPath = path.join(__dirname, '../packages/docs');
const componentsPath = path.join(docsPath, 'src/components');
const libPath = path.join(docsPath, 'src/lib');

console.log(colors.blue('🔄 Resetting docs workspace...\n'));

async function resetDocs() {
  const startTime = Date.now();
  
  try {
    // 1. Clean installed components
    console.log(colors.yellow('🧹 Cleaning installed components...'));
    
    const pathsToClean = [
      path.join(componentsPath, 'ui'),
      path.join(componentsPath, 'resource-manager'),
      path.join(libPath, 'utils.ts'),
    ];
    
    for (const cleanPath of pathsToClean) {
      if (fsSync.existsSync(cleanPath)) {
        await fs.rm(cleanPath, { recursive: true, force: true });
        console.log(colors.gray(`   Removed: ${path.relative(__dirname, cleanPath)}`));
      }
    }
    
    if (!isQuick) {
      // 2. Rebuild registry and CLI
      console.log(colors.yellow('\n🔨 Rebuilding registry and CLI...'));
      
      console.log(colors.gray('   Building registry...'));
      execSync('pnpm build:registry', { 
        cwd: path.join(__dirname, '..'), 
        stdio: 'pipe' 
      });
      
      console.log(colors.gray('   Building CLI...'));
      execSync('pnpm build:cli', { 
        cwd: path.join(__dirname, '..'), 
        stdio: 'pipe' 
      });
    }
    
    // 3. Reinstall components
    console.log(colors.yellow('\n📦 Installing resource-manager...'));
    
    const cliPath = path.join(__dirname, '../packages/cli/dist/cli.js');
    execSync(`node ${cliPath} add resource-manager`, {
      cwd: docsPath,
      stdio: 'inherit'
    });
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log(colors.green(`\n✅ Reset complete! (${duration}s)`));
    console.log(colors.blue('\n📋 What was installed:'));
    console.log(colors.gray('   • resource-manager component'));
    console.log(colors.gray('   • resource-form-generator component (auto-dependency)'));
    console.log(colors.gray('   • shadcn/ui components (table, button, dialog, etc.)'));
    console.log(colors.gray('   • utils library'));
    
    console.log(colors.blue('\n🚀 Ready for development!'));
    console.log(colors.gray('   Run: pnpm dev'));
    
  } catch (error) {
    console.error(colors.red('\n❌ Reset failed:'));
    console.error(error.message);
    
    if (error.stdout) {
      console.log('\nSTDOUT:', error.stdout.toString());
    }
    if (error.stderr) {
      console.log('\nSTDERR:', error.stderr.toString());
    }
    
    process.exit(1);
  }
}

// Help text
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(colors.blue('📖 Reset Docs Script\n'));
  console.log('Usage:');
  console.log('  pnpm reset:docs         # Full reset (rebuild registry + CLI)');
  console.log('  pnpm reset:docs:quick   # Quick reset (skip rebuilds)');
  console.log('');
  console.log('Options:');
  console.log('  --quick                 # Skip registry and CLI rebuilds');
  console.log('  --help, -h              # Show this help');
  console.log('');
  console.log('What it does:');
  console.log('  1. Removes all installed components from docs');
  console.log('  2. Rebuilds registry and CLI (unless --quick)');
  console.log('  3. Reinstalls resource-manager with dependencies');
  process.exit(0);
}

resetDocs();
