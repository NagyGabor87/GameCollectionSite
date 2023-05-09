import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import HangmanGame from "./components/HangmanComponents/HangmanGame";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <Routes>
                        < Route path="/" element={<HangmanGame/>}/>
                    </Routes>
                </Router>
            </div>
        );
    }
}

export default App;
