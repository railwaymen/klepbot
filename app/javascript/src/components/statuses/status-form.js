import React, { Component } from 'react';

class StatusForm extends Component {
  onChange = (e) => {
    const { value, name } = e.target;
    const { onChange } = this.props;

    onChange({ value, name });
  }

  onSubmit = () => {
    this.props.saveChanges();
  }

  render() {
    const {
      name,
      color,
    } = this.props;

    return (
      <form className="col-md-12 form-control-klepbot">
        <div className="input-group mb-3 input-anim-container">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            aria-label="Name"
            value={name}
            name="name"
            onChange={this.onChange}
          />
          <div className="border"></div>
        </div>
        <div className="input-group mb-3 input-anim-container">
          <input
            type="color"
            className="form-control"
            placeholder="Color"
            aria-label="Color"
            value={color}
            name="color"
            onChange={this.onChange}
          />
          <div className="border"></div>
        </div>
        <div className="input-group mb-3 button-container">
          <button type="button" className="btn btn-light" onClick={this.onSubmit}>Save Status</button>
        </div>
      </form>
    )
  }
}

export default StatusForm;