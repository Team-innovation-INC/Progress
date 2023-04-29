// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** JWT authorization
import useJwt from '@src/auth/jwt/useJwt'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import { Check, ChevronLeft } from 'react-feather'

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback, Alert } from 'reactstrap'

const defaultValues = {
  company: ''
}

const AccountDetails = ({ stepper }) => {
  // ** Hooks
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues
  })
const [companies, setCompanies] = useState([])
const [loading, setLoading] = useState(false)
const [err, setErr] = useState(null)
   useEffect(() => {
    async function getCompanies() {
      setLoading(true)
      const companiesResponse =  await useJwt.getRequestWithToken("getCompanyList")
      setCompanies(companiesResponse.data.companies)
      setLoading(false)
    }
    getCompanies()
   }, [])
  const onSubmit = async(data) => {
    console.log('passed here', data.company)
    // --- hidden submit new log in action
    setLoading(true)
    // --- initial collect messages for errors
    let message = null
    // --- try to connect login
    if (data.company) {
      try {
        const response = await useJwt.postRequestWithToken('joinCompanyEndpoint', {companyId: data.company})
        console.log("response", response.data)
      } catch (error) {
        // --- error deponed to server request
        if (error.name === "AxiosError") {
          message = error.response.data.message
        } else {
          message = error.message
        } 
      } finally { setErr(message); setLoading(false) }
    } else {
      setError("company", "please select at least one company ")
    }
  }

  return (
    loading ? <p> waiting for data .... </p> : <Fragment>
      <div className='content-header mb-2'>
        <h2 className='fw-bolder mb-75'>Select a company</h2>
        <span>Select one of the following companies</span>
      </div>
      {err && <Alert color='danger' > {err} </Alert>}
      {companies && companies.length === 0 && 
        <p className='text-center'>
          no companies exist please try to create a new one
        </p>
      }
      <Form onSubmit={handleSubmit(onSubmit)}>
        { companies && companies.length > 0 && 
                <Row>
                <div className='form-password-toggle col-md-12 mb-1'>
                  <Controller
                    id='company'
                    name='company'
                    control={control}
                    render={({ field }) => (
                      <Input
                        label='company'
                        htmlFor='company'
                        type='select'
                        className='input-group-merge'
                        invalid={errors.company && true}
                        {...field}
                      > 
                      <option key={''} value={0}>
                          please select one of these companies
                        </option>
                      {companies.map((element) => {
                        return (
                          <option key={element._id} value={element._id}>
                          {element.companyInfo.companyWebSite}
                        </option>
                        )
                      })}
                      </Input>
                    )}
                  />
                  {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
                </div>
              </Row>
        }

        <div className='d-flex justify-content-between mt-2'>
          <Button color='secondary' className='btn-prev' outline onClick={() => stepper.to(1)}>
            <ChevronLeft size={14} className='align-middle me-sm-25 me-0'></ChevronLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button>
          <Button type='submit' color='success' className='btn-next' disabled={companies.length === 0}>
            <span className='align-middle d-sm-inline-block d-none'>Submit</span>
            <Check size={14} className='align-middle ms-sm-25 ms-0'></Check>
          </Button>
        </div>
      </Form>
    </Fragment>  
  )
}

export default AccountDetails