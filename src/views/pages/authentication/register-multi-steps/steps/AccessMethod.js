// ** React Imports
import { Fragment, useState } from 'react'

// ** Third Party Components
import { useForm } from 'react-hook-form'
import { ChevronRight, Home } from 'react-feather'

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, InputGroup, InputGroupText, FormFeedback, Alert } from 'reactstrap'


const Billing = ({ stepper }) => {
  // ** States
  const [value, setValue] = useState("")
  const [error, setError] = useState(null)
  const {
    handleSubmit
  } = useForm({
    defaultValues: { value }
  })

  const onSubmit = () => {
    if (!value) {
      setError("please select a plan you like to ")
    } else if (value === "create") {
      // dispatched 
      stepper.next()
    } else {
      stepper.to(3)
    }
    
  }

  return (
    <Fragment>
      <div className='content-header mb-3'>
        <h2 className='fw-bolder mb-75 text-center'>Select Create or join a company</h2>
        <p className='text-center'> If you like to create a new company please select the first card and if like to join an existing company the second choice is available</p>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className='custom-options-checkable gx-3 gy-2' >
          {error && 
            <Alert color='danger'>
              {error}
            </Alert>
          }
          <Col 
            md='6'
            className="basicPlan"
            onClick={() => { console.log("create pressed");  setValue("create") }}
          >
            <Input 
              type='radio'
              id='basicPlan' 
              className='custom-option-item-check' 
              value="create"
              checked={value === "create"}
              readOnly
            />
            <Label for='basicPlan' className='custom-option-item text-center p-1'>
              <span className='custom-option-item-title h3 fw-bolder'>
                Create Company
              </span>
              <span className='d-block m-75'>
                when you create a new company you need to follow the next steps
              </span>
              <span className='plan-price'>
                <sub className='pricing-duration text-primary font-medium-1 fw-bold'>
                  CDN validation method
                </sub>
              </span>
            </Label>
          </Col>
          <Col 
            md='6'
            className="basicPlan"
            onClick={() => { console.log("join pressed");  setValue("join") }}
          >
            <Input 
              type='radio' 
              id='basicPlan' 
              className='custom-option-item-check'
              value="join"
              checked={value === "join"}
              readOnly
            />
            <Label for='stdPlan' className='custom-option-item text-center p-1'>
              <span className='custom-option-item-title h3 fw-bolder'>
                Join Company
              </span>
              <span className='d-block m-75'>
                when you join a new company we will send an email to the admin for validation
              </span>
              <span className='plan-price'>
                <sub className='pricing-duration text-primary font-medium-1 fw-bold'>
                  email validation
                </sub>
              </span>
            </Label>
          </Col>
        </Row>
        <div className='d-flex justify-content-between mt-2'>
          <Button color='secondary' className='btn-prev' outline >
            <Home size={14} className='align-middle me-sm-25 me-0'></Home>
            <span className='align-middle d-sm-inline-block d-none'>Home</span>
          </Button>
          <Button type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ChevronRight size={14} className='align-middle ms-sm-25 ms-0'></ChevronRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default Billing
