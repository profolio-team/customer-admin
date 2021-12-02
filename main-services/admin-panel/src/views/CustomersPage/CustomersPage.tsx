import React from "react";
import { ProfileBlock, RequestTool } from "../../components";
import Keycloak from "keycloak-js";
import keycloakConfig from "../../config/keycloakConfig";

interface ICustomersPageState {
  keycloak: any;
  authenticated: Boolean;
}

export class CustomersPage extends React.Component<{}, ICustomersPageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      keycloak: null,
      authenticated: false,
    };
  }

  componentDidMount() {
    const keycloak = Keycloak(keycloakConfig);
    keycloak.onTokenExpired = async () => {
      await keycloak.updateToken(2);
    };
    keycloak
      .init({ onLoad: "login-required", checkLoginIframe: false })
      .then((authenticated) => {
        this.setState({ keycloak: keycloak, authenticated: authenticated });
      });
  }

  render() {
    if (this.state.keycloak) {
      if (this.state.authenticated) {
        return (
          <div>
            <ProfileBlock keycloak={this.state.keycloak} />
            <RequestTool keycloak={this.state.keycloak} />
          </div>
        );
      } else {
        return <div>Unable to authenticate!</div>;
      }
    }
    return <div>Initializing Keycloak...</div>;
  }
}
