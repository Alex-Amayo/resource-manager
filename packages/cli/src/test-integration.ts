#!/usr/bin/env node

/**
 * Manual Integration Test Script
 * 
 * This script performs manual testing of the resource-manager CLI
 * with the new shadcn/ui registry dependencies approach.
 */

import fs from 'fs-extra'
import path from 'path'
import { execSync } from 'child_process'
import chalk from 'chalk'

async function runTests() {
  console.log(chalk.blue('🧪 Running Resource Manager Integration Tests\n'))

  let passed = 0
  let failed = 0

  const test = (name: string, fn: () => Promise<void> | void) => {
    return async () => {
      try {
        console.log(chalk.gray(`⏳ ${name}...`))
        await fn()
        console.log(chalk.green(`✅ ${name}`))
        passed++
      } catch (error) {
        console.log(chalk.red(`❌ ${name}`))
        console.log(chalk.gray(`   Error: ${error instanceof Error ? error.message : String(error)}`))
        failed++
      }
    }
  }

  // Test 1: Registry file exists and is valid JSON
  await test('Registry file exists and is valid JSON', async () => {
    const registryPath = path.resolve(__dirname, '../../registry/registry.json')
    const exists = await fs.pathExists(registryPath)
    if (!exists) throw new Error('Registry file not found')
    
    const registry = await fs.readJson(registryPath)
    if (!registry.version) throw new Error('Registry missing version')
    if (!registry.components) throw new Error('Registry missing components')
  })()

  // Test 2: Registry has expected registryDependencies structure
  await test('Registry has registryDependencies structure', async () => {
    const registryPath = path.resolve(__dirname, '../../registry/registry.json')
    const registry = await fs.readJson(registryPath)
    
    const rm = registry.components['resource-manager']
    if (!rm.registryDependencies) throw new Error('resource-manager missing registryDependencies')
    if (!rm.registryDependencies.includes('button')) throw new Error('resource-manager missing button dependency')
    
    const fg = registry.components['resource-form-generator']
    if (!fg.registryDependencies) throw new Error('resource-form-generator missing registryDependencies')
    if (!fg.registryDependencies.includes('dialog')) throw new Error('resource-form-generator missing dialog dependency')
  })()

  // Test 3: Component files exist
  await test('All component files exist', async () => {
    const registryPath = path.resolve(__dirname, '../../registry/registry.json')
    const registry = await fs.readJson(registryPath)
    
    for (const [name, component] of Object.entries(registry.components)) {
      for (const file of (component as any).files) {
        const filePath = path.resolve(__dirname, '../../registry', file)
        const exists = await fs.pathExists(filePath)
        if (!exists) throw new Error(`File ${file} for ${name} not found`)
      }
    }
  })()

  // Test 4: Components use correct import patterns
  await test('Components use correct import patterns', async () => {
    const resourceManagerPath = path.resolve(__dirname, '../../registry/resource-manager/resource-manager.tsx')
    const content = await fs.readFile(resourceManagerPath, 'utf-8')
    
    if (!content.includes('@/components/ui/button')) {
      throw new Error('resource-manager.tsx should use @/components/ui/button import')
    }
    if (!content.includes('@/lib/utils')) {
      throw new Error('resource-manager.tsx should use @/lib/utils import')
    }
  })()

  // Test 5: CLI build works
  await test('CLI builds successfully', async () => {
    try {
      execSync('pnpm build', { cwd: __dirname, stdio: 'pipe' })
    } catch (error) {
      throw new Error('CLI build failed')
    }
  })()

  // Test 6: TypeScript interfaces support registryDependencies
  await test('TypeScript interfaces support registryDependencies', async () => {
    const registryUtilsPath = path.resolve(__dirname, '../utils/registry.ts')
    const content = await fs.readFile(registryUtilsPath, 'utf-8')
    
    if (!content.includes('registryDependencies?:')) {
      throw new Error('ComponentMetadata interface should include registryDependencies')
    }
  })()

  // Summary
  console.log('\n' + '='.repeat(50))
  console.log(chalk.blue('📊 Test Results:'))
  console.log(chalk.green(`✅ Passed: ${passed}`))
  console.log(chalk.red(`❌ Failed: ${failed}`))
  console.log(chalk.gray(`📝 Total: ${passed + failed}`))

  if (failed === 0) {
    console.log(chalk.green('\n🎉 All tests passed! The shadcn/ui integration is working correctly.'))
    console.log(chalk.gray('\n📋 Next steps:'))
    console.log(chalk.gray('1. Install dependencies: pnpm install'))
    console.log(chalk.gray('2. Test manually: pnpm test:run'))
    console.log(chalk.gray('3. Build CLI: pnpm build'))
    console.log(chalk.gray('4. Test CLI in a project with shadcn/ui'))
  } else {
    console.log(chalk.red('\n💥 Some tests failed. Please check the errors above.'))
    process.exit(1)
  }
}

runTests().catch(error => {
  console.error(chalk.red('💥 Test runner failed:'), error)
  process.exit(1)
})
