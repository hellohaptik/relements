import { useState, useRef, useEffect } from 'react';

export function useDropdown(createTerm = 'New', options, optionKey, value, allowCreate, createPrefix = '+ Create') {
  const getFilteredOptions = () => {
    console.log(value, options);
    const flatValue = value.map(valueItem => valueItem[optionKey]);
    console.log(flatValue);
    let filteredOptions = options.filter(option => !flatValue.includes(option[optionKey]));
    console.log(filteredOptions);
    console.log(allowCreate, createTerm);
    if (allowCreate && createTerm) {
      filteredOptions = [
        {
          [optionKey]: `${createPrefix} "${createTerm}"`,
          type: 'CREATE',
        },
      ].concat(filteredOptions);
    }
    console.log(filteredOptions);
    return filteredOptions;
  };

  return [getFilteredOptions(options)];
}
