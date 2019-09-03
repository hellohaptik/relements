import { KEY_CODES } from 'constants';

export function useChips(value, inputValue, onChange, setInputValue) {
  const addChip = (newChipValue) => {
    console.log('add chip called')
    if (!value.includes(newChipValue) && newChipValue) {
      console.log('inside add chip', newChipValue);
      const newValue = value.concat([newChipValue]);
      onChange(newValue);
      setInputValue('');
    }
  };

  const deleteChip = (deleteChipValue) => {
    if (value.includes(deleteChipValue) && deleteChipValue) {
      const newValue = value.filter(item => item !== deleteChipValue);
      onChange(newValue);
    }
  };

  const handleKeyDown = (e) => {
    switch (e.keyCode) {
      case KEY_CODES.ENTER:
        addChip(e.target.value);
        break;

      case KEY_CODES.ESC:
        break;

      case KEY_CODES.BACKSPACE:
        if (!inputValue) {
          deleteChip(value[value.length - 1]);
        }
        break;

      default:
        break;
    }
  };

  return [handleKeyDown, addChip, deleteChip];
}
