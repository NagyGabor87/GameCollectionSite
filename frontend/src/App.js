import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import HangmanGame from "./components/HangmanComponents/HangmanGame";
import HomePage from "./components/MainComponents/HomePage";
import BootstrapNavbar from "./components/MainComponents/BootstrapNavbar";
import LoginPage from "./components/MainComponents/LoginPage";
import RegisterPage from "./components/MainComponents/RegisterPage";
import Page from "./components/BreakoutComponents/GameComponents/page"

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <BootstrapNavbar/>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/hangman" element={<HangmanGame/>}/>
                        <Route path="/breakout" element={<Page/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                    </Routes>
                </Router>
            </div>
        );
    }
}

export default App;
