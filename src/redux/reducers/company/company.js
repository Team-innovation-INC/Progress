// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

//--- initial state for company reducer
const initialCompany = {
  id         : '',
  name       : '',
  website    : '',
  occupation : ''
}

//--- company Slice
export const companySlice = createSlice({
  name: 'company', // ** slice name
  initialState: initialCompany, // ** initial state
  // ** company reducers
  reducers: {
    handleCompany: (state, action) => {
      state = action.payload
    }
  }
})

//----- ** export company actions
export const { handleCompany } = companySlice.actions
//----- ** export company reducers
export default companySlice.reducer
