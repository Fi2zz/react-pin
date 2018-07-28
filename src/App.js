import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import ReactPin from './ReactPin/'
class App extends Component {

    state = {
        pin: ""
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">React Pin</h1>
                </header>
                <br/>
                <ReactPin onFill={pin => this.setState({pin})}/>
                <p className="App-intro">
                    OnFill {this.state.pin}
                </p>
            </div>
        );
    }
}

export default App;
