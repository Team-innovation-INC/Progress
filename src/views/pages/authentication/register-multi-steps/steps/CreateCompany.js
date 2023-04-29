// ** React Imports
import { Fragment, useState } from 'react'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import { Check, ChevronLeft } from 'react-feather'

// ** JWT authorization
import useJwt from '@src/auth/jwt/useJwt'

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback, Alert } from 'reactstrap'


function ActivateCompany({email, token}) {
  return (
    <>
    {`<script> window.onload = function() { fetch(\`http://localhost:5000/api/company/activate?token=${token}&email=${email}).then(response => response.json()).then(data => console.log(data)).catch(error => console.error(error))} </script>`}
    </>
  )
}

const defaultValues = {
  companyName   : '',
  companyWebSite: '',
  bio           : ''
}

const PersonalInfo = ({ stepper }) => {
  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues
  })
  const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activate, setActivate] = useState(null)
  const onSubmit = async(data) => {
    if (Object.values(data).every(field => field.length > 0)) {
      console.log("data", data)
      let message
      setLoading(true)
      try {
        const response = await useJwt.postRequestWithToken("createNewCompany", data)
        console.log("result", response.data)
        if (response.status === 200) {
          setActivate(response.data)
        } else {
          message = response.data.message
        }
        
      } catch (error) {
        // --- error deponed to server request
        if (error.name === "AxiosError") {
          message = error.response.data.message
        } else {
          message = error.message
        }
      } finally {
        setLoading(false)
        setErr(message)
      }
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual',
            message: `Please enter a valid ${key}`
          })
        }
      }
    }
  }

  return (
    <Fragment>
      <div className='content-header mb-2'>
        <h2 className='fw-bolder mb-75'>Company information</h2>
        <span>Enter Your company Information.</span>
      </div>
      {err && <Alert color='danger'>
        {err}
        </Alert>}
        {activate && <Fragment>

          please copy and past this script on your entry point project (probebly will named index.html) on the top header
          activate
          <br/>
          <ActivateCompany  email={activate.email} token={activate.token} />
        </Fragment> }
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md='12' className='mb-1'>
            <Label className='form-label' for='companyName'>
              company name
            </Label>
            <Controller
              id='companyName'
              name='companyName'
              control={control}
              render={({ field }) => <Input placeholder='please put your company name' invalid={errors.companyName && true} {...field} />}
            />
            {errors.companyName && <FormFeedback>{errors.companyName.message}</FormFeedback>}
          </Col>
          <Col md='12' className='mb-1'>
            <Label className='form-label' for='companyWebSite'>
              company  web site
            </Label>
            <Controller
              id='companyWebSite'
              name='companyWebSite'
              control={control}
              render={({ field }) => <Input placeholder='please put your company url' invalid={errors.companyWebSite && true} {...field} />}
            />
            {errors.companyWebSite && <FormFeedback>{errors.companyWebSite.message}</FormFeedback>}
          </Col>
          <Col md='12' className='mb-1'>
            <Label className='form-label' for='bio'>
              company biography
            </Label>
            <Controller
              id='bio'
              name='bio'
              control={control}
              render={({ field }) => <Input placeholder='please put some description for your company' type='textarea' invalid={errors.bio && true} {...field} />}
            />
            {errors.bio && <FormFeedback>{errors.bio.message}</FormFeedback>}
          </Col>
        </Row>
        <div className='d-flex justify-content-between mt-2'>
          <Button color='secondary' className='btn-prev' outline onClick={() => stepper.to(1)}>
            <ChevronLeft size={14} className='align-middle me-sm-25 me-0'></ChevronLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button>
          <Button type='submit' color='success' className='btn-next' disabled={loading}>
            <span className='align-middle d-sm-inline-block d-none'>Submit</span>
            <Check size={14} className='align-middle ms-sm-25 ms-0'></Check>
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default PersonalInfo
