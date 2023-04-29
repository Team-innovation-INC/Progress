import { Ability } from '@casl/ability'
import { adminAbility, developerAbility, moderatorAbility, initialAbility } from './initialAbility'

//  Read ability from localStorage
// * Handles auto fetching previous abilities if already logged in user
// ? You can update this if you store user abilities to more secure place
// ! Anyone can update localStorage so be careful and please update this
const userData = JSON.parse(localStorage.getItem('userData'))
const existingAbility = userData ? userData.ability : null

export  const currentAbility = (_role) => {
  switch (_role || userData?.role || 'user') {
    case "admin":
      return adminAbility 
    case "administrator":
      return moderatorAbility
    case "user":
      return developerAbility
    default:
      return  existingAbility || initialAbility 
    }
}

export default new Ability(currentAbility())
