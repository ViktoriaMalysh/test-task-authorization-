import React from "react";
import { connect } from "react-redux";
import { SIGN_IN, VALIDATE_EMAIL } from "../actions/user";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
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
    this.props.SIGN_IN(this.state);
  }

  render() {
    return (
      <>
        <h2>Sign In</h2>
        <div>
          <label>Email</label>
          <input
            placeholder="your email"
            value={this.state.email}
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
          Sign In
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    validateEmail: state.validateEmail,
    email: state.email,
  };
};

export default connect(mapStateToProps, { SIGN_IN, VALIDATE_EMAIL })(SignIn);
