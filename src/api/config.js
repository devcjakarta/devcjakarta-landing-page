import {create} from 'axios'

const API = create({
  baseURL: 'http://local-bot.fastplaz.com/hackaton-services/public_html/',
  headers: {
  	'content-type': 'multipart/form-data'
  }
})

export default API
