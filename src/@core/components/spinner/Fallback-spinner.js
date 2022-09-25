// ** Logo
import progLogo from '@src/assets/images/spinner/progress.gif'

const SpinnerComponent = () => {
  return (
    <div className='fallback-spinner app-loader'>
      <img className='fallback-logo' src={progLogo} alt='logo' />
    </div>
  )
}

export default SpinnerComponent
