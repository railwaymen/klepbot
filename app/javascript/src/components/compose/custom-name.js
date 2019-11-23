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
      <>
        <input type="button" value="Save" onClick={this.onSave} />
        <input type="text" name="name" onChange={this.onChange} />
      </>
    )
  }
}

export default CustomName;
