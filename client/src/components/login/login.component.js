import React, { Component } from "react";
import { Button, Form, FormGroup, Input, FormText } from 'reactstrap';

import { If, Else } from 'rc-if-else';

import './login.component.css';
import EthService from "../../service/eth.service";

class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alias: '',
            password: '',
            incorrectPassword: false
        };
    }

    async acceptPassword() {
        try {
            this.setState({ incorrectPassword: false });
            await EthService.initVault(this.state.password, this.state.alias);
        } catch (err) {
            console.log(err);
            this.setState({ incorrectPassword: true });
        }
    }

    clearPasswordCorrectness() {
        this.setState({ incorrectPassword: false });
    }

    setPassword(e) {
        this.setState({ password: e.target.value })
    }

    setAlias(e) {
        this.setState({ alias: e.target.value })
    }

    render() {
        this.acceptPassword           = this.acceptPassword.bind(this);
        this.clearPasswordCorrectness = this.clearPasswordCorrectness.bind(this)
        this.setPassword              = this.setPassword.bind(this);
        this.setAlias                 = this.setAlias.bind(this);
        return (
            <div className="login-component-container">
                <div className="login-component-name-container">
                    Iris
                </div>
                {/* TODO <div className="eye"></div> */}
                <div className="login-form-container">
                    <Form>
                        <FormGroup className="iris-form-group">
                            <Input color="primary" className="shadow-sm password-input" type="text" name="password" id="password" placeholder="Enter alias" 
                                   onChange={this.setAlias}/>
                            <Input color="primary" className="shadow-sm password-input" type="password" name="password" id="password" placeholder="Enter password" 
                                   onChange={this.setPassword} onChange={this.clearPasswordCorrectness}/>
                            <Button className="login-submit-button" 
                                    onClick={this.acceptPassword} 
                                    onKeyDown={event => {
                                        if (event.key === 'Enter') {
                                            this.acceptPassword()
                                        }
                                    }}>
                                        Submit
                            </Button>
                            <FormText className="login-form-text">
                                <If condition={this.state.incorrectPassword === false}>
                                    Enter a password to login to your existing account, or a new password to create a new account.
                                    A user can only create one account per device.
                                    <Else>
                                        <span>Incorrect password for this device.</span>
                                    </Else>
                                </If>
                            </FormText>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        );
    }
}

export default LoginComponent;