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

    // Filter by type if specified
    const filteredComponents = options.type 
      ? Object.entries(components).filter(([, component]) => component.type === options.type)
      : Object.entries(components);

    if (filteredComponents.length === 0) {
      console.log(chalk.gray('No components found.'));
      return;
    }

    // Group by type
    const groupedComponents = filteredComponents.reduce((acc, [componentName, component]) => {
      const type = component.type;
      if (!acc[type]) acc[type] = [];
      acc[type].push(component);
      return acc;
    }, {} as Record<string, any[]>);

    // Display components grouped by type
    Object.entries(groupedComponents).forEach(([type, typeComponents]) => {
      console.log(chalk.yellow(`\n${type.toUpperCase()} Components:`));
      typeComponents.forEach(component => {
        console.log(`  ${chalk.green('●')} ${chalk.bold(component.name)} - ${chalk.gray(component.description)}`);
        if (component.dependencies.length > 0) {
          console.log(`    ${chalk.gray('Dependencies:')} ${component.dependencies.join(', ')}`);
        }
      });
    });

    console.log(chalk.blue('\n📋 Usage:'));
    console.log(chalk.gray('  resource-manager add <component-name>'));
    console.log(chalk.gray('  resource-manager add button --path ./src/components'));

  } catch (error) {
    console.error(chalk.red(`Failed to list components: ${error}`));
  }
}
