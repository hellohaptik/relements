// import { useState, useRef, useEffect } from 'react';
// import { create } from 'domain';

export function useDropdown(
  createTerm,
  options,
  optionKey,
  value,
  allowCreate,
  createPrefix = "+ Create",
) {
  const getFilteredOptions = options => {
    const flatValue = value.map(valueItem => valueItem[optionKey]);
    console.log("hello shabash flatvalue and createTerm", createTerm);
    let filteredOptions =
      createTerm.length > 0
        ? options.filter(option => !flatValue.includes(option[optionKey]))
        : options;
    console.log(filteredOptions);
    if (allowCreate && createTerm) {
      filteredOptions = [
        {
          [optionKey]: `${createPrefix} "${createTerm}"`,
          type: "CREATE",
        },
      ].concat(filteredOptions);
    }
    return filteredOptions;
  };

  return [getFilteredOptions(options)];
}
