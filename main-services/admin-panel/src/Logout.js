import React, { Component } from "react";
import { Navigate } from "react-router-dom";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = { logout: false };
  }

  async logout() {
    await this.props.keycloak.logout();
    this.setState({ logout: true });
  }

  render() {
    return this.state.logout ? (
      <Navigate to="/" />
    ) : (
      <button onClick={() => this.logout()}>Logout</button>
    );
  }
}
export default Logout;
