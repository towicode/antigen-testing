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
      dorm: '',
      phoneNumber: '',
      ethnicity: '', 
      race: '',
      sex: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value, [event.target.name + "ValidationError"]: event.target.value === "" ? "This question is required." : ""});
  }

  handleSubmit(event) {
    console.log(this.state)
    alert('Submitted!');
    event.preventDefault();
  }

  renderDormForm() {
    
    const { dorm, phoneNumber, ethnicity, race, sex } = this.state;
    const submitEnabled = phoneNumber.length === 10 && dorm.length && ethnicity.length && race.length && sex.length;

    const phoneNumberPattern = [
      { exactly: "(" },
      { char: /\d/, repeat: 3 },
      { exactly: ")" },
      { exactly: " " },
      { char: /\d/, repeat: 3 },
      { exactly: "-" },
      { char: /\d/, repeat: 4 },
    ];

    const dormOptions = [
      { value: '', display: '' }, 
      { value: 'Apache-Santa Cruz' , display: 'Apache-Santa Cruz'},
      { value: 'Arbol de la Vida' , display: 'Arbol de la Vida'},
      { value: 'Arizona-Sonora' , display: 'Arizona-Sonora'},
      { value: 'Babcock' , display: 'Babcock'},
      { value: 'Cochise' , display: 'Cochise'},
      { value: 'Coconino' , display: 'Coconino'},
      { value: 'Colonia de la Paz' , display: 'Colonia de la Paz'},
      { value: 'Coronado' , display: 'Coronado'},
      { value: 'Gila' , display: 'Gila'},
      { value: 'Graham-Greenlee' , display: 'Graham-Greenlee'},
      { value: 'Honors Village' , display: 'Honors Village'},
      { value: 'Hopi' , display: 'Hopi'},
      { value: 'Kaibab-Huachuca' , display: 'Kaibab-Huachuca'},
      { value: 'La Aldea Graduate Hall' , display: 'La Aldea Graduate Hall'},
      { value: 'Likins' , display: 'Likins'},
      { value: 'Manzanita-Mohave' , display: 'Manzanita-Mohave'},
      { value: 'Maricopa' , display: 'Maricopa'},
      { value: 'Navajo-Pinal' , display: 'Navajo-Pinal'},
      { value: 'Pima' , display: 'Pima'},
      { value: 'Posada San Pedro' , display: 'Posada San Pedro'},
      { value: 'Pueblo de la Cienega' , display: 'Pueblo de la Cienega'},
      { value: 'Villa Del Puente' , display: 'Villa Del Puente'},
      { value: 'Yavapai' , display: 'Yavapai'},
      { value: 'Yuma' , display: 'Yuma'},
    ];  

    const ethnicityOptions = [
      { value: '', display: '' }, 
      { value: 'H' , display: 'Hispanic'},
      { value: 'NH' , display: 'Non-Hispanic'},
      { value: 'P' , display: 'Prefer not to answer'},
    ];

    const raceOptions = [
      { value: '', display: '' }, 
      { value: 'N' , display: 'American Indian or Alaska Native'},
      { value: 'A' , display: 'Asian or Pacific Islander'},
      { value: 'B' , display: 'Black'},
      { value: 'W' , display: 'White'},
      { value: 'P' , display: 'Hawaiian or Pacific Islander'},
      { value: 'O' , display: 'Other'},
    ];

    const sexOptions =  [
      { value: '', display: '' }, 
      { value: 'M' , display: 'Male'},
      { value: 'F' , display: 'Female'},
      { value: 'P' , display: 'Prefer not to answer'},
    ];

    return (
      <form onSubmit={this.handleSubmit}>
        <h2>COVID-19 Antigen Test Registration</h2>
        <h4 className="my-5">Upon completion of this form you will receive a confirmation email with QR code for checking in to your test.  Please look for that email in your UArizona inbox.</h4>
        <div className="form-group">
          <label>Which residence hall do you live in? *</label>
          <select
            value={this.state.dorm}
            onChange={this.handleChange.bind(this)}
            name='dorm'
            className='form-control'>
            {dormOptions.map((option) => <option key={option.value} value={option.value}>{option.display}</option>)}
          </select>
          <span style={{color: 'red', marginTop: '5px'}}>
            {this.state.dormValidationError}
          </span>
        </div>
        <div className="form-group">
          <label>What is your cell phone number? *</label>
          <FormattedInput
            className="formatted-input form-control"
            format={phoneNumberPattern}
            value={this.state.phoneNumberDisplay}
            onChange={(formattedValue, raw) => { this.setState({phoneNumber: raw, phoneNumberDisplay: formattedValue}) }}
            placeholder="(xxx) xxx-xxxx"
            />
        </div>
        <div className="form-group">
          <label>What is your ethnicity? *</label>
          <select value={this.state.ethnicity} onChange={this.handleChange.bind(this)} name='ethnicity' className="form-control">
            {ethnicityOptions.map((option) => <option key={option.value} value={option.value}>{option.display}</option>)}
          </select>
          <span style={{color: 'red', marginTop: '5px'}}>
            {this.state.ethnicityValidationError}
          </span>
        </div>
        <div className="form-group">
          <label>What is your race? *</label>
          <select value={this.state.race} onChange={this.handleChange.bind(this)} name='race' className="form-control">
            {raceOptions.map((option) => <option key={option.value} value={option.value}>{option.display}</option>)}
          </select>
          <span style={{color: 'red', marginTop: '5px'}}>
            {this.state.raceValidationError}
          </span>
        </div>
        <div className="form-group">
          <label>What is your sex? *</label>
          <select value={this.state.sex} onChange={this.handleChange.bind(this)} name='sex' className="form-control">
            {sexOptions.map((option) => <option key={option.value} value={option.value}>{option.display}</option>)}
          </select>
          <span style={{color: 'red', marginTop: '5px'}}>
            {this.state.sexValidationError}
          </span>
        </div>
        <input disabled={!submitEnabled} type="submit" value="Submit" className="btn btn-lg btn-blue mb-8 mt-4"/>
      </form>
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
