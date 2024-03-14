import { useCallback } from '@storybook/addons';
import { Story } from '@storybook/react';
import React, { useState } from 'react';

import { Checkbox, CheckboxProps } from '@/components/Checkbox';

export default {
  title: 'components/Checkbox',
  component: Checkbox,
  argTypes: {},
};

const Template: Story<CheckboxProps> = (args) => {
  const [checked, setChecked] = useState(args.checked ?? false);

  const handleChange = useCallback(() => {
    setChecked((checked) => !checked);
  }, []);

  return (
    <Checkbox
      {...args}
      checked={checked}
      onChange={handleChange}
      disabled={args.disabled}
      label={args.label}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  label: 'label',
  disabled: false,
  checked: false,
  readOnly: false,
};
