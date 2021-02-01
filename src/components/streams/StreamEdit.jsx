import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
  componentDidMount() {
    const { fetchStream: fetchStreamAction, match } = this.props;
    fetchStreamAction(match.params.id);
  }

  onSubmit = (formValues) => {
    const { editStream: editStreamAction, match } = this.props;
    editStreamAction(match.params.id, formValues);
  }

  render() {
    const { stream } = this.props;
    if (!stream) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          initialValues={_.pick(stream, 'title', 'description')}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({ stream: state.streams[ownProps.match.params.id] });

StreamEdit.defaultProps = {
  stream: null,
};

StreamEdit.propTypes = {
  fetchStream: PropTypes.func.isRequired,
  editStream: PropTypes.func.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  stream: PropTypes.instanceOf(Object),
};

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);
