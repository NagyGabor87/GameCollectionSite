import React, { PureComponent } from "react";
import Layout from "./Layout/Layout";
import WrongLetter from "./GameCore/WrongLetter";
import GuessableBuilder from "./GuessBuilder/GuessableBuilder";
import KeyboardBuilder from "./Keyboard/KeyboardBuilder";
import AccumStats from "./Stats/AccumStats";
import CurrGameStats from "./Stats/CurrGameStats";
import './Hangman.css'

class HangmanGame extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            word: " ",
            guessableCorrect: [],
            selectedLetter: "",
            parts: [],
            isLoading: true,
            gameState: "",
            wins: 0,
            losses: 0,
            correct: 0,
            incorrect: 0
        };

        this.letterClickHandler = this.letterClickHandler.bind(this);
        this.letterPressHandler = this.letterPressHandler.bind(this);
        this.newGameClickHandler = this.newGameClickHandler.bind(this);
        this.fetchNewGame = this.fetchNewGame.bind(this);
        this.fetchGuessableAnswer = this.fetchGuessableAnswer.bind(this);
        this.fetchStats = this.fetchStats.bind(this);
    }

    componentDidMount() {
        this.fetchNewGame();
        this.fetchStats();
    }

    letterClickHandler = event => {
        const letter = event.target.value;
        this.setState({ selectedLetter: letter });
        this.fetchGuessableAnswer(letter);
        this.fetchStats();
    };

    letterPressHandler = event => {
        this.fetchStats();
        if (this.state.gameState === "won" || this.state.gameState === "lost")
            return false;

        const letter = event.key;
        this.setState({ selectedLetter: letter });
        this.fetchGuessableAnswer(letter);
        this.fetchStats();
        return true;
    };

    newGameClickHandler = event => {
        this.fetchNewGame();
        this.fetchStats();
        this.setState({
            word: " ",
            guessableCorrect: [],
            selectedLetter: "",
            parts: [],
            isLoading: true,
            gameState: "",
            correct: 0,
            incorrect: 0
        });
    };

    fetchNewGame() {
        fetch("/hangman/newgame", { method: "post" })
            .then(() => {
                return fetch("/hangman");
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                const guessCorrect = [];
                data.guesses.map(d => guessCorrect.push(d.isGuessed));

                let newStr = "";

                for (let i = 0; i < guessCorrect.length; i++) {
                    newStr += " ";
                }

                this.setState({
                    guessableCorrect: guessCorrect,
                    word: newStr,
                    isLoading: false
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    fetchGuessableAnswer(letter) {
        const value = { letter: letter };

        fetch("/hangman", {
            method: "post",
            body: JSON.stringify(value),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                const guessCorrect = [];
                data.guesses.map(d => guessCorrect.push(d.isGuessed));

                let newStr = "";
                let currCorrect = this.state.correct;
                let currIncorrect = this.state.incorrect;
                let newParts = this.state.parts;
                let isChanged = false;

                for (let i = 0; i < guessCorrect.length; i++) {
                    if (guessCorrect[i] !== this.state.guessableCorrect[i]) {
                        newStr += this.state.selectedLetter;
                        isChanged = true;
                        currCorrect++;
                    } else {
                        newStr += this.state.word[i];
                    }
                }

                if (!isChanged) {
                    newParts.push(value.letter);
                    currIncorrect++;
                }

                if (data["word"] != null) {
                    newStr = data["word"];
                }

                this.setState({
                    guessableCorrect: guessCorrect,
                    word: newStr,
                    parts: newParts,
                    correct: currCorrect,
                    incorrect: currIncorrect
                });
                return fetch("/hangman/status");
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                let status = "";

                if (data.status === "won") {
                    status = "won";
                } else if (data.status === "lost") {
                    status = "lost";
                }

                this.setState({
                    gameState: status
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    fetchStats() {
        fetch("/hangman/stats")
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.wins < this.state.wins) data.wins = this.state.wins;
                if (data.losses < this.state.losses) data.losses = this.state.losses;

                this.setState({
                    wins: data.wins,
                    losses: data.losses
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <Layout
                gamestate={this.state.gameState}
                newgamehandler={this.newGameClickHandler}
            >
                <h1 className="cyber-font">Hangman</h1>
                <WrongLetter parts={this.state.parts} />
                <GuessableBuilder word={this.state.word} />
                {this.state.isLoading ? (
                    <h2>Loading word...</h2>
                ) : (
                    <KeyboardBuilder
                        clickedletter={this.letterClickHandler}
                        pressedletter={this.letterPressHandler}
                    />
                )}
                <AccumStats wins={this.state.wins} losses={this.state.losses} />
                <CurrGameStats
                    correct={this.state.correct}
                    incorrect={this.state.incorrect}
                />
            </Layout>
        );
    }
}


export default HangmanGame;
