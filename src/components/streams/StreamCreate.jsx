/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

class StreamCreate extends React.Component {
  onSubmit(formValues) {
    console.log(formValues);
  }

  renderInput({ input, label, meta }) {
    return (
      <div className="field">
        <label htmlFor="title" type="text">{label}</label>
        <input type="text" id="title" {...input} autoComplete="off" />
        <div>{meta.error}</div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)} className="ui form">
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field name="description" component={this.renderInput} label="Enter Description" />
        <button type="submit" className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }
  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }
  return errors;
};

StreamCreate.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'streamCreate',
  validate,
})(StreamCreate);
