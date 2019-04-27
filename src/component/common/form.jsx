import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Select from './select';

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, { abortEarly: false }); //abort ham errore bydefulte khode in librarye ke pakkeshkardim injori
    console.log(result);

    const errors = {};
    const { data } = this.state;

    //if (data.username.trim() === '') errors.username = 'Username is required.'; //inja mige age ke filled khali bood in property be wrror ezafe she
    //if (data.password.trim() === '') errors.password = 'Password is required.';

    return Object.keys(errors).length === 0 ? null : errors; // inja ham property haye error ro migire to ye array gharar mide mige age length 0 bood null return she gheyre in soorat errore marbote
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null; //age error true bood miad payame defulte khode joi ro chap mikone age nabod null mishe
  };

  handleSubmit = e => {
    //disable sending this post this form to server
    e.preventDefault();

    //validate data and if there is a error, returns it
    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} }); //bade anjame fn validate age tosh chizi bod ke oono namayesh mide ama age nabood jaye null bayad in obj khali gharar begire//errors property age truty bood va daronesh chizi bood ke hich age nabood bayad ye obj khali tosh bashe chonnemitone null bashe va baese ijade error mishe
    if (errors) return;

    this.doSubmit();
  }; //ye event object be onvane argument gereft va ba in fn az reloade kamele page jologiri mikoni//dar vaghe injori az reloade kamele page jologiri mishe

  handleChange = ({ currentTarget: input }) => {
    //validate the input field after typing
    const errors = { ...this.state.errors }; //obj errors ro clone kardim
    const errorMessage = this.validateProperty(input); //mikhaym error zamani namayesh dade she ke darim chizi minevisim fn validate maleo kole safas
    if (errorMessage) errors[input.name] = errorMessage;
    //age errormessage truthy bood dar obj errors esme inpute morede nazar(masalan username) ro gharar bede va ron ro dar errormessage zakhire kon
    else delete errors[input.name]; //age errori nabod az errors in property pak she

    //after typing value, change the state
    const data = { ...this.state.data }; //inja bma state ro clone mikonim taghirat ro anjam midim bad react khodesh state aslio avaz mikone
    data[input.name] = input.value; //inja ham migim username accounte clone shodaro begir bad valueye current targetemon ro ke input hast ro behesh ekhtesas bede

    this.setState({ data, errors }); //new data obj
  }; //in kar ham baraye ine ke vaghti ye chizi ro too input neveshtim ststae inja update beshe va hamono neshon bede(single source of truth)
  //inja jaye e mishe kolan currentTarget ro be onvane arg gereft chon az ye property bishtar estefade nakardim az e obj pas khode hamon ro arg migirim

  renderButton(label) {
    return (
      <button
        disabled={this.validate()} //in bayad ya true bashe ya false...in fn ham ya null ro return mikone ya ye obj ba yek ya chandta error ro...age null she ke falsye engar in fn mishe false pas yani error nadarim dokme kar mikone ama age obj bashe obj considered truthy pas ture be hesab miad va disable mishe dokme
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderInput(name, label, type = 'text') {
    //be type defult dadim ke text bashe ama dar loginform baraye password type ro password gozashtim
    const { data, errors } = this.state;
    return (
      <Input
        type={type} //noe valui ke toye inputaro namayesh mide
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
