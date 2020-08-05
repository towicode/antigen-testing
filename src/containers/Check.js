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
            spinner: false,
            nextScan: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeNextScan = this.handleChangeNextScan.bind(this);
        this.again = this.again.bind(this);

    }

    _handleKeyDown = (event) => {

        if (this.state.formState == 0) 
            return;

        if (this.state.formState == 1){
            if (event.key == "Enter"){

                this.setState({barcode: this.state.nextScan}, function(){
                    this.handleSubmit(null);
                });
            }
        }

        if (event.altKey){
            if (event.key == 'v')
                this.verify();
            if (event.key == 'r')
                this.reject();
            if (event.key == 'c')
                this.cancel();
        }
    }

    componentDidUpdate() {
        var myinput = document.getElementById("bcode99");
        if (myinput != null) {
            document.getElementById("bcode99").focus();
        }
        document.addEventListener("keydown", this._handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this._handleKeyDown);
    }

    handleChange(event) {
        this.setState({ "barcode": event.target.value })
    }

    handleChangeNextScan(event){
        this.setState({ "nextScan": event.target.value })
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
                body: { cassetteBarcode: this.state.barcode }
            }
            const result = await API.post("barcodeLookup", "/barcodeLookup", myInit);
            this.setState({ 'formState': 1, 'spinner': false, 'nextScan': '' });
            this.setState(result);
        }).catch(error => {
            console.log("Error in Auth.currentSession: " + error);
            this.setState({ 'spinner': false });
            return [];
        });

        if (event == null)
            return;
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
            {this.state.spinner == true ? (
              <Spinner />
            ) : (
              <div>
                {this.state.formState == 0 ? (
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label><h2>Cassette Barcode #</h2></label>
                      <input
                        autoFocus 
                        ref={input => input && input.focus()}
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
                              <h2 style={{ color: "white" }}>NetID:</h2>
                            </th>
                            <td>
                              <h2>{this.state.uid}</h2>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row" className="bg-primary">
                              <h2 style={{ color: "white" }}>Name:</h2>
                            </th>
                            <td>
                              <h2>
                                {this.state.lname}, {this.state.fname}
                              </h2>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row" className="bg-primary">
                              <h2 style={{ color: "white" }}>DOB:</h2>
                            </th>
                            <td>
                              <h2>
                                {this.state.dob.substring(0, 4)}/
                                {this.state.dob.substring(4, 6)}/
                                {this.state.dob.substring(6, 8)}
                              </h2>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row" className="bg-primary">
                              <h2 style={{ color: "white" }}>Vial #:</h2>
                            </th>
                            <td>
                              <h2>
                                {this.state.barcode}
                              </h2>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row" className="bg-primary">
                              <h2 style={{ color: "white" }}>Next Scan:</h2>
                            </th>
                            <td>
                              <h2>
                              <input
                        autoFocus 
                        ref={input => input && input.focus()}
                        id="bcode99"
                        className="formatted-input form-control"
                        value={this.state.nextScan}
                        onChange={this.handleChangeNextScan}
                      />
                              </h2>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div>
                        <div className="col-xs-4">

                        </div>
                        <div className="col-xs-4">
                          <button
                            onClick={this.again}
                            type="button"
                            className="btn btn-lg btn-green mb-8 mt-4"
                          >
                            Again
                          </button>
                        </div>
                        <div className="col-xs-4">
   
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

    again(){
        this.setState({
            formState: 0,
            barcode: '',
            fname: '',
            lname: '',
            dob: '',
            uid: '',
            spinner: false,
            nextScan: ''
        });
    }


    renderLander() {
        return (
            <div className="lander">
                <h2>COVID-19 Vial Scanner</h2>
                <p>Log-in with your NetID.</p>
                <CustomOAuthButton variant="primary" size="lg">LOGIN</CustomOAuthButton>
            </div>
        );
    }

    renderUnauthorized() {
        return (
            <div className="lander">
                <h2>COVID-19 Vial Scanner</h2>
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
