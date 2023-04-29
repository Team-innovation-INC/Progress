// ** Initial user ability
export const initialAbility = [
  {
    action: 'read',
    subject: 'Auth'
  }
]

export const adminAbility = [
  {
    action: 'manage',
    subject: 'all'
  }
]

export const moderatorAbility = [
  {
    action: 'manage',
    subject: 'User'
  },
  {
    action: 'manage',
    subject: 'moderator'
  }
]

export const developerAbility = [
  {
    action: 'manage',
    subject: 'User'
  }
]

export const guestAbility = [
  {
    action: 'read',
    subject: 'Guest'
  }
]
export const _ = undefined
