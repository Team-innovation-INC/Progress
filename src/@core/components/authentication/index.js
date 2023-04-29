import React from 'react'
import { GitHub, Mail, Phone } from 'react-feather'
import { Button } from 'reactstrap'

function AuthFooter() {
  return (
    <div className='auth-footer-btn d-flex justify-content-center'> 
      {/* login with phone number */}
      <Button color='info' onClick={() => console.log("login with phone number")} >
    <Phone size={14} />
      </Button>
      {/* login with gmail */}
      <Button color='google' onClick={() => console.log("login with gmail")} >
    <Mail size={14} />
      </Button>
      {/* login with github */}
      <Button className='me-0' color='github' onClick={() => console.log("login with github")} >
    <GitHub size={14} />
      </Button>
    </div>
  )
}

export default AuthFooter