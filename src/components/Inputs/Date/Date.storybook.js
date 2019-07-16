import React from 'react';
import { storiesOf } from '@storybook/react';

import DatePicker from './Date';

storiesOf('Inputs/Date', module)
  .add('Single', () => {
    const story = <DateWrapper />;
    return story;
  })
  .add('Range', () => {
    const story = <DateWrapperRange />;
    return story;
  })
  .add('Comparison', () => {
    const story = <DateWrapperRangeComparison />;
    return story;
  });

class DateWrapper extends React.Component {
  state = {
    value: new Date(),
  };

  render() {
    console.log('VALUE', this.state.value);
    return (
      <DatePicker
        label="Select Date"
        placeholder="Select..."
        value={this.state.value}
        onChange={value => this.setState({ value })}
        minDate={new Date()}
      />
    );
  }
}

class DateWrapperRange extends React.Component {
  state = {
    value: {
      startDate: new Date(),
      endDate: new Date(),
    },
  };

  render() {
    console.log('VALUE', this.state.value);
    return (
      <DatePicker
        label="Select Date"
        placeholder="Select..."
        value={this.state.value}
        onChange={value => this.setState({ value })}
        minDate={new Date()}
        withRange
      />
    );
  }
}

class DateWrapperRangeComparison extends React.Component {
  state = {
    value: {
      startDate: new Date(),
      endDate: new Date(),
    },
  };

  render() {
    return (
      <DatePicker
        label="Select Date"
        placeholder="Select..."
        value={this.state.value}
        onChange={value => this.setState({ value })}
        minDate={new Date()}
        withRange
        withComparison
      />
    );
  }
}
