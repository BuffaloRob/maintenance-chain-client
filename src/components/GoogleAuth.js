import React from 'react';

class GoogleAuth extends React.Component {

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '915420385972-j4d1d449764jfasb8jagcufj4jd71h7h.apps.googleusercontent.com',
        scope: 'email'
      });
    });
  }

  render() {
    return (
      <div>
        GoogleAuth
      </div>
    );
  };
}

export default GoogleAuth;