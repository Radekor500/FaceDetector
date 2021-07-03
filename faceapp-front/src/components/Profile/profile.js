import React from 'react';
import { Link } from 'react-router-dom';
import './profile.css';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.onUpload = this.onUpload.bind(this)
        this.openForm = this.openForm.bind(this)
        this.state = {
            password: ''
        }
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onDelete = () => {
        fetch('http://localhost:2000/delete',{
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                email: this.props.UserData.email,
                password: this.state.password
            }),
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    this.props.onLoginCheck(false)
                    alert(data);
                    this.props.history.push('/signin');
                    
                } else {
                    alert("Error")
                }
                
            })
    }

    openForm = () => {
        document.getElementById('options').remove();
        let form = document.querySelectorAll('.confirm')
        for (let i = 0; i < form.length; i++) {
            form[i].style.display = 'inline-block'
        }
    }

    onUpload = () => {
        const fileInput = document.querySelector('#fileinput') ;
        const formData = new FormData();
        formData.append('avatar', fileInput.files[0]);
        formData.append('id', this.props.UserData.id);
        fetch('http://localhost:2000/upload', {
            method: 'post',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            this.props.loadAvatar(data);
            alert('Profile pic updated');
        }
            )

    }


    render(){
        const {UserData} = this.props;
        const imgPath = 'http://localhost:2000/' + UserData.profilepic
        console.log(imgPath);
        return (
        <div>
            <div className='profileBackground'>
                <img className='profilePic' src={imgPath} alt=''></img>
                <h1>{UserData.name}</h1>
                <p className='member'>Member since: {UserData.joined} </p>
                <p>{UserData.email} </p>
                <p>Number of entries: {UserData.entries}</p>
                <form  method="post" encType="multipart/form-data">
                    <label className="filelabel" htmlFor="fileinput" >Choose profile pic</label>
                    <input type="file" name="avatar" id='fileinput' onChange={this.onUpload}/>
                 </form>
                 <form className="confirm">
                    <label htmlFor="password">Confirm your password</label>
                    <input onChange={this.onPasswordChange} type="password" name="password"></input>
                 </form>
                 <button style={{background:'#b10404', color:'white', marginTop: '5px', borderRadius: '5px'}} type='submit' onClick={this.onDelete} className='confirm'>Delete account</button> 
                 <button onClick={this.openForm} id='options' className='options'>Delete account</button> 
                
                <Link to='/'>
                    <p><button className='exit'>Go back</button></p> 
                </Link>
            </div>
        </div>

    )}

}

export default UserProfile;