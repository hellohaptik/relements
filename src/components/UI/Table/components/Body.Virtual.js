import React from "react";
import PropTypes from "prop-types";
// import Icon from 'components/UI/Icon';
import { FixedSizeList as List, areEqual } from "react-window";

import Row from "./Row";

function Body({
  className,
  prefixClassName,
  onRowClick,
  rows,
  columns,
  rowHeight,
  height,
  activeIndex,
  highlightActiveRow,
}) {
  const renderRow = React.memo(
    // eslint-disable-next-line react/prop-types
    ({ index, style, data }) => {
      const isRowActive = index === activeIndex;
      return (
        <Row
          index={index}
          style={style}
          data={data}
          onClick={onRowClick}
          widths={columns.map(column => column.width)}
          prefixClassName={`${prefixClassName}-row`}
          active={isRowActive}
          highlightActiveRow={highlightActiveRow}
        />
      );
    },
    areEqual,
  );

  return (
    <div className={`${prefixClassName} ${className}`}>
      <List
        height={height}
        itemCount={rows.length}
        itemSize={rowHeight}
        itemData={rows}
        width="100%"
      >
        {renderRow}
      </List>
    </div>
  );
}

Body.propTypes = {
  className: PropTypes.string,
  prefixClassName: PropTypes.string,
  onRowClick: PropTypes.func,
  height: PropTypes.number,
  rowHeight: PropTypes.number,
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
  columns: PropTypes.arrayOf(PropTypes.object),
  activeIndex: PropTypes.bool,
  highlightActiveRow: PropTypes.bool,
};

Body.defaultProps = {
  onRowClick: () => {},
  className: "",
  prefixClassName: "",
  rows: [[]],
  columns: [],
  rowHeight: 0,
  height: 300,
};

export default Body;
