import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRow, IRowResponse } from "../models/Row.model";

interface IRowsState {
	rows: IRow[]
	rowEditable: number | null
	mouseOverLevel: boolean
}

const initialState:IRowsState = {
	rows: [],
	rowEditable: null,
	mouseOverLevel: false
}

export const RowsState = createSlice({
	name: 'Rows',
	initialState,
	reducers:{
		setRowsAction(state, action:PayloadAction<IRow[]>){
			state.rows=action.payload
		},
		addRowAction(state, action:PayloadAction<{index:number, newRow:IRow}>){
			state.rows.splice(action.payload.index,0,action.payload.newRow)
		},
		startEditingAction(state, action:PayloadAction<number>){
			state.rowEditable = action.payload
		},
		stopEditingAction(state){
			state.rowEditable = null
		},
		mouseEnterLevelAction(state){
			state.mouseOverLevel = true
		},
		mouseLeaveLevelAction(state){
			state.mouseOverLevel = false
		}
	}
})

export const RowsActions = RowsState.actions
export const RowsReducer = RowsState.reducer