import React, { Component } from "react";
import { Button, Jumbotron } from 'reactstrap';

import './about.component.css';

import { withRouter } from 'react-router-dom';

class AboutComponent extends Component {

    goHome() {
        this.props.history.push("/login");
    }

    render() {
        this.goHome = this.goHome.bind(this);
        return (
            <div className="about-container">
                <Jumbotron className="jumbotron-container about-jumbotron">
                    <div className="about-details-container">
                        <div className="eye"></div>
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
                    <p>
                        <span className="disclaimer-text">Disclaimer:</span> All data, including uploads as well as your registered account
                        are liable to be removed periodically as updates are made in the demo environment.
                        If you face registration issues after data has been cleared, clear your browser's local storage and try again.
                    </p>
                    <p className="learn-more">
                        Learn more: <a href="https://ethereum.org/">Ethereum</a> | <a href="https://ipfs.io/">IPFS</a>
                    </p>
                </Jumbotron>
            </div>
        );
    }
}

export default withRouter(AboutComponent);