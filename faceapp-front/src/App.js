
import { Component } from 'react';
import Navigation  from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imageform/imageform'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Rank from './components/rank/rank'
import Profile from "./components/Profile/profile";
import SignIn from './components/SignIn/SignIn'
import {BrowserRouter as Router, Link, Route, Switch, withRouter} from 'react-router-dom';
import Register from './components/Register/Register'
import History from './components/History/History'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Particles from 'react-particles-js';
import './App.css';



const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

let initialState = {
  isLoaded: false, 
  input: '',
  Url: '',
  box: {},
  isSignedIn: false,
  user : {
    id: '',
    email: '',
    name: '',
    entries: 0,
    joined: '',
    profilepic: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState
  }

  

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      email: data.email,
      name: data.name,
      entries: data.entries,
      joined: data.joined,
      profilepic: data.profilepic
    }})
  }

  
  
  
  
  calculateLocation = (data) => {
   const face = data.outputs[0].data.regions[0].region_info.bounding_box
   const image = document.getElementById('inputimage');
   const width = Number(image.width);
   const height = Number(image.height);
   return {
     bottom_row: face.bottom_row*height,
     top_row: face.top_row*height,
     left_col: face.left_col*width,
     right_col: face.right_col*width

   }

  }



  calculateBox = (box) => {
    this.setState({box:box})

  }

  loadAvatar = (path) => {
    this.setState(Object.assign(this.state.user, {profilepic: path})
    )
  }
  

  onInputChange = (event) => {
    if (this.state.isSignedIn === true) {
      this.setState({input: event.target.value})
    } else {
      this.setState({input: ''})
    }

  }

  onButtonSubmit = () => {
    this.setState({Url: this.state.input});
    fetch(`http://localhost:2000/imageurl`,{
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
              input: this.state.input
            })
    })
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch(`http://localhost:2000/image`,{
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id,
              image: this.state.input,
              date: new Date(),
              email: this.state.user.email
            })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries:count})
          )
        })
        .catch(console.log())
      }
      this.calculateBox(this.calculateLocation(response))
    })
    .catch(err=>(console.log(err)));
      
  }



  onLoginCheck = (status) => {
    if (!status) {
      this.setState(initialState)
      this.setState({isLoaded: true});
      
      
    } else if (status) {
      this.setState({isSignedIn: status})
      

    }
    
    
  }

  onSignOut = () => {
    fetch("http://localhost:2000/signout" , {
      method: 'get',
      headers: {'content-type': 'application/json'},
      credentials: "include"

    })
    .then(response => console.log(response.json()));
  }

  componentDidMount() {    
    fetch("http://localhost:2000/signin" , {
      method: 'get',
      headers: {'content-type': 'application/json'},
      credentials: "include"

    }).then(response => response.json())
      .then(data => {
        if (data.loggedIn) {
          this.loadUser(data.user);
          this.onLoginCheck(true);
          console.log(this.state);
          
        } else {
          this.onLoginCheck(false);
          console.log(this.state);
        }
        this.setState({isLoaded: true})
      })
    }
   
  render() {
    return (
      <Router>
        <div className="App">
          <Particles className='particles'
            params={particlesOptions}
          />
          <Navigation isSignedIn={this.state.isSignedIn} onLoginCheck={this.onLoginCheck} onSignOut={this.onSignOut}/>
            {this.state.isLoaded ?
            <div> 
             <Switch>
                <ProtectedRoute exact path="/" loginCheck={this.state.isSignedIn} component={Logo} component2={Rank} component3={ImageLinkForm} component4={FaceRecognition}
                user={this.state.user} entries={this.state.user.entries}
                onInputChange={this.onInputChange} onSubmit={this.onButtonSubmit}
                Url={this.state.Url} box={this.state.box}>
                </ProtectedRoute>
                <ProtectedRoute exact path="/profile" component={Profile} UserData={this.state.user} loadAvatar={this.loadAvatar} onLoginCheck={this.onLoginCheck} profilepic={this.state.user.profilepic} loginCheck={this.state.isSignedIn}>
                </ProtectedRoute>
                <ProtectedRoute exact path="/history" component={History} loginCheck={this.state.isSignedIn} UserID={this.state.user.id}>
                </ProtectedRoute>
                
                <Route exact path="/signin">
                  <SignIn loadUser={this.loadUser} onLoginCheck={this.onLoginCheck}/>
                  <Link to="/">dddddddd</Link>
                </Route>
                <Route exact path="/register">
                  <Register loadUser={this.loadUser} onLoginCheck={this.onLoginCheck}/>
                </Route>
              </Switch>
              </div>
              :(
                <h1>loading</h1>
              )
            }
        </div>
      </Router>
    )
  }
}


export default App;
