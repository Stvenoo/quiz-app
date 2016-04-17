import React, { Component } from 'react';
import io from 'socket.io-client';
import Register from './register';
import Question from './question';
let socket;

class App extends Component {

  constructor() {
    super();
    this.state = {
      showRegister: true,
      step: 0,
      currentQuestion: {},
      answer: {}
    };
    this.registerUser = this.registerUser.bind(this);
    this.getQuestion = this.getQuestion.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  componentDidMount() {
    socket = io.connect('http://localhost:8000');
    socket.on('receive-question', question => {
      console.log('receive-question', question, this.state.step);
      this.setState({
        currentQuestion: question,
        answer: {}
      });
    });
    socket.on('receive-answer', answer => {
      this.setState({
        answer,
        step: this.state.step + 1
      });
    });
  }

  registerUser(username) {
    socket.emit('set-user', username);
    this.setState({ showRegister: false });
    this.getQuestion();
  }

  getQuestion() {
    console.log('get question', this.state.step);
    socket.emit('get-question', this.state.step);
  }

  checkAnswer(choice) {
    console.log('check-answer', { questionId: this.state.step, choice });
    socket.emit('check-answer', { questionId: this.state.step, choice });
  }

  render() {
    return (
      <div>
        {this.state.showRegister && <Register registerUser={this.registerUser} /> }
        <Question
          getQuestion={this.getQuestion}
          checkAnswer={this.checkAnswer}
          title={this.state.currentQuestion.title}
          choices={this.state.currentQuestion.choices}
          answer={this.state.answer}
        />
      </div>
    );
  }

}

export default App;
