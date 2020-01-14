import React, { Component } from 'react';

class CustomName extends Component {
  state = {
    name: ''
  }

  onChange = (e) => {
    const { target: { name , value } } = e;

    this.setState({
      [name]: value
    })
  }

  onSave = () => {
    const splittedName = this.state.name.split(' ');

    const attributes = {
      firstName: splittedName[0],
      lastName: splittedName[1]
    }

    this.props.updateName(attributes);
  }

  render() {
    return (
      <div className="form-group card-name">
        <input className="btn btn-primary" type="button" value="Save" onClick={this.onSave} />
        <input className="form-control" type="text" name="name" onChange={this.onChange} />
      </div>
    )
  }
}

export default CustomName;
