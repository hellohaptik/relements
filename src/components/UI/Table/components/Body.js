import React from "react";
import PropTypes from "prop-types";
// import Icon from 'components/UI/Icon';

import Row from "./Row";

function Body({
  className,
  prefixClassName,
  onRowClick,
  rows,
  columns,
  themed,
  designProps,
  activeIndex,
  highlightActiveRow,
}) {
  return (
    <div className={`${prefixClassName} ${className}`}>
      {rows.map((_, index) => {
        const isRowActive = index === activeIndex;
        return (
          <Row
            key={index}
            index={index}
            data={rows}
            onClick={onRowClick}
            widths={columns.map(column => column.width)}
            prefixClassName={`${prefixClassName}-row`}
            themed={themed}
            designProps={designProps}
            active={isRowActive}
            highlightActiveRow={highlightActiveRow}
          />
        );
      })}
    </div>
  );
}

Body.propTypes = {
  className: PropTypes.string,
  prefixClassName: PropTypes.string,
  onRowClick: PropTypes.func,
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
  columns: PropTypes.arrayOf(PropTypes.object),
  themed: PropTypes.bool,
  designProps: PropTypes.shape({}),
  activeIndex: PropTypes.bool,
  highlightActiveRow: PropTypes.bool,
};

Body.defaultProps = {
  onRowClick: () => {},
  className: "",
  prefixClassName: "",
  rows: [[]],
  columns: [],
};

export default Body;
