import React from 'react';

//TODO: Check to make sure the client id used on line 8 doesn't need to be hidden in some way


// Go to lecture 211

class GoogleAuth extends React.Component {

  state = { isSignedIn: null };

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '915420385972-j4d1d449764jfasb8jagcufj4jd71h7h.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
      });
    });
  }

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return <div>I don't know</div>;
    } else if (this.state.isSignedIn) {
      return <div>I am signed in</div>;
    } else {
      return <div>I am not signed in</div>;
    }
  }

  render() {
    return (
      <div>
        {this.renderAuthButton()}
      </div>
    );
  };
}

export default GoogleAuth;