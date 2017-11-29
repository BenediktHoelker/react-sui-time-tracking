import React, { Component } from 'react'
import { Header, Icon, Menu, Sidebar } from 'semantic-ui-react'

class SidebarLeftOverlay extends Component {
	render() {
		return (
			<Sidebar as={Menu} animation='push' width='thin' visible={this.props.visible} icon='labeled' vertical>
				{this.props.items.map((item) => {
					return (
						<Menu.Item
							name={item.project}>
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
