import { createSlice } from "@reduxjs/toolkit";

interface IRowLevelState {
	onMouseEnter: boolean
}

const initialState:IRowLevelState = {
	onMouseEnter: false
}

export const RowLevelSlice = createSlice({
	name: 'RowLevel',
	initialState,
	reducers:{
		iconOnHover(state){
			state.onMouseEnter = true
		},
		iconOutHover(state){
			state.onMouseEnter = false
		}
	}
})

export const RowLevelActions = RowLevelSlice.actions
export const RowLevelReducer = RowLevelSlice.reducer