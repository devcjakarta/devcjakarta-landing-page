import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid, Header } from 'semantic-ui-react'

import '../../styles/register/label-register.css'

class LabelRegister extends PureComponent {
  createMarkup = text => ({
    __html: text
  })

  render() {
    let {title, subTitle, location, dateStart, timeStart, timeFinish, description } = this.props
    return (
      <Grid.Column mobile={16} tablet={16} computer={8}>
        <div className="label-register">
          <Header as="h1">
            {title}
          </Header>
          <Header as="h2">
            {subTitle}
          </Header>
          <div className="event-description">
            <span dangerouslySetInnerHTML={this.createMarkup(description)} />     
          </div>
          <div className="event-location">
            <span dangerouslySetInnerHTML={this.createMarkup(location)} /> 
          </div>
          {
            (dateStart && timeStart && timeFinish) && (
              <div className="event-date">
                {`${dateStart} ${timeStart} ${timeFinish}`} 
              </div>
            )
          }
        </div>
      </Grid.Column>
    )
  }
}

LabelRegister.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  organizerName: PropTypes.string,
  organizerImg: PropTypes.string,
  sponsorGoldName: PropTypes.string,
  sponsorGoldImg: PropTypes.string,
  sponsorSilverImg: PropTypes.string,
  sponsorSilverName: PropTypes.string,
  supporter1Img: PropTypes.string,
  supporter2Img: PropTypes.string,
  communityPartnerImg1: PropTypes.string,
  communityPartnerImg2: PropTypes.string,
  communityPartnerImg3: PropTypes.string,
  communityPartnerImg4: PropTypes.string,
  communityPartnerImg5: PropTypes.string
}

export default LabelRegister
