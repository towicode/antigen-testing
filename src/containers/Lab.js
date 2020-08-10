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
      err: "",
      cassetteBarcode: null,
      tempCassetteBarcode: '',
      vialBarcodeFinal: '',
    };

    this.buffer = ""
    this.st0buffer = ""

    this.handleSubmit = this.handleSubmit.bind(this);
    this.verify = this.verify.bind(this);
    this.cancel = this.cancel.bind(this);
    this.reject = this.reject.bind(this);
    this.preject = this.preject.bind(this);
    this.resetAll = this.resetAll.bind(this);
    this.rejectCancel = this.rejectCancel.bind(this);
  }

  resetAll(){
    this.setState({
      formState: 0,
      barcode: '',
      fname: '',
      lname: '',
      dob: '',
      uid: '',
      spinner: false,
      err: "",
      cassetteBarcode: null,
      tempCassetteBarcode: '',
      vialBarcodeFinal: '',
    });
  }

  _handleKeyDown = (event) => {

    if (event.key == "Backspace") {

      this.st0buffer = "";
      this.buffer = "";
      this.setState({ barcode: "", tempCassetteBarcode: "", cassetteBarcode: "" });
      return;
    }

    if (event.key == "Enter") {

      if (this.state.formState == 0) {

        if (this.st0buffer.length > 5) {
          console.log("subbmiting with " + this.st0buffer);
          this.handleSubmit(this.st0buffer);
          this.st0buffer = "";
          this.setState({ barcode: "" });
        } else {
          this.st0buffer = "";
          this.setState({ barcode: "" });
          toast.info("Unknown enter press detected, resetting...", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }

      if (this.state.formState == 1) {

        if (this.buffer.length > 10) {
          this.verify();
          event.preventDefault();
          return;
        }

        if (this.buffer.startsWith("r")) {
          this.preject();
          event.preventDefault();
          return;
        }



        if (this.buffer.startsWith("x")) {
          if (this.state.formState == 1) {
            this.buffer = "";
            this.cancel();
            event.preventDefault();
            return;
          }

        }
        this.buffer = "";
        event.preventDefault();
        return;
      }

      console.log(this.state.formState);
      if (this.state.formState == 2) {

        console.log("HELLOO");
        console.log(this.buffer);

        if (this.buffer.startsWith("x")) {

          this.buffer = "";
          this.rejectCancel();
          event.preventDefault();
          return;
        }

        if (this.buffer.startsWith("y")) {
          this.reject();
          event.preventDefault();
          return;
        }
      }
    }

    if (event.key.length !== 1) {
      return;
    }

    console.log(event.key)

    if (this.state.formState == 0) {
      this.st0buffer += event.key;
      this.setState({ barcode: this.st0buffer });
      event.preventDefault();
      return;
    }
    if (this.state.formState == 1) {
      this.buffer += event.key;
      this.setState({ tempCassetteBarcode: this.buffer });
      event.preventDefault();
      return;
    }
    if (this.state.formState == 2) {
      this.buffer += event.key;
      this.setState({ tempCassetteBarcode: this.buffer });
      event.preventDefault();
      return;
    }
    event.preventDefault();
  }

  componentDidUpdate() {
    document.addEventListener("keydown", this._handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeyDown);
  }


  handleSubmit(mycode) {
    this.setState({ vialBarcodeFinal: mycode, 'spinner': true });
    Auth.currentSession().then(async session => {
      const token = session.idToken.jwtToken;
      let myInit = {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        },
        body: { vialBarcode: mycode }
      }
      const result = await API.post("barcodeLookup", "/barcodeLookup", myInit);
      this.setState({ 'formState': 1, 'spinner': false });
      var cassetteBarcode = result.barcode;
      delete result.barcode;
      this.setState(result);
      this.setState({ cassetteBarcode: cassetteBarcode })
    }).catch(error => {
      console.log("Error in Auth.currentSession: " + error);
      this.setState({ 'spinner': false });
      return [];
    });
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
                <div>
                  <div className="form-group">
                    <label><h2>Vial Barcode #</h2></label>
                    <input
                      autoFocus
                      ref={input => input && input.focus()}
                      id="bcode99"
                      className="formatted-input form-control"
                      value={this.state.barcode}
                    // onChange={this.handleChange}
                    />
                  </div>
                  <button
                    type="submit"
                    value="Submit"
                    className="btn btn-lg btn-blue mb-8 mt-4"
                  > Submit </button>
                </div>
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
                          <th id="altfocus" scope="row" className="bg-primary">
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
                            <h2 style={{ color: "white" }}>Cassette:</h2>
                          </th>
                          <td>
                            <h2>

                              {this.state.cassetteBarcode == null ?

                                <input
                                  autoFocus
                                  ref={input => input && input.focus()}
                                  id="bcode99"
                                  className="formatted-input form-control"
                                  value={this.state.tempCassetteBarcode}
                                />
                                :
                                <div style={{ width: "400px", "overflowX": "scroll", fontSize: "smaller" }}>{this.state.cassetteBarcode}</div>
                              }

                            </h2>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div>
                      <div className="col-xs-4" style={{ textAlign: "center" }}>
                        <div className="dropdown" style={{ marginTop: "1.5rem !important" }}>
                          <button className="btn btn-default dropdown-toggle" style={{ marginTop: "1.5em", height: "50px" }} type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            More...
                          <span className="caret"></span>
                          </button>
                          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                            <li><a onClick={this.cancel} href="#">Cancel</a></li>
                            <li><a onClick={this.preject} href="#">Reject</a></li>
                            <li role="separator" className="divider"></li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-xs-4" style={{ textAlign: "center" }}>
                      </div>
                      <div className="col-xs-4">
                        <button
                          onClick={this.verify}
                          type="button"
                          style={{ color: "white", background: "green" }}
                          className="btn btn-btn btn-lg btn-blue mb-8 mt-4"
                        >
                          Verify
                          </button>
                      </div>
                    </div>
                  </div>
                ) : null}
                {this.state.formState == 2 ? <div>
                  <h2> Confirm Reject? </h2>
                  <div className="col-xs-2">
                  </div>
                  <div className="col-xs-4" style={{ textAlign: "center" }}>
                    <button
                      onClick={this.reject}
                      type="button"
                      className="btn btn-lg btn-red mb-8 mt-4"
                    >
                      Reject
                    </button>
                  </div>
                  <div className="col-xs-4" style={{ textAlign: "center" }}>
                    <button
                      onClick={this.rejectCancel}
                      type="button"
                      className="btn btn-lg btn-gray mb-8 mt-4"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="col-xs-2">
                  </div>
                </div> : null}
              </div>
            </div>
          )}
      </div>
    );
  }
  sendStatus(bool) {
    var cassette = this.buffer == "" ? this.state.cassetteBarcode : this.buffer;
    this.setState({ 'spinner': true });
    Auth.currentSession().then(async session => {
      const token = session.idToken.jwtToken;
      let myInit = {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        },
        body: { cassetteBarcode: cassette, vialBarcode: this.state.vialBarcodeFinal, accepted: bool }
      }
      this.buffer = "";
      await API.post("vialScannerStatus", "/vialScannerStatus", myInit);
      this.resetAll();
      if (bool) {
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

    }).catch(e => {

      if (e.response.status === 400) {
        console.log(e.response.data); // Data contains your body

        toast.info(e.response.data.error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.info("network error", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      this.setState({ 'spinner': false });
      return [];
    });
  }

  verify() {
    this.sendStatus(true);
  }
  preject() {
    this.buffer = "";
    this.setState({ formState: 2 })
  }
  reject() {
    this.sendStatus(false);
  }
  cancel() {
    this.resetAll();
  }
  rejectCancel() {
    this.setState({ formState: 1 })
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
