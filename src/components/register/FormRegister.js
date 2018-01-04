import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid, Card, Form, Input, Button } from 'semantic-ui-react'
import Recaptcha from 'react-grecaptcha'

import '../../styles/register/form-register.css'

import InlineError from '../messages/InlineError'
import ButtonSocial from '../buttons/ButtonSocial'

import {validateRegisterData} from '../../utils/FormValidations'
import {displayMessage} from '../../utils/register/methods'

class FormRegister extends PureComponent {
  initialState = {
    name: '',
    email: '',
    phone: '',
    title: '',
    description: '',
    institution: '',
    occupation: '',
    url: 'http://www.kioss.com',
    tech: 'Facebook Stack'
  }
  state = {
    data: {
      ...this.initialState
    },
    useFacebook: true,
    loading: false,
    canRegister: false,
    response: {},
    errors: {}
  }

  handleInputChange = ({target}) => {
    let {name, value} = target
    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [name]: value.length === 0
      }
    })
  }

  onSubmit = () => {
    const errors = validateRegisterData(this.state.data)
    this.setState({ errors, response: {} })
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true })
      this.props.submit(this.state.data)
        .then(res => {
          this.setState({
            loading: false,
            data: this.initialState,
            response: res.data,
            useFacebook: false
          })
        })
        .catch(response => {
          this.setState({
            loading: false,
            response
          })
        })
    }
  }

  socialLogin = () => {
    this.setState({
      loading: true
    })
  }

  registerFacebookSuccess = ({_profile}) => {
    let {name, email} = _profile
    document.getElementById("btnRegister").disabled = false;
    this.setState({
      data: {
        ...this.state.data,
        name,
        email
      },
      errors: {
        ...this.state.errors,
        name: '',
        email: ''
      },
      useFacebook: true,
      canRegister: true,
      loading: false
    })
  }

  registerFacebookFailure = response => {
    this.setState({
      loading: false,
      response
    })
  }

  render() {
    const { data, errors, useFacebook, loading, response, canRegister } = this.state
    let verifyCallback = response => console.log(response)
    return (
      <Grid.Column mobile={16} tablet={16} computer={8} style={styles}>
        <Card fluid>
          <Card.Content>
            <h2>Registration</h2>
            <Form loading={loading}>
              <Form.Field>
                {
                  this.state.useFacebook && (
                    <ButtonSocial
                      provider="facebook"
                      appId="124764001615637"
                      onClick={this.socialLogin}
                      onLoginSuccess={this.registerFacebookSuccess}
                      onLoginFailure={this.registerFacebookFailure}>
                        Connect with Facebook
                    </ButtonSocial>
                  )
                }
              </Form.Field>
              <Form.Field required error={!!errors.name}>
                <label htmlFor="name">Nama Lengkap</label>
                <Input type="text"
                  name="name"
                  onChange={this.handleInputChange}
                  value={data.name}
                  disabled={useFacebook}
                  placeholder="Masukan nama lengkap" />
                { errors.name && <InlineError text={errors.name} />}
              </Form.Field>
              <Form.Field required error={!!errors.email}>
                <label htmlFor="email">E-mail</label>
                <Input type="email"
                  name="email"
                  onChange={this.handleInputChange}
                  value={data.email}
                  disabled={useFacebook}
                  placeholder="Masukan alamat e-mail" />
                { errors.email && <InlineError text={errors.email} />}
              </Form.Field>
              <Form.Field required error={!!errors.phone}>
                <label htmlFor="phone">No. Telepon</label>
                <Input type="text"
                  name="phone"
                  onChange={this.handleInputChange}
                  value={data.phone}
                  disabled={!canRegister}
                  placeholder="Masukan nomor telepon" />
                { errors.phone && <InlineError text={errors.phone} />}
              </Form.Field>
              <Form.Field required error={!!errors.institution}>
                <label htmlFor="institution">Institusi/Lembaga/Kantor</label>
                <Input type="text"
                  name="institution"
                  onChange={this.handleInputChange}
                  value={data.institution}
                  disabled={!canRegister}
                  placeholder="Institusi/Lembaga/Kantor" />
                { errors.institution && <InlineError text={errors.institution} />}
              </Form.Field>
              <Form.Field required error={!!errors.occupation}>
                <label htmlFor="occupation">Job Title/Major/Grade</label>
                <Input type="text"
                  name="occupation"
                  onChange={this.handleInputChange}
                  value={data.occupation}
                  disabled={!canRegister}
                  placeholder="Job Title/Major/Grade" />
                { errors.occupation && <InlineError text={errors.occupation} />}
              </Form.Field>
              <Recaptcha sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                callback={verifyCallback}
                locale="id-ID" />
              {
                displayMessage(response)
              }
              <Form.Field>
                <Button id="btnRegister" disabled={!canRegister} positive onClick={this.onSubmit}>Register</Button>
              </Form.Field>
            </Form>
          </Card.Content>
        </Card>
      </Grid.Column>
    )
  }
}

FormRegister.propTypes = {
  submit: PropTypes.func.isRequired
}

const styles = {
  column: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default FormRegister
