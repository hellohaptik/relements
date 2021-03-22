import React from "react";
import PropTypes from "prop-types";

import Header from "./components/Header";
import Body from "./components/Body";
import BodyVirtual from "./components/Body.Virtual";
import ThemedTableWrapper from "./ThemedTable/ThemedTableWrapper";

import styles from "./Table.scss";

function Table(props) {
  const {
    columns,
    rows,
    onSort,
    onRowClick,
    highlightActiveRow,
    sortKey,
    sortOrder,
    className,
    prefixClassName,
    virtual,
    rowHeight,
    height,
    themed,
    ...designProps
  } = props;

  const RenderBody = virtual ? BodyVirtual : Body;
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const rowProps = onRowClick
    ? {
        onRowClick: (index, row) => {
          setActiveIndex(index);
          onRowClick(index, row);
        },
      }
    : {};

  if (themed) {
    return (
      <ThemedTableWrapper {...designProps}>
        <Header
          prefixClassName={`${prefixClassName}-header`}
          onSort={onSort}
          columns={columns}
          sortOrder={sortOrder}
          sortKey={sortKey}
          themed
          designProps={designProps}
        />
        <RenderBody
          {...rowProps}
          activeIndex={activeIndex}
          highlightActiveRow={highlightActiveRow}
          prefixClassName={`${prefixClassName}-body`}
          rows={rows}
          columns={columns}
          rowHeight={rowHeight}
          height={height}
          themed
          designProps={designProps}
        />
      </ThemedTableWrapper>
    );
  }

  return (
    <div
      data-testid="table"
      className={`${styles.table} ${className} ${prefixClassName}`}
    >
      <Header
        prefixClassName={`${prefixClassName}-header`}
        onSort={onSort}
        columns={columns}
        sortOrder={sortOrder}
        sortKey={sortKey}
      />
      <RenderBody
        {...rowProps}
        activeIndex={activeIndex}
        highlightActiveRow={highlightActiveRow}
        prefixClassName={`${prefixClassName}-body`}
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
  themed: PropTypes.bool,
  ...Header.propTypes,
  ...Body.propTypes,
};

Table.defaultProps = {
  className: "",
  prefixClassName: "",
  height: 300,
  themed: false,
};

export default Table;
