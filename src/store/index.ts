import { configureStore, bindActionCreators } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { Api } from "../api"
import { RowsActions, RowsReducer } from "./RowsState"

const actions = {
	...RowsActions
}

export const store = configureStore({
	reducer:{
		[Api.reducerPath]: Api.reducer,
		Rows: RowsReducer
	},
	middleware: (getDefaultMiddleware:any) => getDefaultMiddleware().concat(Api.middleware),
})

export type State = ReturnType<typeof store.getState>

export const useActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(actions, dispatch)
}

export const useAppState:TypedUseSelectorHook<State> = useSelector