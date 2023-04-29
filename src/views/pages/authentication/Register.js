// ** React Imports
import { useState } from 'react'

// ** React Dom navigation
import { Link, useNavigate} from 'react-router-dom'

// ** Custom Hooks
import { useTranslation } from 'react-i18next' // useTranslation for language change

// ** JWT authorization
import useJwt from '@src/auth/jwt/useJwt'


// ** Third Party Components
import toast from 'react-hot-toast'

// ** form Component controller
import { useForm, Controller } from 'react-hook-form'

// ** icons Components
import { X, Home } from 'react-feather'

// ** Context
//import { AbilityContext } from '@src/utility/context/Can'

// ** Custom Components
import Avatar from '@components/avatar'
import InputPasswordToggle from '@components/input-password-toggle'
import {AuthFooter} from '../../../@core/components/authentication'

// ** Reactstrap Imports
import { Row, Col, CardTitle, CardText, Label, Button, Form, Input, FormFeedback, Alert } from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import { LogoComponent } from '../../components/logoAvatar'

// ** Toast component for success log sign-up
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
  email   : '',
  userName: '',
  password: '',
  fullName: '',
  terms   : false
}

const Register = () => {
  // ** Hooks
  //-- state hooks
  const [err, setErr]         = useState(null)   // error  state for signup
  const [loading, setLoading] = useState(false) // loading state for signup

//-- translate
const { t }   = useTranslation()


//-- ability context
  //const ability = useContext(AbilityContext) // useContext for authorization interfaces

//-- navigation route
  const navigate = useNavigate()

//-- actin dispatch
  //const dispatch = useDispatch()

// ** form hooks (extract methods)
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

//-- submit function
  const onSubmit = async(input_data) => {
    if (Object.values(input_data).every(field => field.length > 0 || field === true) && input_data.terms === true) {
      const {email, password, userName, fullName} = input_data
      console.log("email, password, userName, fullName", email, password, userName, fullName)
      // --- hidden submit new log in action
      setLoading(true)
      // --- initial collect messages for errors
      let message = null
      // --- try to connect login
      try {
        // --- request server for login details
        const response = await useJwt.register({ userName, email, password, fullName })
        // --- collect response 
        if (response.status === 200) {
        navigate("/login")
        // --- activate toast component for welcome 
        toast(t => (
          <ToastContent message={response.message} t={t} role='new user' name={fullName} />
        ))
        } else {
          message = response.message
        }
      } catch (error) { 
        // --- error deponed to server request
        if (error.name === "AxiosError") {
          message = error.response.data.message
        } else {
          message = error.message
        }
        } finally { setErr(message); setLoading(false) }

    } else {
      for (const key in input_data) {
        if (input_data[key].length === 0) {
          setError(key, {
            type: 'manual',
            message: `Please enter a valid ${key}`
          })
        }
        if (key === 'terms' && input_data.terms === false) {
          setError('terms', {
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
        <LogoComponent  dark='register-v2-dark.svg' light='register-v2.svg'/>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            {/* title */}
            <CardTitle tag='h2' className='fw-bold mb-1'>
              🚀 PROGRESS APP 🚀
            </CardTitle>
            <CardText className='mb-2 text-center'>
              You will management easy and fun your company with us !
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
            {/* register form */}
            <Form  className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              {/* username */}
              <div className='mb-1'>
                {/* username label */}
                <Label className='form-label' for='register-username'>
                  Username
                </Label>
                {/* username controller input */}
                <Controller
                  id='userName'
                  name='userName'
                  control={control}
                  render={({ field }) => (
                    // username input component
                    <Input 
                      autoFocus 
                      placeholder='please put your user name here' 
                      invalid={errors.userName && true} 
                      {...field}
                    />
                  )}
                />
                {/* username errors message */}
                {errors.userName ? <FormFeedback>{errors.userName.message}</FormFeedback> : null}
              </div>
              {/* fullName */}
              <div className='mb-1'>
                {/* fullName label */}
                <Label className='form-label' for='register-fullName'>
                  fullName
                </Label>
                {/* fullName controller input */}
                <Controller
                  id='fullName'
                  name='fullName'
                  control={control}
                  render={({ field }) => (
                    // fullName input component
                    <Input 
                      autoFocus 
                      placeholder='please put your user name here' 
                      invalid={errors.fullName && true} 
                      {...field}
                    />
                  )}
                />
                {/* fullName errors message */}
                {errors.fullName ? <FormFeedback>{errors.fullName.message}</FormFeedback> : null}
              </div>
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
              {/* terms */}
              <div className='form-check mb-1'>
                {/* password controller check box */}
                <Controller
                  name='terms'
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='terms'
                      type='checkbox'
                      checked={field.value}
                      invalid={errors.terms && true}
                    />
                  )}
                />
                {/* terms label */}
                <Label className='form-check-label' for='terms'>
                  I agree to
                  <a className='ms-25' href='www.facebook.com' onClick={e => e.preventDefault()}>
                    privacy policy & terms
                  </a>
                </Label>
              </div>
              <Button type='submit' block color='primary' disabled={loading}>
                Sign up
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <span className='me-25'>Already have an account?</span>
              <Link to='/login'>
                <span>Sign in instead</span>
              </Link>
            </p>
            <div className='divider my-2'>
              <div className='divider-text'>or</div>
            </div>
              <AuthFooter/>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Register
