import { useState, useRef, useEffect } from 'react';
import Fuse from 'fuse.js';

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
  keys: ['text'],
};

export function useSearch(options, searchKeys) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const _fuse = useRef();

  const setupSearch = () => {
    const fuseOptions = {
      ...defaultFuseOptions,
      keys: searchKeys ? searchKeys : defaultFuseOptions.keys,
    };
    _fuse.current = new Fuse(options, fuseOptions);
    setSearchResults(options);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm.length === 0) {
      setSearchResults(options);
    } else {
      setSearchResults(_fuse.current.search(searchTerm));
    }
  };

  useEffect(() => {
    setupSearch();
  }, [options]);

  return [searchTerm, searchResults, handleSearch];
}
