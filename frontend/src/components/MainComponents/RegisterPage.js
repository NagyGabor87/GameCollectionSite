import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const user = {
        "username" : name,
        "email" : email,
        "password": password
    }

    const handleName = (e) => {
        setName(e.target.value);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const registerUser = () => {
        fetch("/auth/register", {
            method :"POST",
            headers : {'Content-Type': 'application/json'},
            body : JSON.stringify(user)
        }).then(response => response.json());
        navigate("/");

    }
    return (
        <div>
            <Form>
                <Form.Group className="mb-3"  controlId="formUserName">
                    <Form.Label>Enter your username</Form.Label>
                    <Form.Control type="text" className="textInput" placeholder="Insert your name here" onChange={handleName} required ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Enter your password</Form.Label>
                    <Form.Control pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                                  type="password" placeholder="Your password" className="textInput"
                                  onChange={handlePassword} required></Form.Control>
                    <Form.Text className="textInfo">Password must be at least 8 characters and has to contain
                        at least one letter, one number and one special character (@ $ ! % * # ? &)</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Enter your e-mail address</Form.Label>
                    <Form.Control type="email" className="textInput" placeholder="Your email" onChange={handleEmail} required></Form.Control>
                    <Form.Text className="textInfo">Your e-mail will be safe</Form.Text>
                </Form.Group>
                <Button type="button" className="cyber-button" onClick={registerUser}>
                    <div className="cyber-button__content">Register</div>
                    <span className="cyber-button__glitch"></span>
                    <span className="cyber-button__label">Gl1tch</span>
                </Button>
            </Form>
        </div>
    );
};

export default Register;
