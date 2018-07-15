import React, {Component} from 'react';
import ReactPin from  '../index.web'


class App extends Component {
    fullFill(result) {
        console.log("onFill", result)
    }

    render() {
        return (
            <div className="App">
                <ReactPin onFill={this.fullFill.bind(this)} size="6"/>
            </div>
        );
    }
}
export default App;
