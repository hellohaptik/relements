import React from 'react';
import PropTypes from 'prop-types';
// import Icon from 'components/UI/Icon';

import styles from './Body.scss';

function Body({
  className, prefixClassName, onRowClick, rows, columns,
}) {
  return (
    <div className={`${styles.tableBody} ${prefixClassName} ${className}`}>
      {rows.map((row, i) => {
        if (row.hidden) return null;
        const rowColumns = Array.isArray(row) ? row : row.columns;
        const disabledClassName = row.disabled ? styles.disabled : '';
        const rowClassName = row.className || '';
        return (
          <div
            key={`${i}-${row.id}`}
            className={`${styles.tableRow} ${disabledClassName} ${prefixClassName}-row ${rowClassName}`}
            onClick={() => onRowClick(row, i)}
          >
            {rowColumns.map((column, i) => {
              return (
                <div
                  key={i}
                  className={`${styles.tableRowItem} ${prefixClassName}-row-column`}
                  style={{
                    width: columns[i].width,
                    maxWidth: columns[i].width,
                    minWidth: columns[i].width,
                  }}
                >
                  <div className={styles.tableRowItemText}>{column.content}</div>
                </div>
              );
            })}
          </div>
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
};

Body.defaultProps = {
  onRowClick: () => {},
  className: '',
  prefixClassName: '',
  rows: [[]],
  columns: [],
};

export default Body;
