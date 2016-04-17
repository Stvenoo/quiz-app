import React, { Component } from 'react';

class Question extends Component {

  constructor() {
    super();
    this.state = {
      choice: ''
    };
    this.onChoiceChange = this.onChoiceChange.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  onChoiceChange(e) {
    this.setState({ choice: e.target.value });
  }

  checkAnswer() {
    if(this.props.answer.answer) {
      this.props.getQuestion();
    } else {
      this.props.checkAnswer(this.state.choice);
    }
  }

  render() {
    const title = this.props.title;
    const choices = this.props.choices;
    const answer = this.props.answer;
    const val = answer.answer;

    if(!Object.keys(choices).length) {
      return null;
    }

    const correctStyle = {
      color: 'green'
    };

    const incorrectStyle = {
      color: 'red'
    };

    return (
      <div>
        <h3>{title}</h3>
        {
          Object.keys(choices).map(choiceId => {
            if(val) {
              var style = choiceId === answer.answer ? correctStyle : incorrectStyle;
            } else {
              var style = {};
            }
            return (
              <div key={choiceId}>
                <label style={style}>
                  {choices[choiceId]}
                  <input
                    type="radio"
                    onChange={this.onChoiceChange}
                    checked={this.state.choice === choiceId}
                    value={choiceId}
                    disabled={!!val}
                  />
                </label>
              </div>
            );
          })
        }
        <button onClick={this.checkAnswer}>
        { val ? 'Next' : 'Check'}
        </button>
      </div>
    );
  }
}

Question.defaultProps = {
  title: '',
  choices: {},
  answer: {}
};

export default Question;
