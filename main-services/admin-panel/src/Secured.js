import React, { Component } from "react";
import ProfileBlock from "./ProfileBlock";
import QueryAPI from "./QueryAPI";
import Keycloak from "keycloak-js";
import keycloakConfig from "./config/keycloakConfig";

class Secured extends Component {
  constructor(props) {
    super(props);
    this.state = { keycloak: null, authenticated: false };
  }

  componentDidMount() {
    const keycloak = Keycloak(keycloakConfig);
    keycloak.onTokenExpired = async () => {
      await keycloak.updateToken();
    };
    keycloak
      .init({ onLoad: "login-required", checkLoginIframe: false })
      .then((authenticated) => {
        this.setState({ keycloak: keycloak, authenticated: authenticated });
      });
  }

  render() {
    if (this.state.keycloak) {
      if (this.state.authenticated)
        return (
          <div>
            <ProfileBlock keycloak={this.state.keycloak} />
            <QueryAPI keycloak={this.state.keycloak} />
          </div>
        );
      else return <div>Unable to authenticate!</div>;
    }
    return <div>Initializing Keycloak...</div>;
  }
}

export default Secured;
