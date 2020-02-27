import React from "react";
import PropTypes from "prop-types";
// import Icon from 'components/UI/Icon';

import Row from "./Row";

function Body({ className, prefixClassName, onRowClick, rows, columns }) {
  return (
    <div className={`${prefixClassName} ${className}`}>
      {rows.map((_, index) => (
        <Row
          key={index}
          index={index}
          data={rows}
          onClick={onRowClick}
          widths={columns.map(column => column.width)}
          prefixClassName={`${prefixClassName}-row`}
        />
      ))}
    </div>
  );
}

Body.propTypes = {
  className: PropTypes.string,
  prefixClassName: PropTypes.string,
  onRowClick: PropTypes.func,
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
  columns: PropTypes.arrayOf(PropTypes.object),
};

Body.defaultProps = {
  onRowClick: () => {},
  className: "",
  prefixClassName: "",
  rows: [[]],
  columns: [],
};

export default Body;
