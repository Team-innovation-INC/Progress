// ** Reactstrap Imports
import { Card, CardBody, CardText } from 'reactstrap'

const ProfileAbout = ({ data }) => {
  return (
    <Card>
      <CardBody>
        <h5 className='mb-75'>About</h5>
        <CardText>{data.bio || "welcome to my profile"}</CardText>
        <div className='mt-2'>
          <h5 className='mb-75'>Joined:</h5>
          <CardText>{data.createdAt }</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>Lives:</h5>
          <CardText>{data.address || "no address added"}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>Email:</h5>
          <CardText>{data.email}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>Website:</h5>
          <CardText>{data.website || "www.example.com"}</CardText>
        </div>
      </CardBody>
    </Card>
  )
}

export default ProfileAbout
