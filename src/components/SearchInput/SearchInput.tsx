import { KeyboardEvent } from 'react';

import { LabeledComponentType } from '@/@types/LabeledComponentType';

import { theme } from '@/style/theme';

import { LabeledComponentWrapper } from '../@common/LabeledComponentWrapper';
import { Icon } from '../Icon';
import { TextInput, TextInputProps } from '../TextInput';

interface SearchInputProps extends TextInputProps, LabeledComponentType {
  onClickReset?: () => void;
  onSearch?: (e: KeyboardEvent<HTMLInputElement>, value: string) => void;
}

export const SearchInput = ({
  onClickReset,
  onSearch,
  disabled,
  status,
  name,
  label,
  statusMessage,
  description,
  required,
  width,
  ...rest
}: SearchInputProps) => {
  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.key === 'Enter') {
      onSearch?.(e, rest.value ?? '');
    }
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
      <TextInput
        {...rest}
        width={width}
        startIcon={
          <Icon
            icon="search"
            width={15}
            height={15}
            color={disabled ? theme.palette.gray['200'] : '#333333'}
          />
        }
        disabled={disabled}
        endIcon={
          !disabled && (
            <Icon icon="x" width={13} height={13} onClick={onClickReset} />
          )
        }
        onKeyUp={handleKeyUp}
      />
    </LabeledComponentWrapper>
  );
};
