export function useCheckbox(value, onChange, options) {
  const getIndexes = () => {
    const activeIds = value.map((valueItem) => valueItem.title);
    const activeIndexes = [];
    options.map((option, i) => {
      if (activeIds.includes(option.title)) {
        activeIndexes.push(i);
      }
    });

    return activeIndexes;
  };

  const activeIndexes = getIndexes();

  const handleChange = (index) => () => {
    const indexPosition = activeIndexes.indexOf(index);

    if (indexPosition > -1) activeIndexes.splice(indexPosition, 1);
    else activeIndexes.push(index);

    onChange(activeIndexes.map((activeIndex) => options[activeIndex]));
  };

  return [activeIndexes, handleChange];
}
