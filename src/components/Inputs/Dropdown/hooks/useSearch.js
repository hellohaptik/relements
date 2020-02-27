import { useState, useRef, useEffect } from "react";
import Fuse from "fuse.js";

// some sensible defaults
const defaultFuseOptions = {
  shouldSort: true,
  threshold: 0.2,
  tokenize: true,
  matchAllTokens: true,
  findAllMatches: true,
  location: 0,
  distance: 50,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["text"],
};

/**
 * The useSearch hook handles searching of options
 * It uses fuse.js to implement fuzzy search. Based on the text
 * it filters the options list.
 * @param {String}    text        the text to search
 * @param {Object[]}  options     the array of objects to search
 * @param {String[]}  searchKeys  the array of keys to search (inside the options)
 * @returns
 */
export function useSearch(text, options, searchKeys) {
  const [searchResults, setSearchResults] = useState([]);
  const _fuse = useRef();

  const setupSearch = () => {
    const fuseOptions = {
      ...defaultFuseOptions,
      keys: searchKeys ? searchKeys : defaultFuseOptions.keys,
    };
    _fuse.current = new Fuse(options, fuseOptions);
    setSearchResults(options);
  };

  const handleSearch = searchTerm => {
    if (searchTerm.length === 0) {
      setSearchResults(options);
    } else {
      setSearchResults(_fuse.current.search(searchTerm));
    }
  };

  useEffect(() => {
    setupSearch();
  }, [options]);

  useEffect(() => {
    handleSearch(text);
  }, [text]);

  return searchResults;
}
