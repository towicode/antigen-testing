import React, { Component } from "react";
import CustomOAuthButton from '../CustomOAuthButton';
import { Auth, API } from 'aws-amplify';
import Spinner from 'react-spinkit';
import { FormattedInput } from "@buttercup/react-formatted-input";
import "../css/Home.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formState: 0,
            barcode: '',
            fname: '',
            lname: '',
            dob: '',
            uid: '',
            spinner: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.verify = this.verify.bind(this);
        this.cancel = this.cancel.bind(this);
        this.reject = this.reject.bind(this);
    }

    componentDidUpdate() {
        var myinput = document.getElementById("bcode99");
        if (myinput != null) {
            document.getElementById("bcode99").focus();
        }

    }

    handleChange(event) {
        this.setState({ "barcode": event })
    }

    handleSubmit(event) {
        this.setState({ 'spinner': true });
        Auth.currentSession().then(async session => {
            const token = session.idToken.jwtToken;
            let myInit = {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json'
                },
                body: { barcode: this.state.barcode }
            }
            const result = await API.post("barcodeLookup", "/barcodeLookup", myInit);
            this.setState({ 'formState': 1, 'spinner': false });
            this.setState(result);
        }).catch(error => {
            console.log("Error in Auth.currentSession: " + error);
            this.setState({ 'spinner': false });
            return [];
        });

        event.preventDefault();
    }


    renderDormForm() {
        const submitEnabled = true;
        return (
          <div>
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <h2>UArizona Vial Scanner</h2>
            {this.state.spinner == true ? (
              <Spinner />
            ) : (
              <div>
                {this.state.formState == 0 ? (
                  <form onSubmit={this.handleSubmit}>
                    <h4 className="my-5">Scan the barcode to confirm the contents</h4>
                    <div className="form-group">
                      <label>Barcode #</label>
                      <FormattedInput
                        id="bcode99"
                        className="formatted-input form-control"
                        value={this.state.barcode}
                        onChange={this.handleChange}
                      />
                    </div>
                    <input
                      disabled={!submitEnabled}
                      type="submit"
                      value="Submit"
                      className="btn btn-lg btn-blue mb-8 mt-4"
                    />
                  </form>
                ) : null}
        
                <div>
                  {this.state.formState == 1 ? (
                    <div>
                      <table className="table table-bordered">
                        <tbody>
                          <tr>
                            <th scope="row" className="bg-primary">
                              <h1 style={{ color: "white" }}>NetID:</h1>
                            </th>
                            <td>
                              <h1>{this.state.uid}</h1>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row" className="bg-primary">
                              <h1 style={{ color: "white" }}>Name:</h1>
                            </th>
                            <td>
                              <h1>
                                {this.state.lname}, {this.state.fname}
                              </h1>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row" className="bg-primary">
                              <h1 style={{ color: "white" }}>DOB:</h1>
                            </th>
                            <td>
                              <h1>
                                {this.state.dob.substring(0, 4)}/
                                {this.state.dob.substring(4, 6)}/
                                {this.state.dob.substring(6, 8)}
                              </h1>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div>
                        <div className="col-xs-4">
                          <button
                            onClick={this.verify}
                            type="button"
                            className="btn btn-btn btn-lg btn-blue mb-8 mt-4"
                          >
                            Verify
                          </button>
                        </div>
                        <div className="col-xs-4">
                          <button
                            onClick={this.cancel}
                            type="button"
                            className="btn btn-lg btn-gray mb-8 mt-4"
                          >
                            Cancel
                          </button>
                        </div>
                        <div className="col-xs-4">
                          <button
                            onClick={this.reject}
                            type="button"
                            className="btn btn-lg btn-red mb-8 mt-4"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        );
    }


    sendStatus(bool) {

        this.setState({ 'spinner': true });
        Auth.currentSession().then(async session => {
            const token = session.idToken.jwtToken;
            let myInit = {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json'
                },
                body: { barcode: this.state.barcode, accepted: bool }
            }
            const result = await API.post("vialScannerStatus", "/vialScannerStatus", myInit);
            this.setState({ barcode: '', fname: '', lname: '', dob: '', uid: '', formState: 0, spinner: false });

            if (bool){
                toast.success('🦄 Confirmed!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            } else {
                toast.error('🤬 Rejected!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }

        }).catch(error => {
            toast.info('Network issue, nothing was submitted!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            console.log("Error in Auth.currentSession: " + error);
            this.setState({ 'spinner': false });
            return [];
        });
    }

    verify(){
        this.sendStatus(true);
    }
    reject() {
        this.sendStatus(false);
    }
    cancel() {
        this.setState({ barcode: '', fname: '', lname: '', dob: '', uid: '', formState: 0, spinner: false });
    }

    renderLander() {
        return (
            <div className="lander">
                <h1>COVID-19 Vial Scanner</h1>
                <p>Log-in with your NetID.</p>
                <CustomOAuthButton variant="primary" size="lg">LOGIN</CustomOAuthButton>
            </div>
        );
    }

    renderUnauthorized() {
        return (
            <div className="lander">
                <h1>COVID-19 Vial Scanner</h1>
                <p>Log-in with your NetID</p>
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
