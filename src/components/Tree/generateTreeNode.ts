export interface TreeNode {
  key: string;
  label: string;
  children?: TreeNode[];
  isClosed?: boolean;
  checked?: boolean;
  level?: number;
  parent?: string;
  [name: string]: any;
}

export const initTree = (
  nodes: TreeNode[],
  level: number = 0,
  parent?: string,
) => {
  return nodes.map((node) => {
    if (node.children) {
      node.children = initTree(node.children, level + 1, node.key);
    }

    node.checked = undefined;
    node.level = level;
    node.parent = parent;
    return node;
  });
};

export const initDefaultCheck = (
  nodes: TreeNode[],
  defaultCheckNodes?: string[],
) => {
  let newNodes = [...nodes];
  if (!defaultCheckNodes) {
    return nodes;
  }

  defaultCheckNodes.forEach((key) => {
    const node = getTreeNode(newNodes, key);
    if (!node) {
      return;
    }

    newNodes = [
      ...changeParentStatus(
        updateTree(newNodes, node.key, 'checked', true),
        node.parent,
      ),
    ];
  });
  return newNodes;
};

export const getTreeNode = (
  nodes: TreeNode[],
  nodeKey: string,
  initNode?: TreeNode,
) => {
  let tree = initNode;
  nodes.every((node) => {
    if (node.key === nodeKey) {
      tree = node;
      return false;
    }
    if (node.children) {
      tree = getTreeNode(node.children, nodeKey, tree);
    }
    return true;
  });
  return tree;
};

export const changeChildrenStatus = (
  nodes: TreeNode[],
  checked: boolean,
): TreeNode[] => {
  return nodes.map((node) => {
    const newNodes: TreeNode[] | undefined =
      node.children && changeChildrenStatus(node.children, checked);

    return { ...node, checked: checked, children: newNodes };
  });
};

export const changeParentStatus = (
  nodes: TreeNode[],
  key: string | undefined,
) => {
  if (!key) {
    return nodes;
  }

  const node = getTreeNode(nodes, key);
  const checked = node?.children?.every((_node: TreeNode) => !!_node.checked);

  if (!!node?.checked === !!checked) {
    return nodes;
  }

  const newNodes = updateTree(nodes, key, 'checked', checked, true);
  if (node?.parent) {
    changeParentStatus(newNodes, node.parent);
  }
  return newNodes;
};

export const updateTree = (
  nodes: TreeNode[],
  nodeKey: string,
  key: string,
  value: any,
  recursion?: boolean,
) => {
  return nodes.map((node) => {
    if (node.children) {
      node.children = updateTree(node.children, nodeKey, key, value, recursion);
    }

    if (node.key === nodeKey) {
      if (node.children && key === 'checked' && !recursion) {
        node.children = [...changeChildrenStatus(node.children, value)];
      }
      node[key] = value;
    }
    return node;
  });
};
