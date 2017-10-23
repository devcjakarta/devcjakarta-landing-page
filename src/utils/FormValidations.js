import isEmpty from 'validator/lib/isEmpty'
import isEmail from 'validator/lib/isEmail'
import isMobilePhone from 'validator/lib/isMobilePhone'

export function validateRegisterData (data) {
  let errors = {}
  if (isEmpty(data.name)) errors.name = "Nama lengkap harus diisi"
  if (isEmpty(data.email)) errors.email = "E-mail harus diisi"
  if (!isEmail(data.email)) errors.email = (errors.email && errors.email.length) ? `${errors.email} dan valid` : "E-mail harus valid"
  if (isEmpty(data.phone)) errors.phone = "No telepon harus diisi"
  if (!(isMobilePhone(data.phone, 'id-ID') && (data.phone.length > 9) && (data.phone.length < 14))) errors.phone = (errors.phone && errors.phone.length) ? `${errors.phone} dan valid` : "No telepon harus valid"
  if (isEmpty(data.institution)) errors.institution = "Institusi/Lembaga/Kantor harus diisi"
  if (isEmpty(data.occupation)) errors.occupation = "Job Title/Major/Grade harus diisi"
  return errors
}
