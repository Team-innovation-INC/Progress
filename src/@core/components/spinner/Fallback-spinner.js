// ** Logo
import progLogo from '@src/assets/images/spinner/logo.svg'

const SpinnerComponent = () => {
  return (
    <div className='fallback-spinner app-loader'>
      <img className='fallback-logo' height={200} width={200} src={progLogo} alt='logo' />
      <h1>loading.....</h1>
    </div>
  )
}

export default SpinnerComponent
