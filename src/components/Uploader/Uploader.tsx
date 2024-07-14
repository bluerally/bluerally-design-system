import { Button as ButtonBase } from '../Button';
import { Icon } from '../Icon';
import { useDrag } from '@/hooks/useDrag';
import { useSnackbar } from '@/hooks/useSnackbar';
import styled from '@emotion/styled';
import { isEmpty } from 'lodash';
import React from 'react';
import { v4 as uuid } from 'uuid';

export interface UploaderProps {
  files: File[];
  multiFile?: boolean;
  maxUploadFiles?: number;
  allowedFileType?: string[];
  allowedExtension?: string[];
  onChangeFiles?: (files: File[]) => void;
  onRemoveFile?: (file: File) => void;
  description?: string;
  placeholder?: string;
}

export interface UploaderChildrenProps {
  children?: React.ReactNode;
}

export const Uploader = ({
  files,
  multiFile,
  maxUploadFiles = 2,
  allowedFileType,
  allowedExtension,
  onChangeFiles,
  onRemoveFile,
  description,
  placeholder = '파일을 추가하거나 여기에 드롭하세요.',
  ...rest
}: UploaderProps) => {
  const { dragOver, setDragOver, onDragOver, onDragLeave } = useDrag();
  const snackbar = useSnackbar();

  const validateFiles = (files: File[]) => {
    const isOverLimit = files.length > maxUploadFiles;
    const isAllowedExtension = (ext: string) =>
      allowedExtension
        ? allowedExtension
            .map((allowedExt) => allowedExt.toLowerCase())
            .includes(ext)
        : true;

    const notAcceptFiles = files.filter((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase();

      return (
        !allowedFileType?.includes(file.type) && ext && !isAllowedExtension(ext)
      );
    });

    const acceptFiles = files.filter((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase();

      return (
        allowedFileType?.includes(file.type) || (ext && isAllowedExtension(ext))
      );
    });

    if (notAcceptFiles.length) {
      snackbar.error({ content: '지원하지 않는 파일 형식입니다.' });
      setDragOver(false);
    }

    if (isOverLimit) {
      snackbar.error({
        content: `최대 ${maxUploadFiles}개 업로드 가능합니다.`,
      });
      setDragOver(false);

      return acceptFiles.slice(0, maxUploadFiles);
    }

    return acceptFiles;
  };

  const handleFileChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const target = e.target as HTMLInputElement;
    const fileData = target.files;

    if (!fileData) {
      return;
    }

    const verifiedFiles = validateFiles([...files, ...Array.from(fileData)]);

    if (isEmpty(verifiedFiles)) {
      return;
    }

    onChangeFiles?.(verifiedFiles);
    setDragOver(false);
    target.value = '';
  };

  return (
    <FileUploaderContainer {...rest}>
      <FileInputContainer>
        <FileInput onClick={handleFileChange} isDrag={dragOver}>
          <Icon icon="paperclip" color="#3751FF" />
          <Placeholder>{placeholder}</Placeholder>
          <Input
            type="file"
            accept={
              allowedFileType && allowedExtension
                ? [
                    ...(allowedFileType ?? []),
                    ...(allowedExtension?.map((ext) => `.${ext}`) ?? []),
                  ].join(',')
                : undefined
            }
            multiple={multiFile}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onChange={handleFileChange}
          />
        </FileInput>
      </FileInputContainer>
      {description && !files?.length && (
        <Description>{description}</Description>
      )}
      <FileList>
        {files?.map((file) => {
          return (
            <Button
              size="sm"
              variant="primary-outline"
              key={uuid()}
              onClick={() => onRemoveFile?.(file)}
            >
              {file.name}
            </Button>
          );
        })}
      </FileList>
    </FileUploaderContainer>
  );
};

const FileUploaderContainer = styled('div')`
  ${({ theme }) => theme.typography.basic.regular}
`;

const FileInputContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
`;

const FileInput = styled('div')<{ isDrag: boolean }>`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  min-width: 300px;
  height: 40px;
  border: 1px
    ${({ isDrag, theme }) =>
      isDrag
        ? `solid ${theme.palette.primary['300']}`
        : `dashed ${theme.palette.gray['600']}`};
  border-radius: 8px;
  padding: ${({ theme }) => `${theme.spacing(4.5)} ${theme.spacing(7)}`};
  cursor: pointer;
  transition: border 0.3s;

  &:hover {
    border: 1px solid ${({ theme }) => theme.palette.primary['300']};
  }
`;

const Input = styled('input')`
  position: absolute;
  opacity: 0;
  width: 100%;
  cursor: pointer;
`;

const Description = styled('div')`
  line-height: 24px;
  color: ${({ theme }) => theme.palette.gray['600']};
  margin-top: ${({ theme }) => theme.spacing(4.5)};
`;

const Placeholder = styled('span')`
  line-height: 24px;
  color: ${({ theme }) => theme.palette.gray['600']};
  padding-left: ${({ theme }) => theme.spacing(5)};
`;

const FileList = styled('div')`
  display: flex;
  padding-top: ${({ theme }) => theme.spacing(10)};
`;

const Button = styled(ButtonBase)`
  margin-right: 5px;
`;
