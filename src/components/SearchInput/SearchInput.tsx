import { LabeledComponentWrapper } from '../@common/LabeledComponentWrapper';
import { TextInput, TextInputProps } from '../TextInput';
import { LabeledComponentType } from '@/@types/LabeledComponentType';
import { theme } from '@/style/theme';
import styled from '@emotion/styled';
import { Search, X } from 'lucide-react';
import { KeyboardEvent } from 'react';

interface SearchInputProps extends TextInputProps, LabeledComponentType {
  onClickReset?: () => void;
  onSearch?: (e: KeyboardEvent<HTMLInputElement>, value: string) => void;
}

export const SearchInput = ({
  onClickReset,
  onSearch,
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
      <SearchTextInput
        {...rest}
        width={width}
        containerStyle={{
          backgroundColor: theme.palette.gray['50'],
          borderRadius: '30px',
          border: `1px solid ${theme.palette.gray['100']}}`,
        }}
        inputContainerStyle={{
          backgroundColor: theme.palette.gray['50'],
          fontWeight: '500',
          padding: '12px 10px',
        }}
        endIcon={<Search size={18} color={theme.palette.gray['400']} />}
        onKeyUp={handleKeyUp}
      />
    </LabeledComponentWrapper>
  );
};

const SearchTextInput = styled(TextInput)`
  input {
    background-color: ${({ theme }) => theme.palette.gray['50']};
  }
`;
