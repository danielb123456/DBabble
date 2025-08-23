import { createSlice } from '@reduxjs/toolkit';

// redux simplifies STATE MANAGEMENT
// slice = state + reducers (functions that change state) + ()
const usersSlice = createSlice({
    name: 'user',
    initialState: { user: null, allUsers: [], allChats: [], selectedChat: null},
    reducers: {
        setUser: (state, action) => { state.user = action.payload; },
        setAllUsers: (state, action) => { state.allUsers = action.payload; },
        setAllChats: (state, action) => {state.allChats = action.payload; },
        setSelectedChat: (state, action) => {state.selectedChat = action.payload; }
    }
});

export const { setUser, setAllUsers, setAllChats, setSelectedChat } = usersSlice.actions; // actions for each reducer
export default usersSlice.reducer;