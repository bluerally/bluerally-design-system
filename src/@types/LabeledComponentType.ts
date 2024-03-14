import { Status } from '@/components';

export interface LabeledComponentType {
  required?: boolean;
  status?: Status;
  name?: string;
  width?: string | number;
  label?: React.ReactNode | string;
  statusMessage?: string;
  description?: string;
  children?: React.ReactNode;
}
