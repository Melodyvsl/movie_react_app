import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './common/input';

class LoginForm extends Component {
  state = {
    account: { username: '', password: '' },
    errors: {}, //inja obj estefade mikonim chon seda kardanesh asoontar az array hast ba [' '] mishe sedash kard ama array ro bayad ba find peyda kard
  };

  schema = {
    username: Joi.string().required(),
    password: Joi.string().required(),
  }; //joze library joi hast ke tarif mikonim har property bayad chi bashe

  validate = () => {
    const result = Joi.validate(this.state.account, this.schema, { abortEarly: false }); //abort ham errore bydefulte khode in librarye ke pakkeshkardim injori
    console.log(result);

    const errors = {};
    const { account } = this.state;

    if (account.username.trim() === '') errors.username = 'Username is required.'; //inja mige age ke filled khali bood in property be wrror ezafe she
    if (account.password.trim() === '') errors.password = 'Password is required.';

    return Object.keys(errors).length === 0 ? null : errors; // inja ham property haye error ro migire to ye array gharar mide mige age length 0 bood null return she gheyre in soorat errore marbote
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} }); //bade anjame fn validate age tosh chizi bod ke oono namayesh mide ama age nabood jaye null bayad in obj khali gharar begire//errors property age truty bood va daronesh chizi bood ke hich age nabood bayad ye obj khali tosh bashe chonnemitone null bashe va baese ijade error mishe
    if (errors) return;

    console.log('submitted');
  }; //ye event object be onvane argument gereft va ba in fn az reloade kamele page jologiri mikoni//dar vaghe injori az reloade kamele page jologiri mishe

  validateProperty = ({ name, value }) => {
    if (name === 'username') {
      if (value.trim() === '') return 'Username is required.';
    }
    if (name === 'password') {
      if (value.trim() === '') return 'Password is required.';
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors }; //obj errors ro clone kardim
    const errorMessage = this.validateProperty(input); //mikhaym error zamani namayesh dade she ke darim chizi minevisim fn validate maleo kole safas
    if (errorMessage) errors[input.name] = errorMessage;
    //age errormessage truthy bood dar ob errors esme inpute morede nazar(masalan username) ro gharar bede va ron ro dar errormessage zakhire kon
    else delete errors[input.name]; //age errori nabod az errors in property pak she

    const account = { ...this.state.account }; //inja bma state ro clone mikonim taghirat ro anjam midim bad react khodesh state aslio avaz mikone
    account[input.name] = input.value; //inja ham migim username accounte clone shodaro begir bad valueye current targetemon ro ke input hast ro behesh ekhtesas bede
    this.setState({ account, errors }); //new account obj
  }; //in kar ham baraye ine ke vaghti ye chizi ro too input neveshtim ststae inja update beshe va hamono neshon bede(single source of truth)
  //inja jaye e mishe kolan currentTarget ro be onvane arg gereft chon az ye property bishtar estefade nakardim az e obj pas khode hamon ro arg migirim

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          />

          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;

//value darone input baes shod ke dge inpute ma state khodesho ro nadashte bashe va connect she be stati ke inja darim
