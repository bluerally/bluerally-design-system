import { Story } from '@storybook/react';
import React, { useState } from 'react';

import { Uploader } from '@/components/Uploader';

export default {
  title: 'components/Uploader',
  component: Uploader,
  argTypes: {},
};

const Template: Story = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleChangeFile = (files: File[]) => {
    setFiles(files);
  };

  const handleRemoveFile = (file: File) => {
    const newFiles = files.filter((_file) => _file !== file);
    setFiles(newFiles);
  };

  return (
    <Uploader
      multiFile
      files={files}
      onChangeFiles={handleChangeFile}
      onRemoveFile={handleRemoveFile}
      allowedExtension={['jpg', 'jpeg', 'gif']}
      allowedFileType={[
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ]}
      description="파일 유형은 JPG, GIF or XLSX로만 첨부 가능"
    />
  );
};

export const Default = Template.bind({});
