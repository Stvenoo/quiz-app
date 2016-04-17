import React, { Component } from 'react';

class App extends Component {

  constructor() {
    super();
    this.state = {
      connectedClients: 0,
      users: {}
    }
  }

  componentDidMount() {
    const socket = io();
    socket.on('total-users', (res) => {
      this.setState({
        connectedClients: res
      });
    });
    socket.on('get-users', (users) => {
      console.log(  users);
      this.setState({
        users
      });
    });

  }

  render() {
    return (
      <div>
        <h1>Connected clients: {this.state.connectedClients}</h1>
        {
          Object.keys(this.state.users).map(userId => {
            const user = this.state.users[userId];
            return <div key={userId}>{user.name}</div>
          })
        }
      </div>
    );
  }

}

export default App;
