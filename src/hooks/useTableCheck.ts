import { useState } from 'react';
import { isEmpty } from 'lodash';

export const useTableCheck = () => {
  const [selected, setSelected] = useState<number[]>([]);

  const handleSelect = (index: number) => {
    if (selected.includes(index)) {
      setSelected(selected.filter((item) => item !== index));
      return;
    }

    setSelected([...selected, index]);
  };

  const handleSelectAll = (
    rowCounts: number,
    isAll: boolean,
    selectableIds?: number[],
  ) => {
    if (isAll) {
      setSelected(
        selectableIds && !isEmpty(selectableIds)
          ? selectableIds
          : [...Array(rowCounts)].map((_, i) => i),
      );
      return;
    }

    setSelected([]);
  };

  return {
    selected,
    setSelected,
    handleSelect,
    handleSelectAll,
  };
};
