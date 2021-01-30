import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '562208709295-ben6dpi5m10h1hpdufaosinnffdk1hj6.apps.googleusercontent.com',
          scope: 'email',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();

          this.onAuthChange(this.auth.isSignedIn.get());

          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    const { signIn: signInAction, signOut: signOutAction } = this.props;
    if (isSignedIn) {
      signInAction(this.auth.currentUser.get().getId());
    } else {
      signOutAction();
    }
  }

  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    const { isSignedIn } = this.props;
    if (isSignedIn === null) {
      return null;
    } if (isSignedIn) {
      return (
        <button type="button" onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    }
    return (
      <button type="button" onClick={this.onSignInClick} className="ui green google button">
        <i className="google icon" />
        Sign In with Google
      </button>
    );
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

GoogleAuth.defaultProps = {
  isSignedIn: null,
};

GoogleAuth.propTypes = {
  isSignedIn: PropTypes.bool,
  signOut: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ isSignedIn: state.auth.isSignedIn });

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
