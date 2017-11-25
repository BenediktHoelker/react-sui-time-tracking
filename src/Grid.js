import React from 'react'
import { Grid, Header, Image, Segment } from 'semantic-ui-react'
import image from './paragraph.png'

const GridExampleVerticallyDivided = () => (
    <div>
        <Header as='h4' attached='top' block>
            Top Block Header
        </Header>
        <Segment attached>
            Segment
        </Segment>
        <Grid columns={2} stackable style={{ margin: '1em' }}>
            <Grid.Column>
                <Segment>Content</Segment>
            </Grid.Column>
            <Grid.Column>
                <Segment>Content</Segment>
            </Grid.Column>
            <Grid.Row columns={3}>
                <Grid.Column>
                    <Segment>Content</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment>Content</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment>Content</Segment>
                </Grid.Column>
            </Grid.Row>
            <Grid.Column width={10}>
                <Segment>Content</Segment>
            </Grid.Column>
            <Grid.Column width={6}>
                <Segment>Content</Segment>
            </Grid.Column>
        </Grid>
    </div>
)

export default GridExampleVerticallyDivided