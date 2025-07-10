import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import prompts from 'prompts';
import { detectPackageManager } from '../utils/registry';

interface InitOptions {
  yes?: boolean;
}

export async function initProject(options: InitOptions = {}) {
  console.log(chalk.blue('🚀 Initializing Resource Manager in your project...\n'));

  try {
    // Check if we're in a valid project directory
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    if (!await fs.pathExists(packageJsonPath)) {
      console.log(chalk.red('❌ No package.json found. Please run this command in a valid project directory.'));
      return;
    }

    const packageJson = await fs.readJson(packageJsonPath);

    // Check for required dependencies
    const requiredDeps = ['react', 'react-dom'];
    const missingDeps = requiredDeps.filter(dep => 
      !packageJson.dependencies?.[dep] && !packageJson.peerDependencies?.[dep]
    );

    if (missingDeps.length > 0) {
      console.log(chalk.yellow(`⚠️  Missing required dependencies: ${missingDeps.join(', ')}`));
      console.log(chalk.gray('Please install React first and then run this command again.'));
      return;
    }

    // Check for Tailwind CSS
    const hasTailwind = packageJson.dependencies?.['tailwindcss'] || 
                       packageJson.devDependencies?.['tailwindcss'];

    if (!hasTailwind) {
      console.log(chalk.yellow('⚠️  Tailwind CSS not found. Resource Manager components require Tailwind CSS.'));
      
      if (!options.yes) {
        const { installTailwind } = await prompts({
          type: 'confirm',
          name: 'installTailwind',
          message: 'Would you like help setting up Tailwind CSS?',
          initial: true
        });

        if (installTailwind) {
          console.log(chalk.blue('\n📖 Tailwind CSS Setup Instructions:'));
          console.log(chalk.gray('1. Install Tailwind CSS:'));
          const pm = await detectPackageManager();
          console.log(chalk.gray(`   ${pm} ${pm === 'npm' ? 'install' : 'add'} -D tailwindcss autoprefixer postcss`));
          console.log(chalk.gray('2. Initialize Tailwind config:'));
          console.log(chalk.gray('   npx tailwindcss init -p'));
          console.log(chalk.gray('3. Configure your tailwind.config.js'));
          console.log(chalk.gray('4. Add Tailwind directives to your CSS'));
          console.log(chalk.blue('\nFor detailed instructions, visit: https://tailwindcss.com/docs/installation'));
          return;
        }
      }
    }

    // Check for shadcn/ui setup
    const componentsJsonPath = path.join(process.cwd(), 'components.json');
    const hasShadcnConfig = await fs.pathExists(componentsJsonPath);

    if (!hasShadcnConfig) {
      console.log(chalk.yellow('⚠️  shadcn/ui not detected. Resource Manager requires shadcn/ui to be set up.'));
      
      if (!options.yes) {
        const { setupShadcn } = await prompts({
          type: 'confirm',
          name: 'setupShadcn',
          message: 'Would you like to run shadcn/ui init now?',
          initial: true
        });

        if (setupShadcn) {
          console.log(chalk.blue('\n🎨 Setting up shadcn/ui...'));
          try {
            const { execSync } = require('child_process');
            execSync('npx shadcn@latest init', { stdio: 'inherit' });
            console.log(chalk.green('✅ shadcn/ui initialized successfully!'));
          } catch (error) {
            console.log(chalk.red('❌ Failed to initialize shadcn/ui. Please run manually:'));
            console.log(chalk.gray('   npx shadcn@latest init'));
            return;
          }
        } else {
          console.log(chalk.yellow('\n⚠️  Please set up shadcn/ui first:'));
          console.log(chalk.gray('   npx shadcn@latest init'));
          console.log(chalk.gray('   Then run: resource-manager init'));
          return;
        }
      } else {
        console.log(chalk.yellow('\n⚠️  Please set up shadcn/ui first:'));
        console.log(chalk.gray('   npx shadcn@latest init'));
        return;
      }
    } else {
      console.log(chalk.green('✅ shadcn/ui configuration found'));
    }

    // Create components directory structure
    const componentsDir = path.join(process.cwd(), 'src', 'components');
    await fs.ensureDir(path.join(componentsDir, 'ui'));
    await fs.ensureDir(path.join(componentsDir, 'lib'));

    // Copy utils file
    const utilsSource = path.join(__dirname, '../../../registry/lib/utils.ts');
    const utilsTarget = path.join(componentsDir, 'lib', 'utils.ts');
    
    if (await fs.pathExists(utilsSource)) {
      await fs.copy(utilsSource, utilsTarget);
      console.log(chalk.green('✅ Created lib/utils.ts'));
    }

    // Copy globals.css
    const stylesDir = path.join(process.cwd(), 'src', 'styles'); 
    await fs.ensureDir(stylesDir);
    
    const globalsSource = path.join(__dirname, '../../../registry/styles/globals.css');
    const globalsTarget = path.join(stylesDir, 'globals.css');
    
    if (await fs.pathExists(globalsSource)) {
      if (!await fs.pathExists(globalsTarget) || options.yes) {
        await fs.copy(globalsSource, globalsTarget);
        console.log(chalk.green('✅ Created styles/globals.css with CSS variables'));
      } else {
        const { overwriteStyles } = await prompts({
          type: 'confirm',
          name: 'overwriteStyles',
          message: 'styles/globals.css already exists. Overwrite with Resource Manager styles?',
          initial: false
        });

        if (overwriteStyles) {
          await fs.copy(globalsSource, globalsTarget);
          console.log(chalk.green('✅ Updated styles/globals.css'));
        } else {
          console.log(chalk.yellow('⚠️  Please manually add the CSS variables from the Resource Manager globals.css'));
        }
      }
    }

    // Create tsconfig paths (if TypeScript project)
    const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
    if (await fs.pathExists(tsconfigPath)) {
      const tsconfig = await fs.readJson(tsconfigPath);
      
      if (!tsconfig.compilerOptions?.paths?.['@/*']) {
        if (!options.yes) {
          const { addPaths } = await prompts({
            type: 'confirm',
            name: 'addPaths',
            message: 'Add path aliases to tsconfig.json? (Recommended)',
            initial: true
          });

          if (addPaths) {
            tsconfig.compilerOptions = tsconfig.compilerOptions || {};
            tsconfig.compilerOptions.paths = tsconfig.compilerOptions.paths || {};
            tsconfig.compilerOptions.paths['@/*'] = ['./src/*'];
            tsconfig.compilerOptions.baseUrl = '.';

            await fs.writeJson(tsconfigPath, tsconfig, { spaces: 2 });
            console.log(chalk.green('✅ Updated tsconfig.json with path aliases'));
          }
        }
      }
    }

    console.log(chalk.green('\n🎉 Resource Manager initialized successfully!'));
    console.log(chalk.blue('\n📋 Next steps:'));
    console.log(chalk.gray('  1. Import styles/globals.css in your main CSS/app file'));
    console.log(chalk.gray('  2. Add your first component: resource-manager add button'));
    console.log(chalk.gray('  3. View all components: resource-manager list'));

  } catch (error) {
    console.error(chalk.red(`Failed to initialize project: ${error}`));
  }
}
