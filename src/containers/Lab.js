import React, { Component } from "react";
import CustomOAuthButton from '../CustomOAuthButton';
import { Auth, API } from 'aws-amplify';
import Spinner from 'react-spinkit';
import { FormattedInput } from "@buttercup/react-formatted-input";
import "../css/Home.css";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formState: 0,
            barcode: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ "barcode": event })
    }

    handleSubmit(event) {
        console.log(this.state)
        this.setState({ 'formState': 1 }, () => {
            console.log(this.state)
            console.log(event)
            Auth.currentSession().then(session => {
                const token = session.idToken.jwtToken;
                let myInit = {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json'
                    },
                    body: { barcode: this.state.barcode }
                }
                return API.post("barcodeLookup", "/barcodeLookup", myInit)
                    .then(result => {
                        console.log(result);
                    });
            }).catch(error => {
                console.log("Error in Auth.currentSession: " + error);
                return [];
            });
        });
        event.preventDefault();
    }


    renderDormForm() {
        const submitEnabled = true;
        return (
            <div>
                <h2>UArizona Vial Scanner</h2>

                {this.state.formState == 0 ?
                    <form onSubmit={this.handleSubmit}>
                        <h4 className="my-5">Scan the barcode to confirm the contents, you must provide a secret key atleast once</h4>
                        <div className="form-group">
                            <label>Barcode #</label>
                            <FormattedInput
                                className="formatted-input form-control"
                                value={this.state.barcode}
                                onChange={this.handleChange}
                            />
                        </div>
                        <input disabled={!submitEnabled} type="submit" value="Submit" className="btn btn-lg btn-blue mb-8 mt-4" />
                    </form> : null}
                {this.state.formState == 1 ?
                    <div>
                        <dl>
                            <dt>
                                Description lists
                            </dt>
                            <dd>
                                A description list is perfect for defining terms.
                            </dd>
                        </dl>
                        <button type="button" className="btn btn-btn btn-lg btn-blue mb-8 mt-4">
                            Verify
                        </button>
                        <button type="button" className="btn btn-lg btn-red mb-8 mt-4">
                            Reject
                        </button>
                    </div>
                    : null}
            </div>
        );
    }

    renderLander() {
        return (
            <div className="lander">
                <h1>COVID-19 Antigen Test Registration</h1>
                <p>Log-in with your NetID to register for COVID-19 antigen testing.</p>
                <CustomOAuthButton variant="primary" size="lg">LOGIN</CustomOAuthButton>
            </div>
        );
    }

    renderUnauthorized() {
        return (
            <div className="lander">
                <h1>COVID-19 Antigen Test Registration</h1>
                <p>Log-in with your NetID to register for COVID-19 antigen testing.</p>
                <div className="alert alert-danger" role="alert">You do not have the appropriate permissions to use this application.</div>
            </div>
        );
    }

    render() {
        return (
            <div className="Home">
                {(this.props.authn === 'signedIn' && this.props.authz) && this.renderDormForm()}
                {(this.props.authn === 'signedIn' && !this.props.authz) && this.renderUnauthorized()}
                {(this.props.authn !== 'signedIn') && this.renderLander()}
            </div>
        );
    }
}
