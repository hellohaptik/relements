import React from "react";
import PropTypes from "prop-types";
import styles from "./Row.scss";

function Row({ index, style, data, onClick, prefixClassName, widths }) {
  const row = data[index];
  const rowColumns = Array.isArray(row) ? row : row.columns;
  const disabledClassName = row.disabled ? styles.disabled : "";
  const rowClassName = row.className || "";

  if (row.hidden) return null;

  return (
    <div
      style={style}
      key={`${index}-${row.id}`}
      className={`${styles.tableRow} ${disabledClassName} ${prefixClassName} ${rowClassName}`}
      onClick={() => onClick(row, index)}
    >
      {rowColumns.map((column, i) => {
        return (
          <div
            key={i}
            className={`${styles.tableRowItem} ${prefixClassName}-column`}
            style={{
              width: widths[i],
              maxWidth: widths[i],
              minWidth: widths[i],
            }}
          >
            <div
              className={`${styles.tableRowItemText} ${prefixClassName}-column`}
            >
              {column.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}

Row.propTypes = {
  prefixClassName: PropTypes.string,
  widths: PropTypes.arrayOf(PropTypes.number),
  onClick: PropTypes.func,
  index: PropTypes.number,
  style: PropTypes.shape({}),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      columns: PropTypes.array,
      disabled: PropTypes.bool,
      className: PropTypes.string,
      hidden: PropTypes.bool,
    }),
  ),
};

export default Row;
