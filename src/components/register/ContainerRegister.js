import React, { Component } from 'react'
import { Container, Grid } from 'semantic-ui-react'

import LabelRegister from './LabelRegister'
import FormRegister from './FormRegister'

import {submitRegisterData} from '../../utils/register/methods'
import API from '../../api/config'

class ContainerRegister extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      id: 0,
      title: "Facebook Developer Circles Jakarta",
      subTitle: "Bring the world, closer together.",
      dateStart: "-",
      location: "lokasi:",
      description: "--"
    }
  }

  componentDidMount(){
    API.get('/event/open')
    .then( response => { 
      if ((response.status === 200) && (response.data.code === 0 )){
        console.log( response.data.data)
        this.setState({
          show: true,
          id: response.data.data.event.id,
          title: response.data.data.event.title,
          subTitle: response.data.data.event.subtitle,
          location: response.data.data.event.location,
          dateStart: response.data.data.event.date_start,
          description: response.data.data.event.description
        })
      }
    }).catch( (error) => {
      console.log("error",error)
    })
  }

  renderRegistrationForm(){
    if (this.state.show){
      return (
        <FormRegister eventId={this.state.id} submit={submitRegisterData} />
      )
    }else{
    }
  }

  render() {
    return (
    <Container>
      <Grid>
        <LabelRegister
          id={this.state.id}
          title={this.state.title}
          subTitle={this.state.subTitle}
          location={this.state.location}
          dateStart={this.state.dateStart}
          description={this.state.description}
        />
        { this.renderRegistrationForm() }
      </Grid>
    </Container>
    )
  }
}

export default ContainerRegister
