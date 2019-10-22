import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Fuse from "fuse.js";

import Context from "@src/components/Context";
import Icon from "@src/components/UI/Icon";
import SearchIcon from "@src/icons/search.svg";
import useEnterKey from "@src/hooks/useEnterKey/useEnterKey";

import styles from "./Search.scss";

const FUSE_OPTIONS = {
  shouldSort: true,
  threshold: 0.2,
  tokenize: true,
  matchAllTokens: true,
  findAllMatches: true,
  location: 0,
  distance: 50,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["title"],
};

function Search({
  className,
  prefixClassName,
  options,
  onChange,
  onType,
  onSubmit,
  searchKeys,
  autoFocus,
  hint,
  placeholder,
  value,
}) {
  const { primaryColor } = React.useContext(Context);
  const fuse = React.useRef();
  const searchInputRef = React.useRef();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [focused, setFocused] = React.useState("");
  const handleSearch = React.useCallback(e => {
    const termToSearch = e.target.value;
    if (!termToSearch.length) onChange(options);
    else onChange(fuse.current.search(termToSearch));
    onType(termToSearch, e);
    setSearchTerm(termToSearch);
  });

  useEffect(() => {
    FUSE_OPTIONS.keys = searchKeys;
    fuse.current = new Fuse(options, FUSE_OPTIONS);
  });

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  useEnterKey(onSubmit, searchInputRef);

  const activeClassName = focused ? styles.active : "";
  return (
    <div
      style={{ borderColor: focused ? primaryColor : undefined }}
      className={`${styles.search} ${prefixClassName} ${className} ${activeClassName}`}
    >
      <Icon
        src={SearchIcon}
        className={`${styles.searchIcon} ${prefixClassName}-icon`}
      />
      <input
        ref={searchInputRef}
        type="text"
        placeholder={placeholder}
        className={`${styles.searchInput} ${prefixClassName}-input`}
        onChange={handleSearch}
        value={searchTerm}
        autoFocus={autoFocus}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <div className={`${styles.hint} ${prefixClassName}-hint`}>{hint}</div>
    </div>
  );
}

Search.propTypes = {
  /** The classname to appended to the outermost element */
  className: PropTypes.string,
  /** The prefix classname appended to all elements */
  prefixClassName: PropTypes.string,
  /** The input placeholder */
  placeholder: PropTypes.string,
  /** Whenever you type, an onChange callback is triggered with the results */
  onChange: PropTypes.func,
  /** Object keys to search when finding */
  searchKeys: PropTypes.array,
  /** The array of object to search */
  options: PropTypes.array,
  /** Whether to auto focus or not */
  autoFocus: PropTypes.bool,
  /** The hint text that shows up inside the search input */
  hint: PropTypes.string,
  /** The onChange for the input (callback called with searchTerm as param) */
  onType: PropTypes.func,
  /** When enter key is pressed to initiate the search */
  onSubmit: PropTypes.func,
  /** The search input value */
  value: PropTypes.string,
};

Search.defaultProps = {
  placeholder: "",
  onChange: () => {},
  onSubmit: () => {},
  searchKeys: [],
  options: [],
  autoFocus: false,
  className: "",
  hint: "",
  onType: () => {},
};

Search.classNames = {
  $prefix: "Outermost element",
  "$prefix-icon": "Search Icon",
  "$prefix-input": "Search input",
  "$prefix-hint": "Search hint",
};

export default Search;
