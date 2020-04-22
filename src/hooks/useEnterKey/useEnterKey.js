import React from 'react';
import { KEY_CODES } from 'constants/key_codes';

export default function useEnterKey(onEnter) {
  const handleKeyUp = React.useCallback((e) => {
    if (e.keyCode === KEY_CODES.ENTER) {
      onEnter(e);
    }
  });

  React.useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);
    return () => document.removeEventListener('keyup', handleKeyUp);
  }, []);
}
