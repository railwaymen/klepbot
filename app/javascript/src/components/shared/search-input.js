import React, { Component } from 'react';

class SearchInput extends Component {
  constructor(props) {
    super(props);

    const { value = '', typeDelay = 1 } = this.props;

    this.state = {
      value,
      typeDelay: typeDelay * 1000,
      isFocused: false,
    };

    this.lastTypeAt = null;
    this.typeOut = null;
  }

  onChange = ({ target: { value } }) => {
    this.lastTypeAt = new Date();

    if (this.typeOut) clearTimeout(this.typeOut);

    this.setState({
      value
    }, () => {
      const { props: { onStopTyping }, state: { typeDelay, value } } = this;

      this.typeOut = setTimeout(() => {
        if (new Date() - this.lastTypeAt >= typeDelay) {
          if (onStopTyping) onStopTyping(value);
        };
      }, typeDelay);
    });
  }

  onFocus = () => {
    const { onFocus } = this.props;

    this.input.focus();

    if (onFocus) onFocus();
  }

  clear = () => {
    const { onStopTyping } = this.props;

    this.setState({ value: '' }, () => {
      const { value } = this.state;

      if (this.typeOut) clearTimeout(this.typeOut);
      if (onStopTyping) onStopTyping(value);
    });
  }

  render() {
    const { value } = this.state;

    return (
      <div className="search-input" onClick={this.onFocus}>
        <div className="search-field">
          <input
            className="search"
            ref={(input) => this.input = input}
            type="text"
            name="search"
            value={value}
            onChange={this.onChange}
            placeholder="Search"
            autocomplete="off"
          />
        </div>
        <div className="search-box">
          { value.length > 0 ?
            <i onClick={this.clear} key="fa-times" className="fas fa-times"></i> :
            <i key="fa-search" className="fas fa-search"></i>
          }
        </div>
      </div>
    )
  }
}

export default SearchInput;