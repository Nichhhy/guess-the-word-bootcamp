import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: getRandomWord(),
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      // Insert num guesses left state here
      // Insert form input state here
      input: "",

      numOfTriesLeft: 10,
    };
  }

  generateWordDisplay = () => {
    const wordDisplay = [];
    // for...of is a string and array iterator that does not use index
    for (let letter of this.state.currWord) {
      if (this.state.guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.toString();
  };

  handleChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.state.input) {
      this.setState({
        input: "",
      });
      return;
    }

    const newLetter = this.state.input.toLowerCase();

    if (this.state.guessedLetters.includes(newLetter)) {
      alert("Letter has already been guessed");
      this.setState({
        input: "",
      });
      return;
    }

    this.setState((state) => ({
      guessedLetters: [...state.guessedLetters, newLetter],
      numOfTriesLeft: this.state.currWord.includes(newLetter)
        ? state.numOfTriesLeft
        : (state.numOfTriesLeft -= 1),
    }));

    this.setState({
      input: "",
    });
  };

  checkGameStatus = () => {
    var counter = 0;
    for (let letter of this.state.currWord) {
      if (this.state.guessedLetters.includes(letter)) {
        counter++;
      }
    }

    if (counter === this.state.currWord.length) {
      return true;
    }

    if (this.state.numOfTriesLeft === 0) {
      return true;
    }

    return false;
  };

  reset = () => {
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      input: "",

      numOfTriesLeft: 10,
    });
  };

  render() {
    const status = this.checkGameStatus();
    return (
      <div className="App">
        <header className="App-header">
          <h1>Guess The Word 🚀</h1>
          <h3>Word Display</h3>
          {this.generateWordDisplay()}
          <h3>Number of Tries left</h3>
          {this.state.numOfTriesLeft}
          <h3>Guessed Letters</h3>
          {this.state.guessedLetters.length > 0
            ? this.state.guessedLetters.toString()
            : "-"}
          <h3>Input</h3>
          {
            <form onSubmit={this.handleSubmit}>
              <input
                value={this.state.input}
                name="username"
                maxLength="1"
                onChange={this.handleChange}
                disabled={status}
              />
              <input type="submit" value="guess" disabled={status} />
              {status === true ? (
                <button onClick={() => this.reset()}> reset</button>
              ) : null}
            </form>
          }

          {status === true
            ? this.state.numOfTriesLeft === 0
              ? "No Tries Left"
              : "You have guessed the word!"
            : null}
          {}
        </header>
      </div>
    );
  }
}

export default App;
