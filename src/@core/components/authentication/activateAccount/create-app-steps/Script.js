// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import { Button, ListGroup } from 'reactstrap'

// ** Icons Imports
import { ArrowLeft, ArrowRight, Copy, Code, Check } from 'react-feather'

// ** Script show component
const ValidateScript = ({text}) => { 
  return (
    <div style={{maxWidth :300}}>
        <pre>
    <code className='language-jsx'>
      {text}
    </code>
  </pre>
    </div>

  )
}

// ** Copy text function
async function copyTextToClipboard(text) {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(text)
  } else {
    return document.execCommand('copy', true, text)
  }
}

   /* /
  / -----Script component
 / */

const Script = ({ stepper, token, email }) => {

// ---- text message script
  const text = `
    <script> 
      window.onload = function() {
        fetch(https://progress-application.onrender.com/api/company/activate?token=${token}&email=${email})
          .then(response => response.json())
          .catch(error => console.error(error))} 
    </script>
  `
// ---- state variables 
  const [open,     setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

// ---- handle copied 
  function handleCopied() {
    setCopied(!copied)
    copyTextToClipboard(text)
  }
  return (
    <Fragment>
      {/* Header component */}
      <div className='d-flex justify-content-between align-items-center m-1'>
        {/* title */}
        <h5 className='text-center' >Script code</h5>
        {/* action icons  */}
        <div className='d-flex justify-content-end m-1'>
          {!copied && <Copy onClick={handleCopied} style={{marginRight : 5}} />}
          {copied && <Check onClick={handleCopied} style={{marginRight : 5}} />}
          <Code onClick={() => setOpen(!open)} />
        </div>
      </div>
      {/* script component executed */}
      <ListGroup flush>
        { open && <ValidateScript text={text}/> }
      </ListGroup>
      {/* action buttons group ( back to step 1 and get next step ) */}
      <div className='d-flex justify-content-between mt-2'>
        <Button color='primary' onClick={() => stepper.previous()}>
          <ArrowLeft size={14} className='rotate-rtl align-middle me-sm-50 me-0' />
          <div className='align-middle d-sm-inline-block d-none'>Previous</div>
        </Button>
        <Button color='primary' onClick={() => stepper.next()}>
          <div className='align-middle d-sm-inline-block d-none'>Next</div>
          <ArrowRight size={14} className='rotate-rtl align-middle ms-sm-50 ms-0' />
        </Button>
      </div>
    </Fragment>
  )
}

export default Script
