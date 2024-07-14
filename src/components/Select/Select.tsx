import { LabeledComponentType } from '@/@types/LabeledComponentType';
import { Button, Overlay, STATUS, TextInput } from '@/components';
import { LabeledComponentWrapper } from '@/components/@common/LabeledComponentWrapper';
import { theme } from '@/style/theme';
import { Position } from '@/utils/getPosition';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Check, ChevronDown, Search } from 'lucide-react';
import { useRef, useState } from 'react';
import React from 'react';
import Highlighter from 'react-highlight-words';

export interface SelectItem {
  title: string | number;
  value: string | number;
  render?: (option?: Omit<SelectItem, 'render'>) => JSX.Element;
}

export type Selected = SelectItem | undefined;

export interface SelectProps extends LabeledComponentType {
  search?: boolean;
  selected?: Selected;
  options: SelectItem[];
  placeholder?: string;
  isClickOutsideClose?: boolean;
  chip?: boolean;
  focusOpen?: boolean;
  defaultPosition?: Position;
  gap?: number;
  width?: string;
  lineHeight?: string;
  optionMaxHeight?: number;
  downIcon?: boolean;
  minimumSearchLength?: number;
  enableAll?: boolean;
  allItem?: SelectItem;
  onSelect?: (selected: Selected) => void;
  onEnter?: (e: string) => void;
  onChangeSearchValue?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Select = ({
  search,
  selected,
  options,
  placeholder,
  isClickOutsideClose = true,
  defaultPosition = { top: 4, left: 0 },
  gap = 0,
  chip = false,
  focusOpen = true,
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
  required,
  onSelect,
  onEnter,
  onChangeSearchValue,
}: SelectProps) => {
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const filteredOptions =
    search && searchValue.length >= minimumSearchLength
      ? options.filter(({ title }) =>
          title.toString().toLowerCase().includes(searchValue.toLowerCase()),
        )
      : options;

  const isSelectedAll =
    enableAll &&
    selected &&
    ((selected as SelectItem).value === allItem.value ||
      (Array.isArray(selected) && selected.length === options.length));

  const handleSelectChange = (item: SelectItem) => {
    onSelect?.(item as Selected);
  };

  const handleChipClick = (value: string | number) => {
    if (value === allItem.value) {
      setSearchValue('');
      onSelect?.(undefined as Selected);

      return;
    }

    setSearchValue('');
    onSelect?.(undefined as Selected);
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
      >
        <SelectBox>
          <ValueBox lineHeight={lineHeight}>
            {Array.isArray(selected) ? (
              selected.length ? (
                isSelectedAll ? (
                  <Button
                    size="sm"
                    variant="primary-outline"
                    key={allItem.value}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChipClick(allItem.value);
                    }}
                  >
                    {allItem.title}
                  </Button>
                ) : (
                  selected.map(({ title, value, render }) =>
                    render ? (
                      <React.Fragment key={value}>
                        {render({ title, value })}
                      </React.Fragment>
                    ) : (
                      <Button
                        size="sm"
                        variant="primary-outline"
                        key={value}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleChipClick(value);
                        }}
                      >
                        {title}
                      </Button>
                    ),
                  )
                )
              ) : (
                !search && (
                  <PlaceHolderContainer>{placeholder}</PlaceHolderContainer>
                )
              )
            ) : selected?.title ? (
              chip ? (
                <Button
                  size="sm"
                  variant="primary-outline"
                  key={selected.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChipClick(selected.value);
                  }}
                >
                  {selected.title}
                </Button>
              ) : selected.render ? (
                selected.render({
                  title: selected.title,
                  value: selected.value,
                })
              ) : (
                selected.title
              )
            ) : (
              !search && (
                <PlaceHolderContainer>{placeholder}</PlaceHolderContainer>
              )
            )}
          </ValueBox>
          {search && (!chip || !selected) && (
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
              startIcon={<Search size={15} />}
              placeholder={placeholder}
            />
          )}
        </SelectBox>
        {(Array.isArray(selected) || downIcon) && (
          <IconBox
            isOpen={isSelectOpen}
            onClick={(e) => {
              e.stopPropagation();
              setIsSelectOpen((prev) => !prev);
            }}
          >
            <ChevronDown size={20} color={theme.palette.gray['400']} />
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

                    setIsSelectOpen(false);
                  }}
                >
                  <OptionItemSpan>{allItem.title}</OptionItemSpan>
                  <OptionCheckedIcon>
                    {isSelectedAll && (
                      <Check size={16} color={theme.palette.primary['300']} />
                    )}
                  </OptionCheckedIcon>
                </OptionItem>
              )}
              {filteredOptions.length ? (
                filteredOptions.map((option) => (
                  <OptionItem
                    key={option.value}
                    lineHeight={lineHeight}
                    selected={option.value === selected?.value}
                    onClick={(e) => {
                      e.stopPropagation();

                      handleSelectChange(option);
                      setIsSelectOpen(false);
                    }}
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
                        <Check size={16} color={theme.palette.primary['300']} />
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
}>`
  position: relative;
  width: ${({ width }) => {
    return width || '340px';
  }};
  height: 42px;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing(7)} ${theme.spacing(8)}`};
  border: 1px solid
    ${({ theme, isSelectOpen, error }) =>
      error
        ? theme.palette.error['300']
        : isSelectOpen
        ? theme.palette.primary['400']
        : theme.palette.gray['200']};
  border-radius: 8px;
  ${({ theme }) => theme.typography.basic.regular};
  justify-content: space-between;

  color: ${({ theme }) => theme.palette.gray['600']};
  cursor: pointer;

  &:hover {
    border: 1px solid
      ${({ error, theme }) =>
        error ? theme.palette.error['300'] : theme.palette.primary['300']};
  }
`;

const SelectBox = styled('div')`
  flex: 1 1;
  overflow: auto;
`;

const ValueBox = styled('div')<{ lineHeight?: string }>`
  ${({ theme }) => theme.typography.md.medium}
  white-space: pre-wrap;
`;

const IconBox = styled('div')<{ isOpen: boolean }>`
  flex: 0 0 20px;
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
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
  color: ${({ theme }) => theme.palette.gray['900']};
`;

const OptionItem = styled('li')<{ lineHeight?: string; selected?: boolean }>`
  padding: 5px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.palette.gray['900']};
  ${({ theme }) => theme.typography.md.medium};
  cursor: pointer;

  &:hover {
    background: ${({ theme, selected }) =>
      selected ? theme.palette.primary['50'] : theme.palette.gray['50']};
  }

  ${({ theme, selected }) => {
    if (selected) {
      return css`
        color: ${theme.palette.primary['300']};
        background-color: ${theme.palette.primary['50']};
      `;
    }
  }}
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
  display: flex;
  align-items: center;
  flex: 0 0 24px;
  width: 24px;
  height: 24px;
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
  background: ${({ theme }) => theme.palette.white};
  outline: 1px solid ${({ theme }) => theme.palette.gray['200']};
  border-radius: 5px;
`;

const PlaceHolderContainer = styled('div')`
  color: ${({ theme }) => theme.palette.gray['400']};
`;
