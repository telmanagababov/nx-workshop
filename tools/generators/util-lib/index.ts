import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';

type UtilLibGeneratorSchema = {
  name: string;
  directory: string;
}

export default async function (tree: Tree, schema: UtilLibGeneratorSchema) {
  const libraryDestination = `${schema.directory}/util-${schema.name}`;
  const libraryTags = `type:util,scope:${schema.directory}`;
  await libraryGenerator(tree, { name: libraryDestination, tags: libraryTags });
  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
