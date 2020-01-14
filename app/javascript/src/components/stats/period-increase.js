import React, { Component } from 'react';

class PeriodIncrease extends Component {
  render() {
    const { name, percentage, size, color } = this.props;

    return (
      <>
        <div class={`c100 p${percentage} ${size} center`}>
          <span>{percentage}%</span>
          <div class="slice">
            <div class="bar"></div>
            <div class="fill" style={{borderColor: 'red'}}></div>
          </div>
        </div>
        <div className="description"><b>{name}</b> more than last month</div>
      </>
    )
  }
}

export default PeriodIncrease;


