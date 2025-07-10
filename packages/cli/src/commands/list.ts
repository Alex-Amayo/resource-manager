import chalk from 'chalk';
import { getRegistry } from '../utils/registry';

interface ListOptions {
  type?: string;
}

export async function listComponents(options: ListOptions = {}) {
  try {
    const registry = await getRegistry();
    const components = registry.components;

    console.log(chalk.blue('📦 Available Components\n'));

    const componentEntries = Object.entries(components);

    if (componentEntries.length === 0) {
      console.log(chalk.gray('No components found.'));
      return;
    }

    // Display components
    componentEntries.forEach(([, component]) => {
      console.log(`  ${chalk.green('●')} ${chalk.bold(component.name)} - ${chalk.gray(component.description)}`);
      if (component.dependencies.length > 0) {
        console.log(`    ${chalk.gray('Dependencies:')} ${component.dependencies.join(', ')}`);
      }
    });

    console.log(chalk.blue('\n📋 Usage:'));
    console.log(chalk.gray('  resource-manager add <component-name>'));

  } catch (error) {
    console.error(chalk.red(`Failed to list components: ${error}`));
  }
}
