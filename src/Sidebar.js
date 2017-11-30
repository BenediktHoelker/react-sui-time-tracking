import React, { Component } from 'react'
import { Header, Icon, Menu, Sidebar } from 'semantic-ui-react'

class SidebarLeftOverlay extends Component {

	render() {
		return (
			<Sidebar as={Menu} animation='push' width='thin' visible={this.props.visible} icon='labeled' vertical>
				{this.props.items.map((item) => {
					return (
						<Menu.Item
							key={item.id}
							name={item.project}
							active={this.props.activeItem === item.id}
							onClick={this.props.handleItemClick.bind(this, item.id)}>
							<Header as='h4'>{item.project}</Header>
							<p>{item.description}</p>
						</Menu.Item>
					)
				})}
			</Sidebar>
		)
	}
}

export default SidebarLeftOverlay
