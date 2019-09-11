import { KEY_CODES } from "constants";

export function useChips(value, inputValue, onChange, setInputValue) {
  const addChip = newChipValue => {
    // when the value is a simple array
    if (!value.includes(newChipValue) && newChipValue) {
      const newValue = value.concat([newChipValue]);
      onChange(newValue);
      setInputValue("");
    }
  };

  const deleteChip = indexToDelete => {
    const newValue = value.filter((_, i) => i !== indexToDelete);
    onChange(newValue);
  };

  const handleKeyDown = e => {
    switch (e.keyCode) {
      case KEY_CODES.ENTER:
        addChip(e.target.value);
        break;

      case KEY_CODES.ESC:
        break;

      case KEY_CODES.BACKSPACE:
        if (!inputValue) {
          deleteChip(value.length - 1);
        }
        break;

      default:
        break;
    }
  };

  return [handleKeyDown, addChip, deleteChip];
}
