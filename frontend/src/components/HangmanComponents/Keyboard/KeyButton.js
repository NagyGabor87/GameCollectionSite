import React, {Component} from 'react';

class KeyButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: "",
            pressedLetters: new Set()
        };
        this.onClick = this.onClick.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    componentDidMount() {
        document.body.addEventListener("keydown", this.onKeyDown);
    }

    componentWillUnmount() {
        document.body.removeEventListener("keydown", this.onKeyDown);
    }

    onClick = event => {
        this.props.clickedletter(event);
        this.setState({ disabled: true });
    };

    onKeyDown = event => {
        if (event.key === this.props.letter) {
            if (!this.state.pressedLetters.has(event.key)) {
                if (this.props.pressedletter(event)) {
                    const prevPressedLetters = this.state.pressedLetters;
                    this.setState({
                        disabled: true,
                        pressedLetters: new Set(prevPressedLetters.add(event.key))
                    });
                }
            }
        }
    };

    render() {
        return (
            <button
                className="key one"
                onKeyDown={this.onKeyDown}
                onClick={this.onClick}
                value={this.props.letter}
                disabled={this.state.disabled}
                tabIndex="0"
            >
                {this.props.letter}
            </button>
        );
    }
}

export default KeyButton;