import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

const HorizontalMenu = props => (
  <Menu stackable>
    <Menu.Item icon="sidebar" onClick={props.toggleVisibility} />
    <Menu.Item
      icon="external"
      onClick={props.handleVMenuItemClick}
    />
    <Menu.Item header as="h3">
      Arbeit
    </Menu.Item>
    <Menu.Item
      as={Link}
      to="/create"
      name="erfassung"
      active={props.hMenuActiveItem === "erfassung"}
      onClick={props.handleHMenuItemClick}
    />
    <Menu.Item
      as={Link}
      to="/"
      name="auswertung"
      active={props.hMenuActiveItem === "auswertung"}
      onClick={props.handleHMenuItemClick}
    />
    <Menu.Item
      as={Link}
      to="/calendar"
      name="tage"
      active={props.hMenuActiveItem === "tage"}
      onClick={props.handleHMenuItemClick}
    />
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
