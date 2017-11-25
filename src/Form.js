import React from 'react'
import { Form, Header, Segment } from 'semantic-ui-react'

const FormExampleWidthField = () => (
  <Form>
    <Form.Group >
      <Form.Input placeholder='Projekt' width={3} />
      <Form.Input placeholder='Teilprojekt' width={3} />
      <Form.Input placeholder='Arbeitspaket' width={3} />
      <Form.Input placeholder='Tätigkeit' width={3} />
      <Form.Input placeholder='Beschreibung' width={3} />
    </Form.Group>
    <Form.Group>
      <Form.Input placeholder='Datum' width={6} placeholder="Datum" />
      <Form.Input placeholder='Beginn' width={5} placeholder="Beginn" />
      <Form.Input placeholder='Ende' width={5} placeholder="Ende" />
    </Form.Group>
    <Form.Button>Abschicken</Form.Button>
  </Form>
)

export default FormExampleWidthField
