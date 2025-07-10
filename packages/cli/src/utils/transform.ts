import fs from 'fs-extra';
import { Project, SourceFile } from 'ts-morph';
import path from 'path';

export async function transformImports(filePath: string, outputPath: string): Promise<void> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    
    // Transform @/lib/utils to relative path
    let transformedContent = content.replace(
      /from ['"]@\/lib\/utils['"]/g, 
      `from "${path.relative(path.dirname(filePath), path.join(outputPath, 'lib/utils'))}"`
    );

    // Transform @/components/ui/* to relative paths  
    transformedContent = transformedContent.replace(
      /from ['"]@\/components\/ui\/([^'"]+)['"]/g,
      (match, componentName) => {
        const relativePath = path.relative(path.dirname(filePath), path.join(outputPath, 'ui', componentName));
        return `from "${relativePath}"`;
      }
    );

    // Write back the transformed content
    await fs.writeFile(filePath, transformedContent);
  } catch (error) {
    console.warn(`Warning: Could not transform imports in ${filePath}: ${error}`);
  }
}

export function resolveImportPath(importPath: string, fromPath: string, outputPath: string): string {
  // Handle @/ alias imports
  if (importPath.startsWith('@/')) {
    const relativePath = importPath.replace('@/', '');
    const absolutePath = path.join(outputPath, relativePath);
    return path.relative(path.dirname(fromPath), absolutePath);
  }
  
  return importPath;
}
