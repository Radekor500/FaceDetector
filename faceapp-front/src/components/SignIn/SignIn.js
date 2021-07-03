import React from 'react';
import { Redirect, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import './SignIn.css'

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            password: '',
            presist: false
        }
    }
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onCheckboxChange = (event) => {
        this.setState({presist: document.getElementById("remember").checked})
    }

    onSubmitSignIn = () => {
        console.log(this.state)
        fetch('http://localhost:2000/signin', {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.password,
                presist: this.state.presist
            }),
            credentials: 'include'
        }).then(response => response.json()).then(data => {
            if (data.id) {
                this.props.loadUser(data);
                // this.props.onRouteChange('home');
                this.props.onLoginCheck(true)
                this.props.history.push('/')
                
            } else {
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
                    <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                    </div>
                    <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                    </div>
                    <div className="mv3">
                        <label className="lh-copy" htmlFor="checkbox">Remember me </label>
                        <input id="remember" onChange={this.onCheckboxChange} className="mr2" type="checkbox" name="checkbox" value="Remember me"></input>
                    </div>
                    <p id="error"></p>
                </fieldset>
                <div className="">
                    <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
                </div>
                <div className="lh-copy mt3">
                    <Link to="/register">
                        <p className="f6 link dim black db pointer">Register</p>
                    </Link>
                </div>
                </div>
            </main>
        </article>
        )}
        
    }
    

export default withRouter(Signin);