import React from 'react';

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} id={name} name={name} autoFocus className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div> // age error truthy bashe oon div namayesh dadde mishe age nabashe namayesh dade nemishe
  );
};

export default Input;

//ba rest dge lazem nist har bar ye property ezafe kardim biaym inja extractesh konim
//khoesh automatic ono migire
//chera tasmim gereft value va error va label bemone ???
