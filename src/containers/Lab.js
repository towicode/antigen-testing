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
      tempCassetteBarcode: ''
    };

    this.buffer = ""
    this.bufferLen = 0;

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCassette = this.handleChangeCassette.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.verify = this.verify.bind(this);
    this.cancel = this.cancel.bind(this);
    this.reject = this.reject.bind(this);
    this.preject = this.preject.bind(this);
    this.rejectCancel = this.rejectCancel(this);
  }

  _handleKeyDown = (event) => {

    if (this.state.formState == 0)
      return;

    this.buffer = this.buffer + event.key;
    this.bufferLen++;

    if (event.key == "Enter"){

      if (this.bufferLen > 10){

        var myinput = document.getElementById("bcode99");
        if (myinput != null) {
          myinput.disabled = true;
          this.setState({cassetteBarcode: this.state.tempCassetteBarcode}, function() {

            //switch the focus to prevent a react bug.
            var altfocus = document.getElementById("altfocus");
            if (altfocus != null){
              altfocus.focus();
            }
            this.verify();
            this.buffer = "";
            this.bufferLen = 0;
            event.preventDefault();
          });
        }
      }

      if (this.buffer.startsWith("r")){
        this.preject();
        this.buffer = "";
        this.bufferLen = 0;
        event.preventDefault();
        return;
      }

      if (this.buffer.startsWith("y")){
        this.buffer = "";
        this.bufferLen = 0;
        this.reject();
        event.preventDefault();
        return;
      }

      if (this.buffer.startsWith("x")){
        if (this.state.formState == 1){
          this.buffer = "";
          this.bufferLen = 0;
          this.cancel();
          event.preventDefault();
          return;
        }
        if (this.state.formState == 2){
          this.buffer = "";
          this.bufferLen = 0;
          this.rejectCancel();
          event.preventDefault();
          return;
        }
      }
      this.buffer = "";
      this.bufferLen = 0;
    }
  }

  componentDidUpdate() {
    var myinput = document.getElementById("bcode99");
    if (myinput != null) {
      myinput.focus();
    }
    document.addEventListener("keydown", this._handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeyDown);
  }

  handleChange(event) {
    this.setState({ "barcode": event.target.value });
  }

  handleChangeCassette(event) {
    this.setState({ "tempCassetteBarcode": event.target.value });
  }

  handleSubmit(event) {


    console.log(this.state.formState);
    if (this.state.formState == 1){
      return;
    }
    var source = event.target || event.srcElement;
    console.log(source);

    console.log(event);
    console.trace();
    this.setState({ 'spinner': true });
    Auth.currentSession().then(async session => {
      const token = session.idToken.jwtToken;
      let myInit = {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        },
        body: { vialBarcode: this.state.barcode }
      }
      const result = await API.post("barcodeLookup", "/barcodeLookup", myInit);
      this.setState({ 'formState': 1, 'spinner': false });
      var cassetteBarcode = result.barcode;
      delete result.barcode;
      this.setState(result);
      this.setState({cassetteBarcode: cassetteBarcode})
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
        {this.state.spinner == true ? (
          <Spinner />
        ) : (
            <div>
              {this.state.formState == 0 ? (
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label><h2>Vial Barcode #</h2></label>
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
                          <th id="altfocus" scope="row" className="bg-primary">
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
                        <tr>
                          <th scope="row" className="bg-primary">
                            <h1 style={{ color: "white" }}>Cassette:</h1>
                          </th>
                          <td>
                            <h1>

                              {this.state.cassetteBarcode == null ?

                              <input
                                autoFocus
                                ref={input => input && input.focus()}
                                id="bcode99"
                                className="formatted-input form-control"
                                value={this.state.tempCassetteBarcode}
                                onChange={this.handleChangeCassette}
                              />
                              :
                              <div style={{width:"400px", "overflowX": "scroll", fontSize: "smaller"}}>{this.state.cassetteBarcode}</div>
                              }

                            </h1>
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

    this.setState({ 'spinner': true });
    Auth.currentSession().then(async session => {
      const token = session.idToken.jwtToken;
      if (this.state.cassetteBarcode == null){
        this.state.cassetteBarcode = this.state.tempCassetteBarcode;
      }
      let myInit = {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        },
        body: { cassetteBarcode: this.state.cassetteBarcode, vialBarcode: this.state.barcode, accepted: bool }
      }
      const result = await API.post("vialScannerStatus", "/vialScannerStatus", myInit);
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
        tempCassetteBarcode: ''
      });

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
    this.setState({ formState: 2 })
  }
  reject() {
    this.sendStatus(false);
  }
  cancel() {
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
      tempCassetteBarcode: ''
    });
  }


  rejectCancel() {
    this.setState({ formState: 1 })
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
