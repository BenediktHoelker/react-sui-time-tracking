import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

const openInNewTab = () => {
  const win = window.open(
    "http://35.226.8.204/elk/app/kibana#/dashboard/a94f2240-196f-11e8-81c7-13da0e6a4997?embed=true&_g=()",
    "_blank"
  );
  win.focus();
};

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
