// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import { Button, Input, ListGroup, ListGroupItem } from 'reactstrap'

// ** Icons Components
import { ArrowLeft, ArrowRight } from 'react-feather'

// ** Images imports
import angular from '@src/assets/images/icons/technology/angular.png'
import react from '@src/assets/images/icons/technology/react.png'
import vue from '@src/assets/images/icons/technology/vue.png'

// ** framework descriptions
const steps = [
  "Add the <script> tag to your index.html file in the public folder of your React.js project.",
  "Add the <script> tag to your index.html file in the public folder of your Vue.js project.",
  "Add the <script> tag to your index.html file in the src folder of your Angular project."
]

   /* /
  / -----Steps description by framework component
 / */

const Steps = ({ stepper }) => {
// ---- framework select state (by index)
  const [selected, setSelected] = useState(0)

  return (
    <Fragment>
      {/* title and description */}
      <h5>
        Select Framework used
      </h5>
      <h5>
        {steps[selected]}
      </h5>
      <h5 className='mt-2 pt-1'>
        Framework List
      </h5>
      {/* framework list */}
      <ListGroup flush>
        {/* react */}
        <ListGroupItem className='border-0 px-0'>
          <label htmlFor='firebaseRadio' className='d-flex cursor-pointer'>
            <span className='avatar avatar-tag bg-light-danger me-1'>
              <img src={react} alt='googleLogo' height='25' />
            </span>
            <span className='d-flex align-items-center justify-content-between flex-grow-1'>
              <div className='me-1'>
                <h5 className='d-block fw-bolder'>
                  React JS
                </h5>
              </div>
              <span>
                <Input type='radio' id='firebaseRadio' name='dbRadio' onChange={() => setSelected(0)} defaultChecked />
              </span>
            </span>
          </label>
        </ListGroupItem>
        {/* vue */}
        <ListGroupItem className='border-0 px-0'>
          <label htmlFor='amazonRadio' className='d-flex cursor-pointer'>
            <span className='avatar avatar-tag bg-light-secondary me-1'>
              <img src={vue} alt='amazonLogo' height='25' />
            </span>
            <span className='d-flex align-items-center justify-content-between flex-grow-1'>
              <div className='me-1'>
                <h5 className='d-block fw-bolder'>
                  Vue JS
                </h5>
              </div>
              <span>
                <Input type='radio' id='amazonRadio' name='dbRadio' onChange={() => setSelected(1)} />
              </span>
            </span>
          </label>
        </ListGroupItem>
        {/* angular */}
        <ListGroupItem className='border-0 px-0'>
          <label htmlFor='mysqlRadio' className='d-flex cursor-pointer'>
            <span className='avatar avatar-tag bg-light-info me-1'>
              <img src={angular} alt='sqlLogo' height='25' />
            </span>
            <span className='d-flex align-items-center justify-content-between flex-grow-1'>
              <div className='me-1'>
                <h5 className='d-block fw-bolder'>
                  Angular
                </h5>
              </div>
              <span>
                <Input type='radio' id='mysqlRadio' name='dbRadio' onChange={() => setSelected(2)} />
              </span>
            </span>
          </label>
        </ListGroupItem>
      </ListGroup>
      {/* action buttons group ( back to the pervious step and get next step ) */}
      <div className='d-flex justify-content-between mt-2'>
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

export default Steps
