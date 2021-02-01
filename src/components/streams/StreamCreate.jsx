/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {
  onSubmit = (formValues) => {
    const { createStream: createStreamAction } = this.props;
    createStreamAction(formValues);
  }

  render() {
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

StreamCreate.defaultProps = {
  createStream: null,
};

StreamCreate.propTypes = {
  createStream: PropTypes.func,
};

export default connect(null, { createStream })(StreamCreate);
