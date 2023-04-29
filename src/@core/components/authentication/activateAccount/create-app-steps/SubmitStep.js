// ** Reactstrap Imports
import { Button } from 'reactstrap'

// ** Icons Imports
import { ArrowLeft, Check } from 'react-feather'

// ** Images imports
import illustration from '@src/assets/images/illustration/pricing-Illustration.svg'

   /* /
  / -----Submit component
 / */

const SubmitStep = ({ stepper, setShow }) => {
  return (
    <div className='text-center'>
      {/* title, description and image */}
      <h3>
        Submit 🥳
      </h3>
      <p>
        Submit your company validation to kickstart your project
      </p>
      <p>
        need to rebuild app and run it so can get request validation for your website
      </p>
      <img src={illustration} alt='illustration' height='318' />
      {/* action buttons group ( back to the pervious step and close the modal ) */}
      <div className='d-flex justify-content-between mt-3'>
        <Button color='primary' onClick={() => stepper.previous()}>
          <ArrowLeft size={14} className='rotate-rtl align-middle me-sm-50 me-0' />
          <div className='align-middle d-sm-inline-block d-none'>
            Previous
          </div>
        </Button>
        <Button
          color='success'
          onClick={() => setShow(false)}
        >
          <div className='align-middle d-sm-inline-block d-none'>
            Submit
          </div>
          <Check size={14} className='align-middle ms-sm-50 ms-0' />
        </Button>
      </div>
    </div>
  )
}

export default SubmitStep
