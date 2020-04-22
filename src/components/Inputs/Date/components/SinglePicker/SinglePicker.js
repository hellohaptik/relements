import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import Calendar from "@src/components/UI/Calendar";
import styles from "./SinglePicker.scss";

export default class SinglePicker extends React.Component {
  constructor() {
    super();
    dayjs.extend(customParseFormat);
  }

  render() {
    const { value, prefixClassName } = this.props;
    const date = this._getParsedValue(value);
    return (
      <div className={`${styles.singlePicker} ${prefixClassName}`}>
        <Calendar
          prefixClassName={`${prefixClassName}-calendar`}
          value={[{ from: date, to: date }]}
          onChange={this._handleCellClick}
          numMonths={1}
        />
      </div>
    );
  }

  /**
   * On clicking the cell we want to start/end the range selection depending on the
   * current state
   * So if the current selection is startDate, we start endDate selection and so on
   * We use this.state.selectingKey to track this
   */
  _handleCellClick = day => {
    this.props.onChange(day.toDate());
  };

  _getParsedValue = () => {
    const { value = {} } = this.props;
    return dayjs(value);
  };
}

SinglePicker.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.object,
  prefixClassName: PropTypes.string,
};

SinglePicker.defaultProps = {
  onChange: () => {},
  value: dayjs(),
  prefixClassName: "",
};
