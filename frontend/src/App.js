import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import HangmanGame from "./components/HangmanComponents/HangmanGame";
import HomePage from "./components/MainComponents/HomePage";
import BootstrapNavbar from "./components/MainComponents/BootstrapNavbar";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <BootstrapNavbar/>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/hangman" element={<HangmanGame/>}/>
                    </Routes>
                </Router>
            </div>
        );
    }
}

export default App;
