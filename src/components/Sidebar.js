import React from "react";
import { Icon, Menu, Sidebar } from "semantic-ui-react";
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
    animation="slide along"
    width="thin"
    visible={props.sidebarIsVisible}
    icon="labeled"
    vertical
    inverted
  >
    <Menu.Item
      as={Link}
      to="/create"
      name="erfassung"
      active={props.activeItem === "erfassung"}
      onClick={props.handleItemClick}
    >
      <Icon name="record" />
      Erfassung
    </Menu.Item>
    <Menu.Item
      as={Link}
      to="/"
      name="auswertung"
      active={props.activeItem === "auswertung"}
      onClick={props.handleItemClick}
    >
      <Icon name="list layout" />
      Auswertung
    </Menu.Item>
    <Menu.Item
      as={Link}
      to="/calendar"
      name="monatsuebersicht"
      active={props.activeItem === "monatsuebersicht"}
      onClick={props.handleItemClick}
    >
      <Icon name="calendar" />
      Monatsübersicht
    </Menu.Item>
    <Menu.Item name="kibana" onClick={openInNewTab} text="Kibana">
      <Icon name="dashboard" />
      Dashboard
    </Menu.Item>
  </Sidebar>
);

export default SidebarLeftOverlay;
