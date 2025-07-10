import chalk from 'chalk';
import { addComponent } from './add';

interface UpdateOptions {
  path?: string;
}

export async function updateComponent(componentName: string, options: UpdateOptions = {}) {
  console.log(chalk.blue(`🔄 Updating ${componentName} component...`));
  
  // Update is essentially the same as add with overwrite flag
  await addComponent(componentName, {
    ...options,
    overwrite: true
  });
}
