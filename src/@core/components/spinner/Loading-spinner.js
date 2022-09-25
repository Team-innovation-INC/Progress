import { Spinner } from "reactstrap"

const ComponentSpinner = () => {
  return (
    <div className='fallback-spinner'>
      <Spinner
    color="primary"
    type="grow"
  >
    Loading...
  </Spinner>
    </div>
  )
}

export default ComponentSpinner
