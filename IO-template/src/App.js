import fetch from 'isomorphic-fetch';
import React from 'react';
import UsernameForm from './components/UsernameForm';
import ChatScreen from './ChatScreen';

class App extends React.Component {
  constructor() { 
    super();
    this.state = {
      currentUsername: '',
      currentScreen: 1
    };
 }

  onUsernameSubmitted = (username) => {
    fetch('https://deproductions-jakemasterson.c9users.io:3001/users', {
      method: 'POST',
      body: JSON.stringify({ username }), 
      headers: { 'Content-Type': 'application/json', },
    })
      .then(function(response) {
        console.log("It works");
        return (this.setState({ currentScreen: 2, currentUsername: username }) 
        );
      })
      .catch(error => console.error('error', error));
  }

 render() {
   if (this.state.currentScreen === 1) {
     return <UsernameForm onSubmit={this.onUsernameSubmitted} />;
   } else if (this.state.currentScreen===2) {
     return <ChatScreen currentUsername={this.state.currentUsername} />;
   }
    // if (this.state.currentScreen === 'WhatIsYourUsernameScreen') {
    //   return <UsernameForm onSubmit={this.onUsernameSubmitted} />
    // }
    // if (this.state.currentScreen === 'ChatScreen') {
    //   return <ChatScreen currentUsername={this.state.currentUsername} />
    // }
  }
}

export default App;