// import { useState, useRef, useEffect } from 'react';
// import { create } from 'domain';

export function useDropdown(
  createTerm,
  options,
  optionKey,
  value,
  allowCreate,
  createPrefix,
) {
  const getFilteredOptions = (options) => {
    const flatOptions = options.map((option) => {
      return option[optionKey];
    });
    const flatValue = value.map((valueItem) => valueItem[optionKey]);
    let filteredOptions = options.filter(
      (option) => !flatValue.includes(option[optionKey]),
    );
    const doesCreateTermExist = flatOptions.indexOf(flatValue[0]) > -1 ? true : false;
    //  if createTerm is an existing option, does not show an option to create
    if (allowCreate && createTerm && !doesCreateTermExist) {
      filteredOptions = [
        {
          [optionKey]: `${createPrefix} ${createTerm}`,
          type: 'CREATE',
        },
      ].concat(filteredOptions);
    }
    return filteredOptions;
  };

  return [getFilteredOptions(options)];
}
