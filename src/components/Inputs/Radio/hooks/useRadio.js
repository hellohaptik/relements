export function useRadio(value, onChange, options, optionKey) {
  const getIndex = () => {
    let index = -1;
    options.forEach((option, i) => {
      if (option[optionKey] === (value || {})[optionKey]) {
        index = i;
      }
    });
    return index;
  };
  const activeIndex = getIndex();
  const handleChange = (index) => () => {
    onChange(options[index]);
  };

  return [activeIndex, handleChange];
}
