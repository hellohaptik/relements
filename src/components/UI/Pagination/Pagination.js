import React from "react";
import PropTypes from "prop-types";
import Icon from "components/UI/Icon";
import AngleDownIcon from "icons/angle-down.svg";
import styles from "./Pagination.scss";

const renderDots = () => (
  <div className={`${styles.paginationSeparator}`}>
    <div className={`${styles.paginationDot}`} />
    <div className={`${styles.paginationDot}`} />
    <div className={`${styles.paginationDot}`} />
  </div>
);

const Pagination = ({
  className,
  numPages,
  page,
  onChange,
  prefixClassName,
}) => {
  const NUM_PAGES = numPages;
  const PAGE = page - 1;
  const leftDisabled = PAGE === 0 ? styles.disabled : "";
  const rightDisabled = PAGE === NUM_PAGES - 1 ? styles.disabled : "";

  const visiblePages = Array(NUM_PAGES)
    .fill(0)
    .map((page, i) => {
      if (i === NUM_PAGES - 1) return 1;
      return Math.abs(PAGE - i) < 6 ? 1 : 0;
    });

  const renderArrow = React.useCallback(
    (className, prefixClassName, newPage) => {
      return (
        <div
          onClick={() => onChange(newPage)}
          className={`${styles.paginationArrow} ${prefixClassName}-arrow ${className}`}
        >
          <Icon src={AngleDownIcon} />
        </div>
      );
    },
  );

  return (
    <div
      data-testid="pagination"
      className={`${styles.pagination} ${prefixClassName} ${className}`}
    >
      {renderArrow(
        `${prefixClassName}-arrow-left ${styles.left} ${leftDisabled}`,
        prefixClassName,
        page - 1,
      )}
      {visiblePages.map((page, i) => {
        const paginationButtonActive =
          PAGE === i ? `${styles.active} ${prefixClassName}-page-active` : "";
        if (page === 0 && visiblePages[i - 1] !== 0) return renderDots();
        if (page === 0) return null;
        return (
          <div
            onClick={() => onChange(i + 1)}
            className={`${styles.paginationButton} ${paginationButtonActive} ${prefixClassName}-page`}
          >
            {i + 1}
          </div>
        );
      })}
      {renderArrow(
        `${prefixClassName}-arrow-right ${styles.right} ${rightDisabled}`,
        prefixClassName,
        page + 1,
      )}
    </div>
  );
};

Pagination.propTypes = {
  /** The classname to be appended to the outermost element */
  className: PropTypes.string,
  /** prefix to be appended to the child elements */
  prefixClassName: PropTypes.string,
  /** On page change callback function */
  onChange: PropTypes.func,
  /** Total number of pages */
  numPages: PropTypes.number,
  /** Current active page of the user */
  page: PropTypes.number,
};

Pagination.defaultProps = {
  className: "",
  prefixClassName: "",
  onChange: () => {},
  numPages: 1,
  page: 1,
};

Pagination.classNames = {
  $prefix: "Outermost element",
  "$prefix-arrow": "Arrow element in pagination",
  "$prefix-arrow-left": "Left Arrow element in pagination",
  "$prefix-arrow-right": "Right Arrow element in pagination",
  "$prefix-page-active": "Active page element in pagination",
  "$prefix-page": "Page numbers displayed in pagination",
};

export default Pagination;
