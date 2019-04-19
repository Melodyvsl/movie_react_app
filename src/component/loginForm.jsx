import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/form';

class LoginForm extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {}, //inja obj estefade mikonim chon seda kardanesh asoontar az array hast ba [' '] mishe sedash kard ama array ro bayad ba find peyda kard
  };

  schema = {
    username: Joi.string().required(),
    password: Joi.string().required(),
  }; //joze library joi hast ke tarif mikonim har property bayad chi bashe

  doSubmit = () => {
    //call the server
    console.log('submitted');
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    ); //baraye password noe type ro password neveshtim chon nemikhaym text bashe haminam baes mishe ke pass namayesh dade nashe to browser
  }
}

export default LoginForm;

//value darone input baes shod ke dge inpute ma state khodesho ro nadashte bashe va connect she be stati ke inja darim

//this chera ba props naneveshtim baraye button...chon az form be onvane component stefade kardim?
