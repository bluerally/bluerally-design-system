import { LabeledComponentType } from '@/@types/LabeledComponentType';
import {
  Chip as ChipBase,
  Icon,
  Overlay,
  STATUS,
  TextInput,
} from '@/components';
import { LabeledComponentWrapper } from '@/components/@common/LabeledComponentWrapper';
import { AnchorSide, Position } from '@/utils/getPosition';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import React from 'react';
import Highlighter from 'react-highlight-words';

export interface SelectItem {
  title: string | number;
  value: string | number;
  disabled?: boolean;
  render?: (option?: Omit<SelectItem, 'render'>) => JSX.Element;
}

export type Selected<T> = T extends true
  ? SelectItem[]
  : SelectItem | undefined;

export interface SelectProps<T> extends LabeledComponentType {
  search?: boolean;
  selected?: Selected<T>;
  multiple?: T;
  options: SelectItem[];
  placeholder?: string;
  isClickOutsideClose?: boolean;
  chip?: boolean;
  focusOpen?: boolean;
  side?: AnchorSide;
  defaultPosition?: Position;
  gap?: number;
  width?: string;
  lineHeight?: string;
  optionMaxHeight?: number;
  downIcon?: boolean;
  minimumSearchLength?: number;
  enableAll?: boolean;
  allItem?: SelectItem;
  disabled?: boolean;
  onSelect?: (selected: Selected<T>) => void;
  onEnter?: (e: string) => void;
  onChangeSearchValue?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Select = <T extends boolean = false>({
  multiple,
  search,
  selected,
  options,
  placeholder,
  isClickOutsideClose = true,
  defaultPosition = { top: 0, left: 0 },
  gap = 12,
  chip = false,
  focusOpen = true,
  side = 'bottom',
  width,
  lineHeight,
  optionMaxHeight,
  downIcon = true,
  label,
  name,
  status,
  statusMessage,
  description,
  minimumSearchLength = 0,
  enableAll,
  allItem = { title: '전체', value: 'ALL' },
  disabled,
  required,
  onSelect,
  onEnter,
  onChangeSearchValue,
}: SelectProps<T>) => {
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const filteredOptions =
    search && searchValue.length >= minimumSearchLength
      ? options.filter(({ title }) =>
          title.toString().toLowerCase().includes(searchValue.toLowerCase()),
        )
      : options;

  const enableOptions = options.filter((option) => !option.disabled);
  const isSelectedAll =
    enableAll &&
    selected &&
    ((selected as SelectItem).value === allItem.value ||
      (Array.isArray(selected) && selected.length === enableOptions.length));

  const handleSelectChange = (item: SelectItem) => {
    if (multiple) {
      if (enableAll && item === allItem) {
        if (
          !selected ||
          (selected as SelectItem[]).length !== enableOptions.length
        ) {
          onSelect?.(enableOptions as Selected<T>);
        } else {
          onSelect?.([] as unknown as Selected<T>);
        }

        return;
      }

      if (!Array.isArray(selected)) {
        onSelect?.([item] as Selected<T>);

        return;
      }

      const otherSelectedItems = selected.filter(
        (selectedItem) => selectedItem.value !== item.value,
      );
      const newSelectedItems = selected.some(
        (select) => select.value === item.value,
      )
        ? otherSelectedItems
        : [...otherSelectedItems, item];

      onSelect?.(newSelectedItems as Selected<T>);

      return;
    }
    onSelect?.(item as Selected<T>);
  };

  const handleChipClick = (value: string | number) => {
    if (value === allItem.value) {
      setSearchValue('');
      onSelect?.(undefined as Selected<T>);

      return;
    }

    if (multiple && Array.isArray(selected)) {
      onSelect?.(
        selected.filter(
          (selectedItem) => selectedItem.value !== value,
        ) as Selected<T>,
      );

      return;
    }

    setSearchValue('');
    onSelect?.(undefined as Selected<T>);
  };

  return (
    <LabeledComponentWrapper
      status={status}
      name={name}
      label={label}
      width={width}
      statusMessage={statusMessage}
      description={description}
      required={required}
    >
      <SelectContainer
        ref={selectRef}
        isSelectOpen={isSelectOpen}
        error={status === STATUS.ERROR}
        onClick={() => {
          setIsSelectOpen((prev) => !prev);
        }}
        width={width}
        disabled={disabled}
      >
        <SelectBox>
          <ValueBox lineHeight={lineHeight}>
            {Array.isArray(selected) ? (
              selected.length ? (
                isSelectedAll ? (
                  <Chip
                    key={allItem.value}
                    onClickCancel={(e) => {
                      e.stopPropagation();
                      handleChipClick(allItem.value);
                    }}
                  >
                    {allItem.title}
                  </Chip>
                ) : (
                  selected.map(({ title, value, render }) =>
                    render ? (
                      <React.Fragment key={value}>
                        {render({ title, value })}
                      </React.Fragment>
                    ) : (
                      <Chip
                        key={value}
                        onClickCancel={(e) => {
                          e.stopPropagation();
                          handleChipClick(value);
                        }}
                      >
                        {title}
                      </Chip>
                    ),
                  )
                )
              ) : (
                !search && placeholder
              )
            ) : selected?.title ? (
              chip ? (
                <Chip
                  key={selected.value}
                  onClickCancel={(e) => {
                    e.stopPropagation();
                    handleChipClick(selected.value);
                  }}
                >
                  {selected.title}
                </Chip>
              ) : selected.render ? (
                selected.render({
                  title: selected.title,
                  value: selected.value,
                })
              ) : (
                selected.title
              )
            ) : (
              !search && placeholder
            )}
          </ValueBox>
          {search && (multiple || !chip || !selected) && (
            <TextInput
              value={searchValue}
              containerStyle={{
                border: 'none',
                padding: 0,
                height: '30px',
                minHeight: 'unset',
              }}
              onChange={(e) => {
                setSearchValue(e.target.value);
                onChangeSearchValue?.(e);
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
              onFocus={() => {
                if (!focusOpen) {
                  return;
                }
                setIsSelectOpen(true);
              }}
              onKeyUp={(e) => {
                if (!onEnter) return;

                if (e.key === 'Enter') {
                  setIsSelectOpen(true);
                  onEnter(searchValue);
                }
              }}
              startIcon={<Icon icon="search" width={15} height={15} />}
              placeholder={placeholder}
              disabled={disabled}
            />
          )}
        </SelectBox>
        {(Array.isArray(selected) || downIcon) && (
          <IconBox
            onClick={(e) => {
              e.stopPropagation();
              setIsSelectOpen((prev) => !prev);
            }}
          >
            <Icon
              icon={'chevron-down'}
              width={20}
              height={20}
              color={'#8B8F9F'}
            />
          </IconBox>
        )}
      </SelectContainer>
      {isSelectOpen && (
        <OptionContainer>
          <StyledOverlay
            open={isSelectOpen}
            anchorRef={selectRef}
            defaultPosition={defaultPosition}
            gap={gap}
            side={side}
            isAttachRoot
            ignoreClickRefs={[selectRef]}
            onClickOutside={
              isClickOutsideClose ? () => setIsSelectOpen(false) : null
            }
          >
            <OptionList
              width={selectRef.current?.offsetWidth}
              maxHeight={optionMaxHeight}
            >
              {enableAll && (
                <OptionItem
                  lineHeight={lineHeight}
                  onClick={(e) => {
                    e.stopPropagation();

                    handleSelectChange(allItem);

                    if (multiple) {
                      setSearchValue('');
                      return;
                    }

                    setIsSelectOpen(false);
                  }}
                >
                  <OptionItemSpan>{allItem.title}</OptionItemSpan>
                  <OptionCheckedIcon>
                    {isSelectedAll && (
                      <Icon
                        icon={'check'}
                        width={24}
                        height={24}
                        color={'#3751FF'}
                      />
                    )}
                  </OptionCheckedIcon>
                </OptionItem>
              )}
              {filteredOptions.length ? (
                filteredOptions.map((option) => (
                  <OptionItem
                    key={option.value}
                    lineHeight={lineHeight}
                    onClick={(e) => {
                      e.stopPropagation();

                      if (option.disabled) {
                        return;
                      }

                      handleSelectChange(option);

                      if (multiple) {
                        setSearchValue('');
                        return;
                      }

                      setIsSelectOpen(false);
                    }}
                    disabled={option.disabled}
                  >
                    <OptionItemSpan lineHeight={lineHeight}>
                      {option.render ? (
                        option.render({
                          title: option.title,
                          value: option.value,
                        })
                      ) : (
                        <Highlighter
                          highlightClassName="highlight"
                          searchWords={[searchValue]}
                          autoEscape={true}
                          textToHighlight={option.title as string}
                        />
                      )}
                    </OptionItemSpan>
                    {(Array.isArray(selected)
                      ? selected.some((select) => select.value === option.value)
                      : selected?.value === option.value) && (
                      <OptionCheckedIcon>
                        <Icon
                          icon={'check'}
                          width={24}
                          height={24}
                          color={'#3751FF'}
                        />
                      </OptionCheckedIcon>
                    )}
                  </OptionItem>
                ))
              ) : (
                <OptionItem>
                  <OptionItemSpan>검색 결과 없음</OptionItemSpan>
                </OptionItem>
              )}
            </OptionList>
          </StyledOverlay>
        </OptionContainer>
      )}
    </LabeledComponentWrapper>
  );
};

const SelectContainer = styled('div')<{
  width?: string;
  height?: string;
  isSelectOpen?: boolean;
  error?: boolean;
  disabled?: boolean;
}>`
  position: relative;
  width: ${({ width }) => {
    return width || '340px';
  }};
  min-height: 42px;
  display: flex;
  align-items: center;
  padding: 4px 11px;
  border: 1px solid
    ${({ theme, isSelectOpen, error }) =>
      error
        ? theme.palette.error.main
        : isSelectOpen
        ? theme.palette.primary['400']
        : theme.palette.gray['300']};
  border-radius: 8px;
  ${({ theme }) => theme.typography.basic.regular};
  justify-content: space-between;

  color: ${({ theme }) => theme.palette.gray['600']};
  cursor: pointer;

  ${({ disabled, theme }) =>
    disabled &&
    css`
      pointer-events: none;
      border: 1px solid ${theme.palette.gray['200']};
      background-color: ${theme.palette.gray['50']};
      color: ${theme.palette.gray['200']};
    `}

  &:hover {
    border: 1px solid
      ${({ error, theme }) =>
        error ? theme.palette.error.main : theme.palette.primary['400']};
  }
`;

const SelectBox = styled('div')`
  flex: 1 1;
  overflow: auto;
`;

const ValueBox = styled('div')<{ lineHeight?: string }>`
  line-height: ${({ lineHeight }) => {
    return lineHeight || '30px';
  }};
  white-space: pre-wrap;
  font-size: 12px;
`;

const IconBox = styled('div')`
  flex: 0 0 20px;
  width: 20px;
  height: 20px;
`;

const OptionList = styled('ul')<{ width?: number; maxHeight?: number }>`
  width: ${({ width }) => {
    return width ? `${width}px` : '340px';
  }};
  max-height: ${({ maxHeight }) => maxHeight && `${maxHeight}px`};
  margin: 0;
  background: ${({ theme }) => theme.palette.white};
  border-radius: 5px;
  border: none;
  padding: 0;
  overflow: auto;
  color: ${({ theme }) => theme.palette.newGray['950']};
`;

const OptionItem = styled('li')<{ lineHeight?: string; disabled?: boolean }>`
  padding: 5px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.typography.md.medium};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  ${({ disabled, theme }) => {
    if (disabled) {
      return `
        background: ${theme.palette.gray['100']};
        color: ${theme.palette.gray['400']};
      `;
    }
  }}

  &:hover {
    background: ${({ theme }) => theme.palette.sky['50']};
  }
`;

const OptionItemSpan = styled('span')<{ lineHeight?: string }>`
  ${({ theme }) => theme.typography.md.medium};
  line-height: ${({ lineHeight }) => {
    return lineHeight || '38px';
  }};
  white-space: pre-wrap;

  .highlight {
    background-color: ${({ theme }) => theme.palette.gray['200']};
  }
`;

const OptionCheckedIcon = styled('div')`
  flex: 0 0 24px;
  width: 24px;
  height: 24px;
`;

const Chip = styled(ChipBase)`
  margin-right: 10px;
`;

const OptionContainer = styled('div')`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background-color: transparent;
  z-index: ${({ theme }) => theme.zIndex.DIM};
  overflow: hidden;
  margin: 0;
  padding: 0;
`;

const StyledOverlay = styled(Overlay)`
  box-shadow: 0px 6px 18px 0px #0000001f;
`;
