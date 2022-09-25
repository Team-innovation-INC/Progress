import React from 'react'
// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
// Link import for naviagation
import { Link, Navigate, useNavigate } from 'react-router-dom'
// react strap components
import { Col } from 'reactstrap'
import { t } from 'i18next'

const LogoComponent = ({light, dark, className, lg, sm}) => {
  // use navigate 
  const navigate = useNavigate()
      // ** Hooks
  const { skin } = useSkin()
  // require pictures for logo
    const illustration = skin === 'dark' ? dark : light,
    source = require(`@src/assets/images/pages/${illustration}`).default
  const   logosource = require(`@src/assets/images/logo/logo.svg`).default
  return (
   <>
   <Link className='brand-logo' to='#' onClick={() => navigate("/home")}>
   <img className='img-fluid' style={{widh:20, height:24}} src={logosource} alt='app logo' />
       <h2 className='brand-text text-primary ms-1'>{t("Progres Work")}</h2>
        </Link>
        <Col className={className} lg={lg} sm={sm}>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col>
   </>
  )
}
export default LogoComponent