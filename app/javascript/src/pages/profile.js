import React, { Component } from 'react';
import UserModel from '../models/user-model';
import UsersService from '../services/users-service';

class Profile extends Component {
  state = {
    user: new UserModel({}),
    file: '',
  }

  componentDidMount() {
    UsersService.currentUser().then(user => {
      this.setState({ user });
    });
  }

  onChange = ({ target: { name, value } }) => {
    let { user } = this.state;
    user[name] = value;

    this.setState({ user });
  }

  onImageChange = ({ target: { files } }) => {
    let { user } = this.state;

    const reader = new FileReader();
    const file = files[0];

    reader.onloadend = () => {
      user.avatarUrl = reader.result;

      this.setState({
        file,
        user,
      })
    }

    reader.readAsDataURL(file);
  }

  onSubmit = () => {
    const { user, file } = this.state;

    user.attachFile(file);
    const form = user.toDataForm();

    UsersService.currentUserUpdate(form).then(user => {
      this.setState({ user });
    });
  }

  render() {
    const { user } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3>Edit profile</h3>
          </div>
          <UserForm
            {...user}
            onChange={this.onChange}
            onImageChange={this.onImageChange}
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    )
  }
}

function UserForm({ firstName, lastName, email, onChange, onSubmit, color, signature, onImageChange, avatarUrl }) {
  return (
    <div className="col-12 form-control-klepbot">
      <div className="row">
        <div className="col-6 photo-container">
          <label
            htmlFor="exampleFormControlFile1"
            className="photo-circle"
            style={{borderColor: color}}
          >
            { avatarUrl ? <img src={avatarUrl} /> : null }
            <div className="placeholder" />
            <div className="hint">+ Click to select your photo</div>
          </label>
          <div className="form-group" style={{ display: 'none' }}>
            <input type="file" onChange={onImageChange} className="form-control-file" id="exampleFormControlFile1" />
          </div>
        </div>
        <div className="col-6">
          <div className="input-group mb-3 input-anim-container">
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              aria-label="First name"
              value={firstName}
              name="firstName"
              onChange={onChange}
            />
            <div className="border"></div>
          </div>
          <div className="input-group mb-3 input-anim-container">
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              aria-label="Last name"
              value={lastName}
              name="lastName"
              onChange={onChange}
            />
            <div className="border"></div>
          </div>
          <div className="input-group mb-3 input-anim-container">
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              aria-label="Email"
              value={email}
              name="email"
              onChange={onChange}
            />
            <div className="border"></div>
          </div>
          <div className="input-group mb-3 input-anim-container">
            <input
              type="text"
              className="form-control"
              placeholder="Your signature on emails"
              aria-label="Your signature on emails"
              value={signature}
              name="signature"
              onChange={onChange}
            />
            <div className="border"></div>
          </div>
        </div>
        <div className="input-group mb-3 button-container">
          <button type="button" className="btn btn-light" onClick={onSubmit}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default Profile;