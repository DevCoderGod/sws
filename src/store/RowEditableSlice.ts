import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IRowEditableState {
	rowEditable: number | null
}

const initialState:IRowEditableState = {
	rowEditable: null
}

export const RowEditableSlice = createSlice({
	name: 'RowEditable',
	initialState,
	reducers:{
		startEditingAction(state, action:PayloadAction<number>){
			state.rowEditable = action.payload
		},
		stopEditingAction(state){
			state.rowEditable = null
		}
	}
})

export const RowEditableActions = RowEditableSlice.actions
export const RowEditableReducer = RowEditableSlice.reducer