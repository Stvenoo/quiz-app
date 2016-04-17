import React, { Component } from 'react';
import io from 'socket.io-client';
let socket;

class Register extends Component {

  constructor() {
    super();
    this.state = {
      username: ''
    };
    this.onNameChange = this.onNameChange.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  registerUser(e) {
    e.preventDefault();
    this.props.registerUser(this.state.username);
  }

  onNameChange(e) {
    const username = e.target.value;
    this.setState({ username });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.registerUser}>
          <label>Name:</label>
          <input type="text" value={this.state.username} onChange={this.onNameChange}/>
        </form>
        <button onClick={this.registerUser}>Sent!</button>
      </div>
    );
  }

}

export default Register;
