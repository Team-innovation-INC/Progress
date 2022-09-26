// ** React Imports
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next' // useTranslation for language change

// ** Third Party Components
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ChevronLeft, ChevronRight } from 'react-feather'

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback } from 'reactstrap'

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'
import { ThemeButton } from '../../../../components/logoAvatar'
import { Link, useNavigate } from 'react-router-dom'

const defaultValues = {
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  check: false
}

const AccountDetails = ({ stepper }) => {
  const { t } = useTranslation() // useTranslation for language change
  // ** navigate 
  const navigate = useNavigate()
   // validation schema for data
  const SignupSchema = yup.object().shape({
    username: yup.string().min(6, t("full name error")),
    email: yup.string().email(t("email error")).required(t("email required")),
    password: yup.string().required(t("confirm password error")).min(6, t("password error")),
    confirmPassword: yup
      .string()
      .required(t("confirm password error"))
      .oneOf([yup.ref(`password`), null], t("password not match")),
    check: yup.boolean().oneOf([true], 'Please check the box')
  })
  // ** Hooks
  const {
    control, // control props comes from useForm (optional: if you are using FormContext)
    handleSubmit, // submit form
    formState: { errors } // errors object contains all your form errors
  } = useForm({
    defaultValues, // default values for form fields
    resolver: yupResolver(SignupSchema) // validation resolver
  })

  const onSubmit = data => {
    if (Object.values(data).every(field => field === true || field.length > 0)) { // check if all fields are filled
      stepper.next() // go to next step
      // we can her send data to backend
      // in this case APi is try to send data to backend 
    } else {
      // we can add here alert or toast to show error
    }
  }

  return (
    <Fragment>
      <div className='content-header mb-2'>
        <h2 className='fw-bolder mb-75'>{t("Account Information")}</h2>
        <span>{t("Enter your username password details")}</span>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='username'>
              {t("Full Name")}
            </Label>
            <Controller
              id='username'
              name='username'
              control={control}
              render={({ field }) => <Input placeholder='johndoe' invalid={errors.username && true} {...field} />}
            />
            {errors.username && <FormFeedback>{errors.username.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for={`email`}>
              {t('Email Address')}
            </Label>
            <Controller
              control={control}
              id='email'
              name='email'
              render={({ field }) => (
                <Input type='email' placeholder='john.doe@email.com' invalid={errors.email && true} {...field} />
              )}
            />
            {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
          </Col>
        </Row>
        <Row>
          <div className='form-password-toggle col-md-6 mb-1'>
            <Controller
              id='password'
              name='password'
              control={control}
              render={({ field }) => (
                <InputPasswordToggle
                  label={t('Password')}
                  htmlFor='password'
                  className='input-group-merge'
                  invalid={errors.password && true}
                  {...field}
                />
              )}
            />
            {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
          </div>
          <div className='form-password-toggle col-md-6 mb-1'>
            <Controller
              control={control}
              id='confirmPassword'
              name='confirmPassword'
              render={({ field }) => (
                <InputPasswordToggle
                  label={t("Confirm Password")}
                  htmlFor='password'
                  className='input-group-merge'
                  invalid={errors.confirmPassword && true}
                  {...field}
                />
              )}
            />
            {errors.confirmPassword && <FormFeedback>{errors.confirmPassword.message}</FormFeedback>}
          </div>
        </Row>
        <Row>
          <Col sm={12} className='mb-1'>
            <div className='form-check form-check-inline'>
            <Controller
              control={control}
              id='check'
              name='check'
              render={({ field }) => (
                <Input type='checkbox' invalid={errors.check && true} {...field} />
              )}
            />
              <Label for='remember-me' >
                {t('Accept')} <Link to="/terms" ><a>{t('terms')}</a></Link>   {t('and')} <Link to="/conditions" ><a>{t('conditions')} </a> </Link> 
            <a style={{color: "red"}} >{errors.check && errors.check.message}</a> 
              </Label>
            </div>
          </Col>
        </Row>
        <div className='d-flex justify-content-between mt-2'>
          <Button color='success' className='btn-prev' outline onClick={() => navigate('/login')}>
            <ChevronLeft size={14} className='align-middle me-sm-25 me-0'></ChevronLeft>
            <span className='align-middle d-sm-inline-block d-none'>{t('Back')}</span>
          </Button>
          <ThemeButton need={true} disable={false}/>
          <Button type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>{t('Next')}</span>
            <ChevronRight size={14} className='align-middle ms-sm-25 ms-0'></ChevronRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default AccountDetails
