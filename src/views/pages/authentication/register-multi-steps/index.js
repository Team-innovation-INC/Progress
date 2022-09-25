// ** React Imports
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'
// ** component imports
import {LogoComponent} from "../../../components/logoAvatar"


// ** Third Party Components
import { Home, User, CreditCard } from 'react-feather'

// ** Steps
import Billing from './steps/Billing'
import PersonalInfo from './steps/PersonalInfo'
import AccountDetails from './steps/AccountDetails'

// ** Styles
import '@styles/react/pages/page-authentication.scss'

const RegisterMultiSteps = () => {
  // ** Ref
  const ref = useRef(null)

  // ** State
  const [stepper, setStepper] = useState(null)

  const steps = [
    {
      id: 'account-details',
      title: 'Account',
      subtitle: 'Basics',
      icon: <Home size={18} />,
      content: <AccountDetails stepper={stepper} />
    },
    {
      id: 'personal-info',
      title: 'Personal',
      subtitle: 'Personal Information',
      icon: <User size={18} />,
      content: <PersonalInfo stepper={stepper} />
    },
    {
      title: 'Billing',
      id: 'step-billing',
      subtitle: 'Salary Details',
      icon: <CreditCard size={18} />,
      content: <Billing stepper={stepper} />
    }
  ]

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <LogoComponent  dark='login-v2-dark.svg' light='create-account.svg'  lg={3} className='d-none d-lg-flex align-items-center p-0'/>
        <Col lg='9' className='d-flex align-items-center auth-bg px-2 px-sm-3 px-lg-5 pt-3'>
          <div className='width-700 mx-auto'>
            <Wizard
              ref={ref}
              steps={steps}
              instance={el => setStepper(el)}
              headerClassName='px-0'
              contentWrapperClassName='px-0 mt-4'
              className='register-multi-steps-wizard shadow-none'
            />
          </div>
        </Col>
      </Row>
   
    </div>
  )
}

export default RegisterMultiSteps
