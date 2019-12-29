import React, { Component } from 'react';

export default class FilterControl extends Component {
  state = {
    period: 'month',
    from: '',
    to: '',
  }

  onChange = ({ target: { value, name } }) => {
    const { onFilterChange } = this.props;

    this.setState({
      [name]: value
    }, () => {
      const { period, from, to, userId } = this.state;

      onFilterChange({ period, from, to, userId });
    })
  }

  clear = () => {
    const { onFilterChange } = this.props;

    this.setState({
      period: 'month',
      from: '',
      to: '',
    }, () => {
      const { period, from, to } = this.state;

      onFilterChange({ period, from, to });
    })
  }

  render() {
    const {
      state: {
        period, from, to
      },
      props: {
        children
      }
    } = this;

    return (
      <div className="stats-dashboard input-group">
        <select className="custom-select" name="period" onChange={this.onChange} selected={period}>
          <option value="month">Month</option>
          <option value="year">Year</option>
          <option value="day">Day</option>
        </select>
        <input type="date" className="form-control" value={from} name="from" onChange={this.onChange} />
        <input type="date" className="form-control" value={to} name="to" onChange={this.onChange} />
        {children}
        <div className="btn btn-default" onClick={this.clear}>Clear</div>
      </div>
    )
  }
}