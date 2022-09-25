import React from 'react'
// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
// Link import for naviagation
import { Link } from 'react-router-dom'
// react strap components
import { Col } from 'reactstrap'
import { t } from 'i18next'

const LogoComponent = ({light, dark}) => {
      // ** Hooks
  const { skin } = useSkin()
  // require pictures for logo
    const illustration = skin === 'dark' ? dark : light,
    source = require(`@src/assets/images/pages/${illustration}`).default
  const   logosource = require(`@src/assets/images/logo/logo.svg`).default
  return (
   <>
   <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
   <img className='img-fluid' style={{widh:20, height:24}} src={logosource} alt='app logo' />
       <h2 className='brand-text text-primary ms-1'>{t("Progres Work")}</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col>
   </>
  )
}
export default LogoComponent