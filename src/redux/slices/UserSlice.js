
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  _id:'',
  login_name:'',
  password:'',
  first_name:'',
  last_name:'',
  location:'',
  description:'',
  occupatation:'',
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const{_id,login_name,password,first_name,last_name,location,description,occupatation}=action.payload; 
      state._id=_id;
      state.login_name=login_name;
      state.password=password;
      state.first_name=first_name;
      state.last_name=last_name;
      state.location=location;
      state.description=description;
      state.occupatation=occupatation;
    },
    resetUser: (state) => {
      state._id='';
      state.login_name='';
      state.password='';
      state.first_name='';
      state.last_name='';
      state.location='';
      state.description='';
      state.occupatation='';
    },
  },
});

export const { updateUser, resetUser } = UserSlice.actions;
export default UserSlice.reducer;
