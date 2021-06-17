import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Text from "@src/components/UI/Text";
import Box from "@src/components/UI/Box";
import Tooltip from "@src/components/Overlays/Tooltip";

import ThemedRowItem from "../ThemedTable/ThemedRowItem";

import styles from "./Row.scss";

function Row({
  index,
  style,
  data,
  onClick,
  prefixClassName,
  widths,
  themed,
  designProps,
  active = false,
  highlightActiveRow = false,
}) {
  const row = data[index];
  const rowColumns = Array.isArray(row) ? row : row.columns;
  const disabledClassName = row.disabled ? styles.disabled : "";
  const activeClassName = active && highlightActiveRow ? styles.selected : "";
  const rowClassName = row.className || "";
  const [refs] = useState(() =>
    Array(rowColumns.length)
      .fill()
      .map(() => React.createRef()),
  );

  const [columnOverflowData, setColumnOverflowData] = useState([]);

  useEffect(() => {
    const columnOverflowData = refs.map(
      ref => ref.current && ref.current.offsetWidth < ref.current.scrollWidth,
    );
    setColumnOverflowData(columnOverflowData);
  }, []);

  if (row.hidden) return null;
  return (
    <div
      style={style}
      key={`${index}-${row.id}`}
      className={`${styles.tableRow} ${disabledClassName} ${prefixClassName} ${rowClassName} ${activeClassName}`}
      onClick={() => onClick(index, row)}
    >
      {rowColumns.map((column, i) => {
        if (themed) {
          const TextComponent = () => (
            <Text
              {...designProps}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              ref={refs[i]}
            >
              {column.content}
            </Text>
          );

          return (
            <ThemedRowItem
              {...designProps}
              key={i}
              style={{
                width: widths[i],
                maxWidth: widths[i],
                minWidth: widths[i],
              }}
            >
              {columnOverflowData[i] ? (
                <Tooltip
                  tooltip={column.content}
                  offset={{
                    left:
                      (refs[i].current &&
                        (refs[i].current.offsetWidth - 20) / 2) ||
                      0,
                    top:
                      -(refs[i].current && refs[i].current.offsetTop / 2) || 0,
                  }}
                  themed
                >
                  <Box
                    padding="zero"
                    margin="zero"
                    display={{ display: "inline-grid" }}
                  >
                    <TextComponent />
                  </Box>
                </Tooltip>
              ) : (
                <TextComponent />
              )}
            </ThemedRowItem>
          );
        }
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
              className={`${styles.tableRowItemText} ${prefixClassName}-column-content`}
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
  widths: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
  index: PropTypes.number,
  style: PropTypes.shape({}),
  active: PropTypes.bool,
  highlightActiveRow: PropTypes.bool,
  data: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        columns: PropTypes.array,
        disabled: PropTypes.bool,
        className: PropTypes.string,
        hidden: PropTypes.bool,
      }),
    ),
  ),
  themed: PropTypes.bool,
  designProps: PropTypes.shape({}),
};

export default Row;
