import React from "react";

//need to import Connect() and wire up to action creator

class Home extends React.Component {

  onSubmit = formValues => {
    this.props.createItem(formValues);
  }

  render() {
    return (
      <div>
        <h3>Welcome To Home Page</h3>
        
      </div>
    );
  }
}

export default Home;
