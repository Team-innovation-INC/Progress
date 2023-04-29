// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Row, Button } from 'reactstrap'

// ** Third Party Components
import {  ArrowLeft, ArrowRight } from 'react-feather'

// ** Video imports
import reactVideo from '@src/assets/videos/react.mp4'

   /* /
  / -----Billing Step description component
 / */

const BillingStep = ({ stepper }) => {
  return (
    <Fragment>
      {/* title and description */}
      <h5 className='mb-1'>
        Billing
      </h5>
      {/* video component loading*/}
      <Row className='gy-1 gx-2'>
        <video controls autoPlay muted>
          <source src={reactVideo} type="video/mp4"/>
        </video>
      </Row>
      {/* action buttons group ( back to pervious step and get next step ) */}
      <div className='d-flex justify-content-between mt-5 pt-1'>
        <Button color='primary' onClick={() => stepper.previous()}>
          <ArrowLeft size={14} className='rotate-rtl align-middle me-sm-50 me-0' />
          <div className='align-middle d-sm-inline-block d-none'>
            Previous
          </div>
        </Button>
        <Button color='primary' onClick={() => stepper.next()}>
          <div className='align-middle d-sm-inline-block d-none'>
            Next
          </div>
          <ArrowRight size={14} className='rotate-rtl align-middle ms-sm-50 ms-0' />
        </Button>
      </div>
    </Fragment>
  )
}

export default BillingStep
