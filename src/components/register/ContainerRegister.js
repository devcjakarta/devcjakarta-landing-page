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
      dateStart: "",
      location: "",
      description: "Driven by Local Communities. Developer Circles is a community-driven program that's free to join and open to any developer. Each Developer Circle is led by members of the local community who act as leads for the circle, organizing events offline and managing a local online Facebook community. Developer Circles are forums to share knowledge, collaborate, build new ideas, and learn about the latest technologies from Facebook and other industry leaders."
    }
  }

  componentDidMount(){
    API.get('/event/open')
    .then( response => { 
      if ((response.status === 200) && (response.data.code === 0 )){
        var desc = response.data.data.event.description;
        var venue = '<b>Venue : </b>' + response.data.data.event.location

        this.setState({
          show: true,
          id: response.data.data.event.id,
          title: response.data.data.event.title,
          subTitle: response.data.data.event.subtitle,
          location: venue,
          imageUrl: response.data.data.event.image_url,
          dateStart: response.data.data.event.date_start,
          timeStart: response.data.data.event.time_start,
          dateFinish: response.data.data.event.date_finish,
          timeFinish: response.data.data.event.time_finish,
          description: desc
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
          url={this.state.url}
          imageUrl={this.state.imageUrl}
          dateStart={this.state.dateStart}
          timeStart={this.state.timeStart}
          dateFinish={this.state.dateFinish}
          timeFinish={this.state.timeFinish}
          description={this.state.description}
        />
        { this.renderRegistrationForm() }
      </Grid>
    </Container>
    )
  }
}

export default ContainerRegister
