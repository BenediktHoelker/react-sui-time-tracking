import React from "react";
import { Header, Menu, Sidebar } from "semantic-ui-react";
import { Link } from "react-router-dom";

const openInNewTab = () => {
  const win = window.open(
    "http://35.226.8.204/elk/app/kibana#/dashboard/a94f2240-196f-11e8-81c7-13da0e6a4997?embed=true&_g=()",
    "_blank"
  );
  win.focus();
};

const SidebarLeftOverlay = props => (
  <Sidebar
    as={Menu}
    animation="push"
    width="thin"
    visible={props.visible}
    icon="labeled"
    vertical
  >
    {/* {props.records.map(record => {
      return (
        <Menu.Item
          id={record.id}
          key={record.id}
          name={record.project}
          active={props.activeItem === record.id}
          onClick={props.handleItemClick}
        >
          <Header as="h4">{record.project}</Header>
          <p>{record.description}</p>
        </Menu.Item>
        
      );
    })} */}

    <Menu.Item
      as={Link}
      to="/create"
      name="erfassung"
      active={props.activeItem === "erfassung"}
      onClick={props.handleItemClick}
    />
    <Menu.Item
      as={Link}
      to="/"
      name="auswertung"
      active={props.activeItem === "auswertung"}
      onClick={props.handleItemClick}
    />
    <Menu.Item
      as={Link}
      to="/calendar"
      name="Monatsuebersicht"
      active={props.activeItem === "tage"}
      onClick={props.handleItemClick}
    />
    <Menu.Item name="kibana" onClick={openInNewTab} text="Kibana" />
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
  </Sidebar>
);

export default SidebarLeftOverlay;
