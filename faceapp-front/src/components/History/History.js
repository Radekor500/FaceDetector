import React from 'react';
import { Link } from 'react-router-dom';
import './History.css';

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:2000/history', {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                id: this.props.UserID
            })
        })
            .then(resp => resp.json())
            .then(history => {
                this.setState({
                    history: history
                })
                console.log(this.state)
            })
    }


    

    render() {
        return(
            <div>
                <div className="background">
                    <h1>History</h1>
                    <table>
                        <tr>
                            <th>Image</th>
                            <th>Date</th>
                            <th>entries</th>
                        </tr>
                        {this.state.history.map(( listValue, index ) => {
                            return (
                                <tr key={index}>
                                    <td><img className="tableImg" src={listValue.image}></img></td>
                                    <td>{listValue.date}</td>
                                    <td>{listValue.entries}</td>
                                </tr>
                            );
                            })}
                    </table>
                </div>
            </div>
        )
    }

}

export default History;