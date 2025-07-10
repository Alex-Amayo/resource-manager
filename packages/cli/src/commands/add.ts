import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';
import ora from 'ora';
import { Project } from 'ts-morph';
import { getRegistry, downloadComponent, installDependencies } from '../utils/registry';
import { transformImports } from '../utils/transform';

interface AddOptions {
  path?: string;
  overwrite?: boolean;
}

export async function addComponent(componentName: string, options: AddOptions = {}) {
  const spinner = ora(`Adding ${componentName} component...`).start();
  
  try {
    const registry = await getRegistry();
    const component = registry.components[componentName];
    
    if (!component) {
      spinner.fail(chalk.red(`Component "${componentName}" not found.`));
      console.log(chalk.gray('Available components:'));
      Object.keys(registry.components).forEach(name => {
        console.log(chalk.gray(`  - ${name}`));
      });
      return;
    }

    const outputPath = options.path || './src/components';
    const fullOutputPath = path.resolve(outputPath);

    // Ensure output directory exists
    await fs.ensureDir(fullOutputPath);

    // Download and copy component files
    for (const file of component.files) {
      const sourcePath = path.join(__dirname, '../../registry', file);
      const targetPath = path.join(fullOutputPath, file);
      
      // Check if file exists and overwrite option
      if (await fs.pathExists(targetPath) && !options.overwrite) {
        spinner.warn(chalk.yellow(`File ${file} already exists. Use --overwrite to replace it.`));
        continue;
      }

      await fs.ensureDir(path.dirname(targetPath));
      await fs.copy(sourcePath, targetPath);

      // Transform imports in the copied file
      await transformImports(targetPath, outputPath);
    }

    // Install dependencies
    await installDependencies(component.dependencies);

    // Handle registry dependencies (shadcn/ui components)
    if (component.registryDependencies && component.registryDependencies.length > 0) {
      spinner.text = 'Installing shadcn/ui dependencies...';
      
      // Check if shadcn is installed
      try {
        const { execSync } = require('child_process');
        execSync('npx shadcn@latest --version', { stdio: 'ignore' });
        
        // Install each registry dependency
        for (const dep of component.registryDependencies) {
          try {
            execSync(`npx shadcn@latest add ${dep} --yes`, { stdio: 'inherit' });
          } catch (error) {
            console.warn(chalk.yellow(`Warning: Could not install ${dep}. Please install manually with: npx shadcn@latest add ${dep}`));
          }
        }
      } catch (error) {
        console.log(chalk.yellow('\n⚠️  shadcn/ui CLI not found. Please install dependencies manually:'));
        component.registryDependencies.forEach(dep => {
          console.log(chalk.gray(`   npx shadcn@latest add ${dep}`));
        });
      }
    }

    // Handle local dependencies recursively (for utils, etc.)
    if (component.localDependencies && component.localDependencies.length > 0) {
      spinner.text = 'Installing local dependencies...';
      
      for (const dep of component.localDependencies) {
        const depName = dep.replace('@/components/ui/', '').replace('@/lib/', '');
        
        if (registry.components[depName]) {
          await addComponent(depName, { ...options, path: outputPath });
        } else if (dep === '@/lib/utils') {
          // Handle utils specially
          const utilsComponent = registry.components['utils'];
          if (utilsComponent) {
            await addComponent('utils', { ...options, path: outputPath });
          }
        }
      }
    }

    spinner.succeed(chalk.green(`✅ Added ${componentName} component successfully!`));
    
    // Show usage information
    console.log(chalk.blue('\n📋 Next steps:'));
    console.log(chalk.gray(`  Import: import { ${component.name} } from "@/components/${component.type}/${component.name}"`));
    
    if (component.docs) {
      console.log(chalk.gray(`  Docs: ${component.docs}`));
    }

  } catch (error) {
    spinner.fail(chalk.red(`Failed to add ${componentName}: ${error}`));
    console.error(error);
  }
}
