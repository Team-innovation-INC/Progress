// ** React Imports
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// ** Custom Hooks
import useJwt from '@src/auth/jwt/useJwt'
import { useTranslation } from 'react-i18next' // useTranslation for language change

// ** Third Party Components
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form' 
import { Phone, Mail, GitHub, Coffee, X } from 'react-feather' // react fether icons

// ** Actions
import { handleLogin } from '@store/authentication'

// ** Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Custom Components
import Avatar from '@components/avatar'
import InputPasswordToggle from '@components/input-password-toggle'

// ** Utils
import { getHomeRouteForLoggedInUser } from '@utils'

// ** Reactstrap Imports
import { Row, Col, Form, Input, Label, Alert, Button, CardText, CardTitle } from 'reactstrap'
// ** component import 
import {LogoComponent, ThemeButton} from "../../components/logoAvatar"
// ** Styles
import '@styles/react/pages/page-authentication.scss'

const ToastContent = ({ t, name, role }) => {
  return (
    <div className='d-flex'>
      <div className='me-1'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
      </div>
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <h6>{name}</h6>
          <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
        </div>
        <span>You have successfully logged in as an {role} user to Vuexy. Now you can start to explore. Enjoy!</span>
      </div>
    </div>
  )
}

const defaultValues = {
  password: '',
  loginEmail: ''
}

const Login = () => {
// ** Hooks
const { t } = useTranslation() // useTranslation for language change
const [err, setErr] = useState(null) // error state for login
const [loading, setLoading] = useState(false) // error state for button
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ability = useContext(AbilityContext)
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })
    const onSubmit = data => {
      setLoading(true)
    if (Object.values(data).every(field => field.length > 0)) {
      useJwt
        .login({ email: data.loginEmail, password: data.password })
        .then(res => {
          const data = { ...res.data.userData, accessToken: res.data.accessToken, refreshToken: res.data.refreshToken }
          dispatch(handleLogin(data))
          setErr(null)
          setLoading(false)
          ability.update(res.data.userData.ability)
          navigate(getHomeRouteForLoggedInUser(data.role))
          toast(t => (
            <ToastContent t={t} role={data.role || 'admin'} name={data.fullName || data.username || 'John Doe'} />
          ))
        })
        .catch((error) => { setLoading(false); setErr(error.message) })
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }
  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
       <LogoComponent className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12' dark='login-v2-dark.svg' light='login-v2.svg'/>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
            👋 {t("Welcome Back")} 👋
            </CardTitle>
            <CardText className='mb-2'>{t("Welcome sign in")}</CardText>
            {errors && errors.loginEmail && <Alert color='danger'> please check your email  </Alert> }
            {errors && errors.password && <Alert color='danger'> please check your password  </Alert> }
            {err && <Alert color='danger'> {err}  </Alert> }
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  {t("Email")}
                </Label>
                <Controller
                  id='loginEmail'
                  name='loginEmail'
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type='email'
                      placeholder='john@example.com'
                      invalid={errors.loginEmail && true}
                      valid={field.value.includes("@") && field.value.includes('.com') && errors.loginEmail === undefined && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    {t("Password")}
                  </Label>
                  <Link to='/forgot-password'>
                    <small>{t("Forget password")}</small>
                  </Link>
                </div>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge'
                     invalid={errors.password && true}
                     valid={field.value.length >  5 && errors.password === undefined && true}
                      {...field} />
                  )}
                />
              </div>
              <div className='form-check mb-1'>
                <Input type='checkbox' id='remember-me' />
                <Label className='form-check-label' for='remember-me'>
                  {t("Remember Me")}
                </Label>
              </div>
              <Button type='submit' color='primary' disabled={loading} block>
                {t("Sign In")}
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <span className='me-25'>{t('New on our platform?')}</span>
              <Link to='/register'>
                <span>{t("Create an account")}</span>
              </Link>
            </p>
            <div className='auth-footer-btn d-flex justify-content-center'> 
  <Button color='twitter'>
    <Phone size={14} />
  </Button>
  <Button color='google'>
    <Mail size={14} />
  </Button>
  <Button className='me-0' color='github'>
    <GitHub size={14} />
  </Button>
</div> 
           <div className='divider my-2'>
              <div className='divider-text'>👋 {t("style the app")} 👋</div>
            </div>
            <ThemeButton need={true} />
            
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
