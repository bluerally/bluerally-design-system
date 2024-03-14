import { useState } from 'react';

export const useTableRadio = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelected(index);
  };

  return {
    selected,
    setSelected,
    handleSelect,
  };
};
