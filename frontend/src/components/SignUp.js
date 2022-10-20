import React from "react";
import { connect } from "react-redux";
import { SIGN_UP, VALIDATE_EMAIL } from "../actions/user";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const validate = nextState.email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    return !!validate;
  }

  componentDidUpdate() {
    this.props.VALIDATE_EMAIL("");
  }

  handleUser() {
    this.props.SIGN_UP(this.state);
  }

  render() {
    return (
      <>
        <h2>Sign Up</h2>
        <div>
          <label>Email</label>
          <input
            placeholder="your email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <p style={{ color: "red", margin: "0px" }}>
            {this.props.validateEmail}
          </p>
        </div>
        <div>
          <label>Password</label>
          <input
            placeholder="your password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>
        <button
          disabled={
            this.props.validateEmail !== "" || !this.state.password.length
          }
          onClick={() => this.handleUser()}
        >
          Sign Up
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    validateEmail: state.validateEmail,
    status: state.status,
  };
};

export default connect(mapStateToProps, { SIGN_UP, VALIDATE_EMAIL })(SignUp);
