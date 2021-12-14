import { Tree, formatFiles, ProjectConfiguration, getProjects, updateProjectConfiguration } from '@nrwl/devkit';
import { updateJson } from '@nrwl/devkit';

function getScopes(projectMap: Map<string, ProjectConfiguration>) {
  const projects: any[] = Array.from(projectMap).map((p) => p[1]);
  const allScopes: string[] = projects
    .map((project) =>
      project.tags.filter((tag: string) => tag.startsWith('scope:'))
    )
    .reduce((acc, tags) => [...acc, ...tags], [])
    .map((scope: string) => scope.slice(6));
  return Array.from(new Set(allScopes));
}

function replaceScopes(content: string, scopes: string[]): string {
  const joinScopes = scopes.map((s) => `'${s}'`).join(' | ');
  const PATTERN = /interface Schema \{\n.*\n.*\n\}/gm;
  return content.replace(
    PATTERN,
    `interface Schema {
      name: string;
      directory: ${joinScopes};
    }`
  );
}

function addScopeIfMissing(host: Tree) {
  const projects = Array.from(getProjects(host));
  projects.forEach((project) => {
    const [ projectName, projectConfiguration ] = project;
    if (!projectConfiguration.tags.some((tag) => tag.startsWith('scope:'))) {
      const scope = projectName.split('-')[0];
      projectConfiguration.tags.push(`scope:${scope}`);
      updateProjectConfiguration(host, projectName, projectConfiguration);
    }
  });
}

export default async function (tree: Tree, schema: any) {
  const utilLibSchemaPath = 'tools/generators/util-lib/schema.json';
  const utilLibCodePath = 'tools/generators/util-lib/index.ts';
  const utilLibCodeContent = tree.read('tools/generators/util-lib/index.ts', 'utf-8');
  const scopes = getScopes(getProjects(tree));

  updateJson(tree, utilLibSchemaPath, (schemaJson) => {
    schemaJson.properties.directory['x-prompt'].items = scopes.map((scope) => ({
      value: scope,
      label: scope,
    }));
    return schemaJson;
  });
  tree.write(utilLibCodePath, replaceScopes(utilLibCodeContent, scopes));
  addScopeIfMissing(tree);

  await formatFiles(tree);
}
