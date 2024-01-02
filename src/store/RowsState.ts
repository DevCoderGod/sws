import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRow } from "../models/Row.model";

interface IRowsState {
	rows: IRow[]
}

const initialState:IRowsState = {
	rows: []
}

export const RowsState = createSlice({
	name: 'Rows',
	initialState,
	reducers:{
		setRowsAction(state, action:PayloadAction<IRow[]>){
			state.rows=action.payload
		},
		addRowAction(state, action:PayloadAction<{index:number, newViewRow:IRow}>){
			state.rows.splice(action.payload.index,0,action.payload.newViewRow)
		},
	}
})

export const RowsActions = RowsState.actions
export const RowsReducer = RowsState.reducer