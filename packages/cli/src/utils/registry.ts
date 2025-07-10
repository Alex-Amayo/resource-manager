import fs from 'fs-extra';
import path from 'path';
import fetch from 'node-fetch';
import { execSync } from 'child_process';
import chalk from 'chalk';

export interface ComponentMetadata {
  name: string;
  type: string;
  files: string[];
  dependencies: string[];
  devDependencies: string[];
  localDependencies: string[];
  description: string;
  docs?: string;
}

export interface Registry {
  version: string;
  components: Record<string, ComponentMetadata>;
  styles: Record<string, any>;
}

const REGISTRY_URL = 'https://raw.githubusercontent.com/your-org/resource-manager/main/packages/registry';

export async function getRegistry(): Promise<Registry> {
  try {
    // Try to read from local registry first (for development)
    const localRegistryPath = path.resolve(process.cwd(), '../registry/registry.json');
    if (await fs.pathExists(localRegistryPath)) {
      return await fs.readJson(localRegistryPath);
    }

    // Fallback to remote registry
    const response = await fetch(`${REGISTRY_URL}/registry.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch registry: ${response.statusText}`);
    }
    return await response.json() as Registry;
  } catch (error) {
    throw new Error(`Failed to load component registry: ${error}`);
  }
}

export async function downloadComponent(componentPath: string): Promise<string> {
  try {
    // Try local first
    const localPath = path.resolve(process.cwd(), '../registry', componentPath);
    if (await fs.pathExists(localPath)) {
      return await fs.readFile(localPath, 'utf-8');
    }

    // Fallback to remote
    const response = await fetch(`${REGISTRY_URL}/${componentPath}`);
    if (!response.ok) {
      throw new Error(`Failed to download ${componentPath}: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    throw new Error(`Failed to download component ${componentPath}: ${error}`);
  }
}

export async function installDependencies(dependencies: string[]): Promise<void> {
  if (dependencies.length === 0) return;

  console.log(chalk.blue(`📦 Installing dependencies: ${dependencies.join(', ')}`));
  
  try {
    // Check if we're in a pnpm workspace
    const hasPnpmLock = await fs.pathExists('pnpm-lock.yaml');
    const hasYarnLock = await fs.pathExists('yarn.lock');
    
    let installCommand: string;
    
    if (hasPnpmLock) {
      installCommand = `pnpm add ${dependencies.join(' ')}`;
    } else if (hasYarnLock) {
      installCommand = `yarn add ${dependencies.join(' ')}`;
    } else {
      installCommand = `npm install ${dependencies.join(' ')}`;
    }

    execSync(installCommand, { stdio: 'inherit' });
  } catch (error) {
    console.warn(chalk.yellow(`⚠️  Failed to auto-install dependencies. Please install manually:`));
    console.log(chalk.gray(`  ${dependencies.join(' ')}`));
  }
}

export async function detectPackageManager(): Promise<'npm' | 'yarn' | 'pnpm'> {
  if (await fs.pathExists('pnpm-lock.yaml')) {
    return 'pnpm';
  }
  if (await fs.pathExists('yarn.lock')) {
    return 'yarn';
  }
  return 'npm';
}
