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
		onMouseEnterAction(state){
			state.onMouseEnter = true
		},
		onMouseLeaveAction(state){
			state.onMouseEnter = false
		}
	}
})

export const RowLevelActions = RowLevelSlice.actions
export const RowLevelReducer = RowLevelSlice.reducer