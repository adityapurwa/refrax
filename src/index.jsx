import {Component} from "react";
import * as ReactDOM from "react-dom";
import * as React from "react";
import {RefraxModel, RefraxComponent} from "./refrax/refrax.jsx";

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <h1>
                Hello {this.props.model.name}
                <button onClick={() => this.props.model.name = 'Avaga'}>
                    Set Name
                </button>
                <div>
                    {this.props.model.messages[0].title}
                </div>
            </h1>
        )
    }

    componentDidMount() {
        setInterval(() => {
            this.props.model.name = "Random Name" + Math.random();
        }, 1000);
    }

}

const model = new RefraxModel({
    schema() {
        return {
            name: 'Aditya',
            age: 33,
            contact: {
                phone: '08123123123',
                email: 'mail@mail.com'
            },
            companies: {
                myriatek: {
                    website: 'https://myriatek.com'
                }
            },
            messages: [
                {
                    from: 'Hello',
                    title: 'Test Nested Schema'
                }
            ]
        }
    }
});

ReactDOM.render((
    <RefraxComponent model={model}>
        <App/>
    </RefraxComponent>
), document.getElementById("app"));