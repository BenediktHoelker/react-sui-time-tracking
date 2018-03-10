import React from "react";
import { Menu } from "semantic-ui-react";

const HorizontalMenu = props => (
  <Menu stackable>
    <Menu.Item icon="sidebar" onClick={props.handleSidebarIconClick} />
    <Menu.Item header as="h3">
      Zeiterfassung
    </Menu.Item>
    {props.user ? (
      <Menu.Item onClick={props.logout} position="right">
        {props.user.displayName}
        - Logout
      </Menu.Item>
    ) : (
      <Menu.Item onClick={props.login} position="right">
        Login
      </Menu.Item>
    )}
  </Menu>
);

export default HorizontalMenu;
