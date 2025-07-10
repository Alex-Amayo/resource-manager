interface AddOptions {
    path?: string;
    overwrite?: boolean;
}
declare function addComponent(componentName: string, options?: AddOptions): Promise<void>;

interface ListOptions {
    type?: string;
}
declare function listComponents(options?: ListOptions): Promise<void>;

interface UpdateOptions {
    path?: string;
}
declare function updateComponent(componentName: string, options?: UpdateOptions): Promise<void>;

interface InitOptions {
    yes?: boolean;
}
declare function initProject(options?: InitOptions): Promise<void>;

interface ComponentMetadata {
    name: string;
    type: string;
    files: string[];
    dependencies: string[];
    devDependencies: string[];
    localDependencies: string[];
    description: string;
    docs?: string;
}
interface Registry {
    version: string;
    components: Record<string, ComponentMetadata>;
    styles: Record<string, any>;
}
declare function getRegistry(): Promise<Registry>;
declare function downloadComponent(componentPath: string): Promise<string>;
declare function installDependencies(dependencies: string[]): Promise<void>;

declare function transformImports(filePath: string, outputPath: string): Promise<void>;

export { addComponent, downloadComponent, getRegistry, initProject, installDependencies, listComponents, transformImports, updateComponent };
