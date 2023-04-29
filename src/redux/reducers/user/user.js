// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

//--- initial state for user reducer
const initialUser = {
  id         : '',
  role       : '',
  contact    : {},
  address    : {},
  info       : {}
}

//--- user Slice
export const userSlice = createSlice({
  name: 'user', // ** slice name
  initialState: initialUser, // ** initial state
  // ** user reducers
  reducers: {
    handleUser: (state, action) => {
      state = action.payload
    },
    handleAddress: (state, action) => {
      state.address = action.payload
    },
    handleInfo: (state, action) => {
      state.info = action.payload
    },
    handleContact: (state, action) => {
      state.contact = action.payload
    },
    handleRole: (state, action) => {
      state.role = action.payload
    },
    handleId: (state, action) => {
      state.id = action.payload
    }
  }
})

//----- ** export user actions
export const { handleUser, handleAddress, handleContact, handleId, handleInfo } = userSlice.actions
//----- ** export user reducers
export default userSlice.reducer
