import styled from '@emotion/styled';
import React, { Fragment, useState } from 'react';
import { Checkbox } from '../Checkbox';
import { Icon } from '../Icon';
import {
  TreeNode,
  initTree,
  updateTree,
  changeParentStatus,
  initDefaultCheck,
} from './generateTreeNode';

export interface TreeProps {
  data: TreeNode[];
  onClickNode?: (e: TreeNode) => void;
  onCheckNode?: (e: TreeNode[]) => void;
  defaultCheckedNodes?: string[];
  isMulti?: boolean;
  openedIcon?: React.ReactNode;
  closedIcon?: React.ReactNode;
  disabled?: boolean;
}

export const Tree = ({
  data,
  onClickNode,
  onCheckNode,
  defaultCheckedNodes,
  isMulti = false,
  openedIcon = <Icon icon="chevron-down" />,
  closedIcon = <Icon icon="chevron-right" />,
  disabled = false,
}: TreeProps) => {
  const [trees, setTrees] = useState<TreeNode[]>([
    ...initDefaultCheck([...initTree(data)], defaultCheckedNodes),
  ]);

  const renderTreeNode = (nodes: TreeNode[]) => {
    return (
      <TreeList>
        {nodes.map((node) => {
          return (
            <Fragment key={node.key}>
              <TreeItem
                key={node.key}
                role="button"
                checked={node.checked}
                level={node.level || 0}
                onClick={() => {
                  if (disabled) {
                    return;
                  }

                  onClickNode?.(node);
                }}
                disabled={disabled}
                hasNodes={!!node.children}
              >
                {node.children && (
                  <IconContainer
                    onClick={(e) => {
                      setTrees(
                        updateTree(trees, node.key, 'isClosed', !node.isClosed),
                      );

                      e.stopPropagation();
                    }}
                  >
                    {node.isClosed ? closedIcon : openedIcon}
                  </IconContainer>
                )}
                {isMulti && (
                  <CheckboxContainer>
                    <Checkbox
                      disabled={disabled}
                      checked={node.checked}
                      onClick={(e) => {
                        e.preventDefault();
                        if (disabled) {
                          return;
                        }

                        setTrees(
                          changeParentStatus(
                            updateTree(
                              trees,
                              node.key,
                              'checked',
                              !node.checked,
                            ),
                            node.parent,
                          ),
                        );

                        onCheckNode?.(trees);

                        e.stopPropagation();
                      }}
                    />
                  </CheckboxContainer>
                )}
                {node.label}
              </TreeItem>
              {node.children && !node.isClosed && renderTreeNode(node.children)}
            </Fragment>
          );
        })}
      </TreeList>
    );
  };

  return <>{renderTreeNode(trees)}</>;
};

const TreeList = styled('ul')`
  ${({ theme }) => theme.typography.basic.regular}
  color: ${({ theme }) => theme.palette.gray['600']};
  width: 100%;
`;

const TreeItem = styled('li')<{
  level: number;
  checked?: boolean;
  hasNodes?: boolean;
  disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  padding-left: ${({ level, hasNodes }) =>
    hasNodes ? level * 20 : level * 20 + 23}px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  min-height: 32px;
  background: ${({ theme, checked }) =>
    checked ? theme.palette.primary['200'] : theme.palette.white};
  border-radius: ${({ theme }) => theme.spacing(2)};
`;

const IconContainer = styled('div')`
  display: inline-flex;
  padding-right: ${({ theme }) => theme.spacing(4)};
`;

const CheckboxContainer = styled('div')`
  display: flex;
  align-items: center;
  padding-right: ${({ theme }) => theme.spacing(4)};
`;
