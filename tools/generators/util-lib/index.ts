import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';

interface Schema {
  name: string;
  directory: 'api' | 'store' | 'shared' | 'video-games' | 'video';
}

export default async function (tree: Tree, schema: Schema) {
  const libraryDestination = `${schema.directory}/util-${schema.name}`;
  const libraryTags = `type:util,scope:${schema.directory}`;
  await libraryGenerator(tree, { name: libraryDestination, tags: libraryTags });
  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
