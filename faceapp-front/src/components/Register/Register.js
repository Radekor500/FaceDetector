import React from 'react';
import './Register.css'
import { Redirect, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
var validator = require("email-validator");

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        
        if ( validator.validate(event.target.value) ) {
            this.setState({email: event.target.value})
        }
        else {
            this.setState({email: ''})
        }
        
    }

    onPasswordChange = (event) => {
        let passwordCheck = event.target.value;
        if (passwordCheck.length < 8) {
            this.setState({password: ''})
        } else {
            this.setState({password: event.target.value})

        }
        
    }

    onSubmitRegister = () => {
        fetch('http://localhost:2000/register', {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
            }).then(response => response.json()).then(data => {
                if (data.id) {
                    this.props.loadUser(data);
                    this.props.onLoginCheck(true);
                    this.props.history.push('/');
                }   else {
                    document.getElementById('email-address').value = '';
                    document.getElementById('password').value = '';
                    document.getElementById('error').value = '';
                    document.getElementById('error').innerHTML = 'Wrong credentials';
                    
                }
            })
        }

    render() {
        return (
            <article className=" form br3 ba near-white b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                            </div>
                            <p id="error"></p>
                        </fieldset>
                        <div className="">
                            <input onClick={this.onSubmitRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
                        </div>
                    </div>
                </main>
        </article>
        )
    }  
    
}

export default withRouter(Register);