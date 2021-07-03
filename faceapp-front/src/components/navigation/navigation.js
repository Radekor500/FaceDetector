import React from 'react';
import { Link } from 'react-router-dom';
import './navigation.css'

const Navgation = ({onLoginCheck, isSignedIn, onSignOut}) => {
    if (isSignedIn) {
        return (
            <nav >
                <div className="navbar">
                    <Link to="/">
                        <p onClick={() => {onLoginCheck(false); onSignOut()}} id="pos" className='f3 link dim white underline pa3 pointer'>Sign Out</p>
                    </Link>
                    <Link to="/">
                        <p  className='f3 link dim white underline pa3 pointer'>Home</p>
                    </Link>
                    <Link to="/profile">
                        <p  className='f3 link dim white underline pa3 pointer'>Profile</p>
                    </Link>
                    <Link to="/history">
                        <p className='f3 link dim white underline pa3 pointer'>History</p>
                    </Link>
                </div>
            </nav>
        )
        
    } else {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Link to="/">
                    <p  className='f3 link dim white underline pa3 pointer'>Sign In</p>
                </Link>
                <Link to="/register">
                <p  className='f3 link dim white underline pa3 pointer'>Register</p>
                </Link>
            </nav>
        )
    }
    
    
    
}

export default Navgation;