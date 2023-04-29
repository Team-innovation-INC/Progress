// ** React Imports
import { Fragment } from 'react'

// ** React Navigation
import { useNavigate } from 'react-router-dom'

// ** Reactstrap Imports
import { Button, Input, ListGroup, ListGroupItem } from 'reactstrap'

// ** Icons Imports
import { Briefcase, ShoppingCart, Award, ArrowRight, Home } from 'react-feather'


   /* /
  / -----Introduction component
 / */

const Introduction = ({ stepper, companyName }) => {
  // ---- destruction navigation
  const navigate = useNavigate()

  return (
    <Fragment>
      {/* title and description */}
      <Input placeholder={ `Company Name ---- ${  companyName}`} disabled className='text-center border-0 text-large'  />
      <h5 >
        To validate your company you need to follow those steps and we will show you in details every step
      </h5>
      {/* title for steps */}
      <h5 className='mt-2 pt-1'>
        Steps
      </h5>
      {/* steps list */}
      <ListGroup flush>
        {/* step 1  copy script */}
        <ListGroupItem className='border-0 px-0'>
          <label htmlFor='crmRadio' className='d-flex cursor-pointer'>
            <span className='avatar avatar-tag bg-light-info me-1'>
              <Briefcase className='font-medium-5' onClick={() => stepper.to(2)}/>
            </span>
            <span className='d-flex align-items-center justify-content-between flex-grow-1'>
              <div className='me-1'>
                <h5 className='d-block fw-bolder'>
                  Copy script code 
                </h5>
                <span>
                  copy the script code
                </span>
              </div>
            </span>
          </label>
        </ListGroupItem>
        {/* step 2  integration script */}
        <ListGroupItem className='border-0 px-0'>
          <label htmlFor='ecommPlatform' className='d-flex cursor-pointer'>
            <span className='avatar avatar-tag bg-light-success me-1'>
              <ShoppingCart className='font-medium-5' onClick={() => stepper.to(3)}/>
            </span>
            <span className='d-flex align-items-center justify-content-between flex-grow-1'>
              <div className='me-1'>
                <h5 className='d-block fw-bolder'>Integrate Script</h5>
                <span>integrate the script code into your entry html file</span>
              </div>
            </span>
          </label>
        </ListGroupItem>
        {/* step 3  execute script */}
        <ListGroupItem className='border-0 px-0'>
          <label htmlFor='learningPlatform' className='d-flex cursor-pointer'>
            <span className='avatar avatar-tag bg-light-danger me-1'>
              <Award className='font-medium-5' onClick={() => stepper.to(4)}/>
            </span>
            <span className='d-flex align-items-center justify-content-between flex-grow-1'>
              <div className='me-1'>
                <h5 className='d-block fw-bolder'>Run website</h5>
                <span>Run your website after getting the script ready</span>
              </div>
            </span>
          </label>
        </ListGroupItem>
      </ListGroup>
      {/* action buttons group ( back to login page and get next step ) */}
      <div className='d-flex justify-content-between mt-2'>
        <Button color='danger' outline  onClick={() => navigate("/login")}>
          <Home size={14} className='rotate-rtl align-middle me-sm-50 me-0' />
          <div className='align-middle d-sm-inline-block d-none'>Home</div>
        </Button>
        <Button color='primary' onClick={() => stepper.next()}>
          <div className='align-middle d-sm-inline-block d-none'>Next</div>
          <ArrowRight size={14} className='rotate-rtl align-middle ms-sm-50 ms-0' />
        </Button>
      </div>
    </Fragment>
  )
}

export default Introduction
