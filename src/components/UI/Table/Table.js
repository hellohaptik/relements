import React from "react";
import PropTypes from "prop-types";

import Header from "./components/Header";
import Body from "./components/Body";
import BodyVirtual from "./components/Body.Virtual";
import styles from "./Table.scss";

function Table({
  columns,
  rows,
  onSort,
  onRowClick,
  sortKey,
  sortOrder,
  className,
  prefixClassName,
  virtual,
  rowHeight,
  height,
  noHeader,
}) {
  const RenderBody = virtual ? BodyVirtual : Body;
  return (
    <div
      data-testid="table"
      className={`${styles.table} ${className} ${prefixClassName}`}
    >
      {!noHeader && (
        <Header
          prefixClassName={`${prefixClassName}-header`}
          onSort={onSort}
          columns={columns}
          sortOrder={sortOrder}
          sortKey={sortKey}
        />
      )}
      <RenderBody
        prefixClassName={`${prefixClassName}-body`}
        onRowClick={onRowClick}
        rows={rows}
        columns={columns}
        rowHeight={rowHeight}
        height={height}
      />
    </div>
  );
}

Table.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  prefixClassName: PropTypes.string,
  ...Header.propTypes,
  ...Body.propTypes,
};

Table.defaultProps = {
  className: "",
  prefixClassName: "",
  height: 300,
};

export default Table;
