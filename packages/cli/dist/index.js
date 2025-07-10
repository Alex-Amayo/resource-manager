"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  addComponent: () => addComponent,
  downloadComponent: () => downloadComponent,
  getRegistry: () => getRegistry,
  initProject: () => initProject,
  installDependencies: () => installDependencies,
  listComponents: () => listComponents,
  transformImports: () => transformImports,
  updateComponent: () => updateComponent
});
module.exports = __toCommonJS(index_exports);

// src/commands/add.ts
var import_path3 = __toESM(require("path"));
var import_fs_extra3 = __toESM(require("fs-extra"));
var import_chalk2 = __toESM(require("chalk"));
var import_ora = __toESM(require("ora"));

// src/utils/registry.ts
var import_fs_extra = __toESM(require("fs-extra"));
var import_path = __toESM(require("path"));
var import_node_fetch = __toESM(require("node-fetch"));
var import_child_process = require("child_process");
var import_chalk = __toESM(require("chalk"));
var REGISTRY_URL = "https://raw.githubusercontent.com/your-org/resource-manager/main/packages/registry";
async function getRegistry() {
  try {
    const localRegistryPath = import_path.default.resolve(process.cwd(), "../registry/registry.json");
    if (await import_fs_extra.default.pathExists(localRegistryPath)) {
      return await import_fs_extra.default.readJson(localRegistryPath);
    }
    const response = await (0, import_node_fetch.default)(`${REGISTRY_URL}/registry.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch registry: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to load component registry: ${error}`);
  }
}
async function downloadComponent(componentPath) {
  try {
    const localPath = import_path.default.resolve(process.cwd(), "../registry", componentPath);
    if (await import_fs_extra.default.pathExists(localPath)) {
      return await import_fs_extra.default.readFile(localPath, "utf-8");
    }
    const response = await (0, import_node_fetch.default)(`${REGISTRY_URL}/${componentPath}`);
    if (!response.ok) {
      throw new Error(`Failed to download ${componentPath}: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    throw new Error(`Failed to download component ${componentPath}: ${error}`);
  }
}
async function installDependencies(dependencies) {
  if (dependencies.length === 0) return;
  console.log(import_chalk.default.blue(`\u{1F4E6} Installing dependencies: ${dependencies.join(", ")}`));
  try {
    const hasPnpmLock = await import_fs_extra.default.pathExists("pnpm-lock.yaml");
    const hasYarnLock = await import_fs_extra.default.pathExists("yarn.lock");
    let installCommand;
    if (hasPnpmLock) {
      installCommand = `pnpm add ${dependencies.join(" ")}`;
    } else if (hasYarnLock) {
      installCommand = `yarn add ${dependencies.join(" ")}`;
    } else {
      installCommand = `npm install ${dependencies.join(" ")}`;
    }
    (0, import_child_process.execSync)(installCommand, { stdio: "inherit" });
  } catch (error) {
    console.warn(import_chalk.default.yellow(`\u26A0\uFE0F  Failed to auto-install dependencies. Please install manually:`));
    console.log(import_chalk.default.gray(`  ${dependencies.join(" ")}`));
  }
}
async function detectPackageManager() {
  if (await import_fs_extra.default.pathExists("pnpm-lock.yaml")) {
    return "pnpm";
  }
  if (await import_fs_extra.default.pathExists("yarn.lock")) {
    return "yarn";
  }
  return "npm";
}

// src/utils/transform.ts
var import_fs_extra2 = __toESM(require("fs-extra"));
var import_path2 = __toESM(require("path"));
async function transformImports(filePath, outputPath) {
  try {
    const content = await import_fs_extra2.default.readFile(filePath, "utf-8");
    let transformedContent = content.replace(
      /from ['"]@\/lib\/utils['"]/g,
      `from "${import_path2.default.relative(import_path2.default.dirname(filePath), import_path2.default.join(outputPath, "lib/utils"))}"`
    );
    transformedContent = transformedContent.replace(
      /from ['"]@\/components\/ui\/([^'"]+)['"]/g,
      (match, componentName) => {
        const relativePath = import_path2.default.relative(import_path2.default.dirname(filePath), import_path2.default.join(outputPath, "ui", componentName));
        return `from "${relativePath}"`;
      }
    );
    await import_fs_extra2.default.writeFile(filePath, transformedContent);
  } catch (error) {
    console.warn(`Warning: Could not transform imports in ${filePath}: ${error}`);
  }
}

// src/commands/add.ts
async function addComponent(componentName, options = {}) {
  const spinner = (0, import_ora.default)(`Adding ${componentName} component...`).start();
  try {
    const registry = await getRegistry();
    const component = registry.components[componentName];
    if (!component) {
      spinner.fail(import_chalk2.default.red(`Component "${componentName}" not found.`));
      console.log(import_chalk2.default.gray("Available components:"));
      Object.keys(registry.components).forEach((name) => {
        console.log(import_chalk2.default.gray(`  - ${name}`));
      });
      return;
    }
    const outputPath = options.path || "./src/components";
    const fullOutputPath = import_path3.default.resolve(outputPath);
    await import_fs_extra3.default.ensureDir(fullOutputPath);
    for (const file of component.files) {
      const sourcePath = import_path3.default.join(__dirname, "../../registry", file);
      const targetPath = import_path3.default.join(fullOutputPath, file);
      if (await import_fs_extra3.default.pathExists(targetPath) && !options.overwrite) {
        spinner.warn(import_chalk2.default.yellow(`File ${file} already exists. Use --overwrite to replace it.`));
        continue;
      }
      await import_fs_extra3.default.ensureDir(import_path3.default.dirname(targetPath));
      await import_fs_extra3.default.copy(sourcePath, targetPath);
      await transformImports(targetPath, outputPath);
    }
    await installDependencies(component.dependencies);
    if (component.registryDependencies && component.registryDependencies.length > 0) {
      spinner.text = "Installing shadcn/ui dependencies...";
      try {
        const { execSync: execSync2 } = require("child_process");
        execSync2("npx shadcn@latest --version", { stdio: "ignore" });
        for (const dep of component.registryDependencies) {
          try {
            execSync2(`npx shadcn@latest add ${dep} --yes`, { stdio: "inherit" });
          } catch (error) {
            console.warn(import_chalk2.default.yellow(`Warning: Could not install ${dep}. Please install manually with: npx shadcn@latest add ${dep}`));
          }
        }
      } catch (error) {
        console.log(import_chalk2.default.yellow("\n\u26A0\uFE0F  shadcn/ui CLI not found. Please install dependencies manually:"));
        component.registryDependencies.forEach((dep) => {
          console.log(import_chalk2.default.gray(`   npx shadcn@latest add ${dep}`));
        });
      }
    }
    if (component.localDependencies && component.localDependencies.length > 0) {
      spinner.text = "Installing local dependencies...";
      for (const dep of component.localDependencies) {
        const depName = dep.replace("@/components/ui/", "").replace("@/lib/", "");
        if (registry.components[depName]) {
          await addComponent(depName, { ...options, path: outputPath });
        } else if (dep === "@/lib/utils") {
          const utilsComponent = registry.components["utils"];
          if (utilsComponent) {
            await addComponent("utils", { ...options, path: outputPath });
          }
        }
      }
    }
    spinner.succeed(import_chalk2.default.green(`\u2705 Added ${componentName} component successfully!`));
    console.log(import_chalk2.default.blue("\n\u{1F4CB} Next steps:"));
    console.log(import_chalk2.default.gray(`  Import: import { ${component.name} } from "@/components/${component.type}/${component.name}"`));
    if (component.docs) {
      console.log(import_chalk2.default.gray(`  Docs: ${component.docs}`));
    }
  } catch (error) {
    spinner.fail(import_chalk2.default.red(`Failed to add ${componentName}: ${error}`));
    console.error(error);
  }
}

// src/commands/list.ts
var import_chalk3 = __toESM(require("chalk"));
async function listComponents(options = {}) {
  try {
    const registry = await getRegistry();
    const components = registry.components;
    console.log(import_chalk3.default.blue("\u{1F4E6} Available Components\n"));
    const componentEntries = Object.entries(components);
    if (componentEntries.length === 0) {
      console.log(import_chalk3.default.gray("No components found."));
      return;
    }
    componentEntries.forEach(([, component]) => {
      console.log(`  ${import_chalk3.default.green("\u25CF")} ${import_chalk3.default.bold(component.name)} - ${import_chalk3.default.gray(component.description)}`);
      if (component.dependencies.length > 0) {
        console.log(`    ${import_chalk3.default.gray("Dependencies:")} ${component.dependencies.join(", ")}`);
      }
    });
    console.log(import_chalk3.default.blue("\n\u{1F4CB} Usage:"));
    console.log(import_chalk3.default.gray("  resource-manager add <component-name>"));
  } catch (error) {
    console.error(import_chalk3.default.red(`Failed to list components: ${error}`));
  }
}

// src/commands/update.ts
var import_chalk4 = __toESM(require("chalk"));
async function updateComponent(componentName, options = {}) {
  console.log(import_chalk4.default.blue(`\u{1F504} Updating ${componentName} component...`));
  await addComponent(componentName, {
    ...options,
    overwrite: true
  });
}

// src/commands/init.ts
var import_fs_extra4 = __toESM(require("fs-extra"));
var import_path4 = __toESM(require("path"));
var import_chalk5 = __toESM(require("chalk"));
var import_prompts = __toESM(require("prompts"));
async function initProject(options = {}) {
  console.log(import_chalk5.default.blue("\u{1F680} Initializing Resource Manager in your project...\n"));
  try {
    const packageJsonPath = import_path4.default.join(process.cwd(), "package.json");
    if (!await import_fs_extra4.default.pathExists(packageJsonPath)) {
      console.log(import_chalk5.default.red("\u274C No package.json found. Please run this command in a valid project directory."));
      return;
    }
    const packageJson = await import_fs_extra4.default.readJson(packageJsonPath);
    const requiredDeps = ["react", "react-dom"];
    const missingDeps = requiredDeps.filter(
      (dep) => !packageJson.dependencies?.[dep] && !packageJson.peerDependencies?.[dep]
    );
    if (missingDeps.length > 0) {
      console.log(import_chalk5.default.yellow(`\u26A0\uFE0F  Missing required dependencies: ${missingDeps.join(", ")}`));
      console.log(import_chalk5.default.gray("Please install React first and then run this command again."));
      return;
    }
    const hasTailwind = packageJson.dependencies?.["tailwindcss"] || packageJson.devDependencies?.["tailwindcss"];
    if (!hasTailwind) {
      console.log(import_chalk5.default.yellow("\u26A0\uFE0F  Tailwind CSS not found. Resource Manager components require Tailwind CSS."));
      if (!options.yes) {
        const { installTailwind } = await (0, import_prompts.default)({
          type: "confirm",
          name: "installTailwind",
          message: "Would you like help setting up Tailwind CSS?",
          initial: true
        });
        if (installTailwind) {
          console.log(import_chalk5.default.blue("\n\u{1F4D6} Tailwind CSS Setup Instructions:"));
          console.log(import_chalk5.default.gray("1. Install Tailwind CSS:"));
          const pm = await detectPackageManager();
          console.log(import_chalk5.default.gray(`   ${pm} ${pm === "npm" ? "install" : "add"} -D tailwindcss autoprefixer postcss`));
          console.log(import_chalk5.default.gray("2. Initialize Tailwind config:"));
          console.log(import_chalk5.default.gray("   npx tailwindcss init -p"));
          console.log(import_chalk5.default.gray("3. Configure your tailwind.config.js"));
          console.log(import_chalk5.default.gray("4. Add Tailwind directives to your CSS"));
          console.log(import_chalk5.default.blue("\nFor detailed instructions, visit: https://tailwindcss.com/docs/installation"));
          return;
        }
      }
    }
    const componentsJsonPath = import_path4.default.join(process.cwd(), "components.json");
    const hasShadcnConfig = await import_fs_extra4.default.pathExists(componentsJsonPath);
    if (!hasShadcnConfig) {
      console.log(import_chalk5.default.yellow("\u26A0\uFE0F  shadcn/ui not detected. Resource Manager requires shadcn/ui to be set up."));
      if (!options.yes) {
        const { setupShadcn } = await (0, import_prompts.default)({
          type: "confirm",
          name: "setupShadcn",
          message: "Would you like to run shadcn/ui init now?",
          initial: true
        });
        if (setupShadcn) {
          console.log(import_chalk5.default.blue("\n\u{1F3A8} Setting up shadcn/ui..."));
          try {
            const { execSync: execSync2 } = require("child_process");
            execSync2("npx shadcn@latest init", { stdio: "inherit" });
            console.log(import_chalk5.default.green("\u2705 shadcn/ui initialized successfully!"));
          } catch (error) {
            console.log(import_chalk5.default.red("\u274C Failed to initialize shadcn/ui. Please run manually:"));
            console.log(import_chalk5.default.gray("   npx shadcn@latest init"));
            return;
          }
        } else {
          console.log(import_chalk5.default.yellow("\n\u26A0\uFE0F  Please set up shadcn/ui first:"));
          console.log(import_chalk5.default.gray("   npx shadcn@latest init"));
          console.log(import_chalk5.default.gray("   Then run: resource-manager init"));
          return;
        }
      } else {
        console.log(import_chalk5.default.yellow("\n\u26A0\uFE0F  Please set up shadcn/ui first:"));
        console.log(import_chalk5.default.gray("   npx shadcn@latest init"));
        return;
      }
    } else {
      console.log(import_chalk5.default.green("\u2705 shadcn/ui configuration found"));
    }
    const componentsDir = import_path4.default.join(process.cwd(), "src", "components");
    await import_fs_extra4.default.ensureDir(import_path4.default.join(componentsDir, "ui"));
    await import_fs_extra4.default.ensureDir(import_path4.default.join(componentsDir, "lib"));
    const utilsSource = import_path4.default.join(__dirname, "../../../registry/lib/utils.ts");
    const utilsTarget = import_path4.default.join(componentsDir, "lib", "utils.ts");
    if (await import_fs_extra4.default.pathExists(utilsSource)) {
      await import_fs_extra4.default.copy(utilsSource, utilsTarget);
      console.log(import_chalk5.default.green("\u2705 Created lib/utils.ts"));
    }
    const stylesDir = import_path4.default.join(process.cwd(), "src", "styles");
    await import_fs_extra4.default.ensureDir(stylesDir);
    const globalsSource = import_path4.default.join(__dirname, "../../../registry/styles/globals.css");
    const globalsTarget = import_path4.default.join(stylesDir, "globals.css");
    if (await import_fs_extra4.default.pathExists(globalsSource)) {
      if (!await import_fs_extra4.default.pathExists(globalsTarget) || options.yes) {
        await import_fs_extra4.default.copy(globalsSource, globalsTarget);
        console.log(import_chalk5.default.green("\u2705 Created styles/globals.css with CSS variables"));
      } else {
        const { overwriteStyles } = await (0, import_prompts.default)({
          type: "confirm",
          name: "overwriteStyles",
          message: "styles/globals.css already exists. Overwrite with Resource Manager styles?",
          initial: false
        });
        if (overwriteStyles) {
          await import_fs_extra4.default.copy(globalsSource, globalsTarget);
          console.log(import_chalk5.default.green("\u2705 Updated styles/globals.css"));
        } else {
          console.log(import_chalk5.default.yellow("\u26A0\uFE0F  Please manually add the CSS variables from the Resource Manager globals.css"));
        }
      }
    }
    const tsconfigPath = import_path4.default.join(process.cwd(), "tsconfig.json");
    if (await import_fs_extra4.default.pathExists(tsconfigPath)) {
      const tsconfig = await import_fs_extra4.default.readJson(tsconfigPath);
      if (!tsconfig.compilerOptions?.paths?.["@/*"]) {
        if (!options.yes) {
          const { addPaths } = await (0, import_prompts.default)({
            type: "confirm",
            name: "addPaths",
            message: "Add path aliases to tsconfig.json? (Recommended)",
            initial: true
          });
          if (addPaths) {
            tsconfig.compilerOptions = tsconfig.compilerOptions || {};
            tsconfig.compilerOptions.paths = tsconfig.compilerOptions.paths || {};
            tsconfig.compilerOptions.paths["@/*"] = ["./src/*"];
            tsconfig.compilerOptions.baseUrl = ".";
            await import_fs_extra4.default.writeJson(tsconfigPath, tsconfig, { spaces: 2 });
            console.log(import_chalk5.default.green("\u2705 Updated tsconfig.json with path aliases"));
          }
        }
      }
    }
    console.log(import_chalk5.default.green("\n\u{1F389} Resource Manager initialized successfully!"));
    console.log(import_chalk5.default.blue("\n\u{1F4CB} Next steps:"));
    console.log(import_chalk5.default.gray("  1. Import styles/globals.css in your main CSS/app file"));
    console.log(import_chalk5.default.gray("  2. Add your first component: resource-manager add button"));
    console.log(import_chalk5.default.gray("  3. View all components: resource-manager list"));
  } catch (error) {
    console.error(import_chalk5.default.red(`Failed to initialize project: ${error}`));
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addComponent,
  downloadComponent,
  getRegistry,
  initProject,
  installDependencies,
  listComponents,
  transformImports,
  updateComponent
});
