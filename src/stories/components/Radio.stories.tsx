import { Radio as RadioComponent, RadioProps } from '@/components/Radio';
import { Story } from '@storybook/react';
import { useState } from 'react';

export default {
  title: 'components/Radio',
  component: RadioComponent,
  argTypes: {
    value: {
      control: { type: 'text' },
      defaultValue: 'radio1',
    },
    label: {
      control: { type: 'text' },
      defaultValue: 'Label',
    },
    disabled: {
      control: { type: 'boolean' },
    },
    checked: {
      control: { type: 'boolean' },
    },
  },
};

const Radio = ({ value, label, disabled, checked }: RadioProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <RadioComponent
      value={value}
      label={label}
      disabled={disabled}
      checked={isChecked}
      onChange={() => setIsChecked(!isChecked)}
    />
  );
};

const Template: Story<RadioProps> = (args) => <Radio {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: 'radio1',
  label: 'Option 1',
  checked: false,
  disabled: false,
};
