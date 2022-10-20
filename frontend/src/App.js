import React from "react";
import { connect } from "react-redux";
import { SIGN_IN, SIGN_UP } from "./actions/user";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="app">
          <h2>{this.props.error}</h2>

          <p style={{ color: "red", margin: "0px" }}>
            {this.props.validateEmail}
          </p>
          {this.props.status === "registered" ? (
            <SignIn />
          ) : this.props.status === "logged_in" ? (
            <h2>Login was successful!</h2>
          ) : (
            <SignUp />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.status,
    error: state.error,
  };
};

const mapDispatchToProps = {
  SIGN_IN,
  SIGN_UP,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
