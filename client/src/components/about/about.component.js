import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Button, Jumbotron } from 'reactstrap';

import './about.component.css';
import FlipCardComponent from "../flip-card/flip-card.component";

class AboutComponent extends Component {

    constructor(props) {
        super(props);
    }

    goHome() {
        this.props.action(false);
    }

    render() {
        this.goHome = this.goHome.bind(this);
        return (
            <div className="about-container">
                <Jumbotron className="jumbotron-container">
                    <div className="about-details-container">
                        {/* <div className="eye"></div> */}
                        <h2>
                            IRIS
                        </h2>
                        <p>Free, secure, encrypted and decentralized file sharing, powered by IPFS and Ethereum.</p>
                    </div>
                    <Button className="about-btn" color="primary" onClick={this.goHome}>
                        Try the demo
                    </Button>
                    <a href="https://github.com/driemworks/iris">
                        <Button className="about-btn" color="primary">
                            View on Github
                        </Button>
                    </a>
                    <p className="learn-more">
                        Learn more: <a href="https://ethereum.org/">Ethereum</a> | <a href="https://ipfs.io/">IPFS</a>
                    </p>
                </Jumbotron>
            </div>
        );
    }
}

ReactDOM.render(<FlipCardComponent />, document.getElementById('root'));

export default AboutComponent;