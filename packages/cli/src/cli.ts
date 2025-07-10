import { Command } from 'commander';
import chalk from 'chalk';
import { addComponent } from './commands/add';
import { listComponents } from './commands/list';
import { updateComponent } from './commands/update';
import { initProject } from './commands/init';

const program = new Command();

console.log(chalk.green('🚀 Resource Manager CLI'));

program
  .name('resource-manager')
  .description('CLI for adding Resource Manager components to your project')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize project with necessary configuration')
  .option('-y, --yes', 'Skip confirmation prompts')
  .action(initProject);

program
  .command('add <component>')
  .description('Add a component to your project')
  .option('-p, --path <path>', 'Specify the output path', './src/components')
  .option('--overwrite', 'Overwrite existing files')
  .action(addComponent);

program
  .command('list')
  .description('List all available components')
  .option('-t, --type <type>', 'Filter by component type (ui, component, lib)')
  .action(listComponents);

program
  .command('update <component>')
  .description('Update an existing component')
  .option('-p, --path <path>', 'Specify the component path', './src/components')
  .action(updateComponent);

program.parse();
