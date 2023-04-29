// ** React Imports
import { Fragment, useState, useRef } from 'react'

// ** React Navigation Link Imports
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Card, Modal, Button, CardBody, CardText, CardTitle, ModalBody, ModalHeader } from 'reactstrap'

// ** Custom Components
import Wizard from '@components/wizard'

// ** Icons Imports
import { Book, Package, Command, CreditCard, Check } from 'react-feather'

// ** Steps
import SubmitStep from './create-app-steps/SubmitStep'
import Introduction from './create-app-steps/Introduction'
import BillingStep from './create-app-steps/BillingStep'
import Steps from './create-app-steps/Steps'
import Script from './create-app-steps/Script'

// ** Styles
import '@styles/react/pages/modal-create-app.scss'

   /* /
  / ----- Validate company component
 / */

const ActivateWebsiteSteps = (props) => {
  const {email, token, companyName, companyWebSite} = props
  // ----- Ref
  const ref = useRef(null)

  // ----- States
  const [show, setShow] = useState(false)
  const [stepper, setStepper] = useState(null)

  // ----- steps components info
  const steps = [
    {
      id: 'introduction',
      title: 'introduction',
      subtitle: 'we use CDN code to validate your company',
      icon: <Book className='font-medium-3' />,
      content: <Introduction stepper={stepper} companyName={companyName} />
    },
    {
      id: 'script',
      title: 'Script',
      subtitle: 'your script need to validate',
      icon: <Package className='font-medium-3' />,
      content: <Script stepper={stepper} email={email} token={token} />
    },
    {
      id: 'steps',
      title: 'Steps',
      subtitle: 'Steps to need to follow with script',
      icon: <Command className='font-medium-3' />,
      content: <Steps stepper={stepper} />
    },
    {
      id: 'example',
      title: 'Example using React',
      subtitle: 'we will show you an example using a react project',
      icon: <CreditCard className='font-medium-3' />,
      content: <BillingStep stepper={stepper} />
    },
    {
      id: 'submit',
      title: 'Submit',
      subtitle: 'Hope you enjoy the tutorial',
      icon: <Check className='font-medium-3' />,
      content: <SubmitStep stepper={stepper} setShow={setShow} />
    }
  ]

  return (
    <Fragment>
      {/* card shows to user when get successfully send activation request */}
      <Card>
        <CardBody className='text-center'>
          {/* icon details */}
          <Package className='font-large-2 mb-1' />
          {/* title information */}
          <CardTitle tag='h5'>
            Validate company 
          </CardTitle>
          {/* description information */}
          <CardText>
            to validate your company please follow those steps
          </CardText>
          {/* open modal stepper button */}
          <Button color='primary' onClick={() => setShow(true)}>
            Details
          </Button>
        </CardBody>
      </Card>
      {/* modal stepper details */}
      <Modal isOpen={show} toggle={() => setShow(!show)} className=' modal-dialog-centered modal-lg'>
        {/* modal heder title */}
        <ModalHeader className='bg-gray align-center text-center' toggle={() => setShow(!show)}>
          <h1 className='text-center mb-1'>
            Validate {" "}
            <Link to={companyWebSite} >
              {companyWebSite}
            </Link>
          </h1> 
        </ModalHeader>
        {/* modal stepper */}
        <ModalBody className='pb-3 px-sm-3'>
          <p className='text-center mb-2'>
            To validate your company please follow those steps
          </p>
          <Wizard
            ref={ref}
            steps={steps}
            type='vertical'
            headerClassName='border-0'
            options={{ linear: false }}
            instance={el => setStepper(el)}
            contentClassName='shadow-none'
            className='bg-transparent create-app-wizard shadow-none'
          />
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default ActivateWebsiteSteps
