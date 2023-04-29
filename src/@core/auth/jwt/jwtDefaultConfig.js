// ** Auth Endpoints
const baseUrl = 'http://localhost:5000'

const endPoints = {
  loginEndpoint: '/api/auth/sign-in',
  registerEndpoint: '/api/auth/sign-up',
  refreshEndpoint: '/api/client/current-information',
  roleEndpoint: '/api/client/role',
  logoutEndpoint: '/jwt/logout',
  getCompanyList: '/api/company/list',
  createNewCompany: '/api/company/create',
  joinCompanyEndpoint : '/api/company/join'
}
function getEndPoints() {
  const configWithBaseUrl = {}

  for (const endpoint in endPoints) {
    configWithBaseUrl[endpoint] = baseUrl + endPoints[endpoint]
  }
  return configWithBaseUrl
}


const tokenType = "Bearer"

const StorageToken = {
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken'
}
export default {
  ...getEndPoints(),
  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType,

  // ** Value of this property will be used as key to store JWT token in storage
  ...StorageToken
}
