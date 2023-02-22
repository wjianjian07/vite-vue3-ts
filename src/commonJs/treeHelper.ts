const DEFAULT_CONFIG: Indexable<string> = {
  id: 'id',
  children: 'children',
  pid: 'pid',
};

const getConfig = (config: Partial<Indexable<string>>) => Object.assign({}, DEFAULT_CONFIG, config);

export function filter<T = any>(
  tree: T[],
  func: (n: T) => boolean,
  config: Partial<Indexable<string>> = {},
): T[] {
  config = getConfig(config);
  const children = config.children as string;
  function listFilter(list: T[]) {
    return list
      .map((node: any) => ({ ...node }))
      .filter((node) => {
        node[children] = node[children] && listFilter(node[children]);
        return func(node) || (node[children] && node[children].length);
      });
  }
  return listFilter(tree);
}