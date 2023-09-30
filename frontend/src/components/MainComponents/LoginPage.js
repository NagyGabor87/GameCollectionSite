import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const user = {
        "username" : name,
        "password": password
    }

    const handleName = (e) => {
        setName(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const loginUser = () => {
        const details = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'},
            body: JSON.stringify(user)};
        fetch('/auth/authenticate', details)
            .then(response =>  response.json())
            .then(data => localStorage.setItem("jwtToken", data.token));
        navigate("/");
    }
    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="formUserName">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" className="textInput" placeholder="Insert your name here" onChange={handleName} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" className="textInput" placeholder="Enter your password" onChange={handlePassword} required />
                </Form.Group>
                <Button type="button" className="cyber-button" onClick={loginUser}>
                    <div className="cyber-button__content">Login</div>
                    <span className="cyber-button__glitch"></span>
                    <span className="cyber-button__label">Gl1tch</span>
                </Button>
            </Form>
        </div>
    );
};

export default Login;