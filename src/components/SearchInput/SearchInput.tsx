import { LabeledComponentWrapper } from '../@common/LabeledComponentWrapper';
import { TextInput, TextInputProps } from '../TextInput';
import { LabeledComponentType } from '@/@types/LabeledComponentType';
import { theme } from '@/style/theme';
import { Search, XCircle } from 'lucide-react';
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
      <TextInput
        {...rest}
        width={width}
        startIcon={<Search size={20} color={theme.palette.gray['400']} />}
        onKeyUp={handleKeyUp}
        endIcon={
          rest.value?.trim() !== '' && (
            <XCircle
              fill={theme.palette.gray['400']}
              size={16}
              onClick={onClickReset}
              color={theme.palette.white}
              cursor="pointer"
            />
          )
        }
      />
    </LabeledComponentWrapper>
  );
};
