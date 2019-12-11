import React, { Component } from 'react';

class Stats extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <Stats />
          </div>
          <div className="col-md-4">
            <div className="stats-box">
              <div className="percentage">23%</div>
              <div className="description">Test</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stats-box">
              <div className="percentage">23%</div>
              <div className="description">Test</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Stats;
