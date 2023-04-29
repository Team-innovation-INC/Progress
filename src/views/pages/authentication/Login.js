// ** React Imports hooks
import { useContext, useState } from 'react'

// ** React Dom navigation
import { Link, useNavigate } from 'react-router-dom'

// ** Custom Hooks
import { useTranslation } from 'react-i18next' // useTranslation for language change

// ** JWT authorization
import useJwt from '@src/auth/jwt/useJwt'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { handleLogin } from '@store/authentication'

// ** Third Party Components
import toast from 'react-hot-toast'

// ** form Component controller
import { useForm, Controller } from 'react-hook-form'

// ** icons Components
import { Phone, Mail, GitHub, X, Home } from 'react-feather' // react fether icons

// ** ability state
import { currentAbility } from '../../../configs/acl/ability'

// ** Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Custom Components
import Avatar from '@components/avatar'
import InputPasswordToggle from '@components/input-password-toggle'

// ** Utils
import { getHomeRouteForLoggedInUser } from '@utils'

// ** Reactstrap Imports
import { Row, Col, Form, Input, Label, Alert, Button, CardText, CardTitle, Spinner } from 'reactstrap'

// ** component import 
import {LogoComponent, ThemeButton} from "../../components/logoAvatar"
import AuthFooter from '../../../@core/components/authentication'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import { developerAbility } from '../../../configs/acl/initialAbility'

// ** Toast component for success log in 
const ToastContent = ({ t, name, role, message }) => {
  return (
    <div className='d-flex'>
      <div className='me-1'>
        <Avatar size='sm' color='info' icon={<Home size={12} />} />
      </div>
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <h6>
            {name}
          </h6>
          <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
        </div>
        <span>
          {message} {role}. Now you can start to explore. Enjoy!
        </span>
      </div>
    </div>
  )
}

// ** initial values for inputs
const defaultValues = {
  password: '',
  email: ''
}

const userData = (_user, _token) => {
  return {..._user.contact, 
    ..._user.info,
    createdAt: _user.createdAt,
    id : _user._id,
    role : _user.role.roleName,
    token: _token,
    ability : currentAbility(_user.role.roleName)
  }
}

const Login = () => {

// ** Hooks
//-- state hooks
  const [err, setErr]         = useState(null)   // error  state for login
  const [loading, setLoading] = useState(false) // loading state for login

//-- translate
  const { t }   = useTranslation()

//-- ability context
  const ability = useContext(AbilityContext) // useContext for authorization interfaces
//-- actin dispatch
  const dispatch = useDispatch()
//-- navigation route
  const navigate = useNavigate()

// ** form hooks (extract methods)
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

//-- submit function
  const onSubmit = async(input_data) => {
  //-- destruction email and password inputs values
    const {email, password} = input_data
  // ** check inputs form validation
    //-- case valid inputs form 
    if (Object.values(input_data).every(field => field.length > 0)) {
      // --- hidden submit new log in action
      setLoading(true)
      // --- initial collect messages for errors
      let message = null
      // --- try to connect login
      try {
        // --- request server for login details
        const response =  await useJwt.login({ email, password })
        // --- collect response 
        const {user, token} = response.data
        // --- data collect for storage
        const data = { ...userData(user, token)}
        // --- store data to store
        await dispatch(handleLogin(data))
        if (!user.company._id) { // need to reverse this statement 
          // --- data collect for storage
          ability.update(developerAbility)
          navigate("/company/register") // navigate to create company interface
          message = "please try to get a company"
          return false
        } else {
        // --- update user ability
        ability.update(data.ability)
        // --- navigate to specific route depends on user role
        const newDestination = await getHomeRouteForLoggedInUser(data.role)
        navigate(newDestination)
        // --- activate toast component for welcome 
        toast(t => (
          <ToastContent message={"You have successfully logged in  to Progress App as an "} t={t} role={data.role || 'admin'} name={data.fullName || data.userName || 'John Doe'} />
        ))
        }
      // --- handle error
      } catch (error) { 
        // --- error deponed to server request
        if (error.name === "AxiosError") {
          message = error.response.data.message
        } else {
          message = error.message
        }
      // --- ends request with handling error and stopping submit action
      } finally { setErr(message); setLoading(false) }
    } else { // --* inputs error 
      for (const key in input_data) {
        if (input_data[key].length === 0) {
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
        {/* back ground image */}
        <LogoComponent  dark='login-v2-dark.svg' light='login-v2.svg'/>
          {/* template login */}
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            {/* title */}
            <CardTitle tag='h2' className='fw-bold mb-1'>
              👋 {t("Welcome Back")} 👋
            </CardTitle>
            {/* title description */}
            <CardText className='mb-2'>
              {t("Welcome sign in")}
            </CardText>
            {/* errors Alerts */}
            { errors && errors.email &&
              <Alert color='danger'>
                please check your email  
              </Alert>
            }
            { errors && errors.password &&
              <Alert color='danger'>
                please check your password 
              </Alert>
            }
            { err && 
              <Alert color='danger'>
                {err}
              </Alert>
            }
            {/* login form */}
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              {/* email */}
              <div className='mb-1'>
                {/* email label */}
                <Label className='form-label' for='login-email'>
                  {t("Email")}
                </Label>
                {/* email controller input */}
                <Controller
                  id='email'
                  name='email'
                  control={control}
                  render={({ field }) => (
                    // email input component
                    <Input
                      autoFocus
                      type='email'
                      placeholder='please put your email'
                      invalid={errors.email && true}
                      valid={field.value.includes("@") && field.value.includes('.com') && errors.email === undefined && true}
                      {...field}
                    />
                  )}
                />
              </div>
              {/* password */}
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  {/* password label */}
                  <Label className='form-label' for='login-password'>
                    {t("Password")}
                  </Label>
                  {/* forget password link */}
                  <Link to='/forgot-password'>
                    <small>{t("Forget password")}</small>
                  </Link>
                </div>
                {/* password controller input */}
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  render={({ field }) => (
                    // password input component
                    <InputPasswordToggle className='input-group-merge'
                     invalid={errors.password && true}
                     valid={field.value.length >  5 && errors.password === undefined && true}
                      {...field} />
                  )}
                />
              </div>
              {/* remember */}
              <div className='form-check mb-1'>
                {/* remember password check box component need to save password and email to local machine storage*/}
                <Input type='checkbox' id='remember-me'/>
                {/* remember information label */}
                <Label className='form-check-label' for='remember-me'>
                  {t("Remember Me")}
                </Label>
              </div>
              {/* submit button */}
              <Button type='submit' color={errors.password || errors.email ? 'danger' : 'primary'} disabled={loading} block>
                { loading ? <> <Spinner size="sm"/> <span> Please wait ... </span> </> : t("Sign In")}
              </Button>
            </Form>
            {/* create account label */}
            <p className='text-center mt-2'>
              {/* create account description */}
              <span className='me-25'>
                {t('New on our platform?')}
              </span>
              {/* navigate to signup interface */}
              <Link to='/register'>
                <span>
                  {t("Create an account")}
                </span>
              </Link>
            </p>
            {/* login using direction instances */}
            <AuthFooter/>
            {/* divider component */}
            <div className='divider my-2'>
              {/* styles message */}
              <div className='divider-text'>
                👋 {t("style the app")} 👋
              </div>
            </div>
            {/* styles component */}
            <ThemeButton need={true} />
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
