import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICreateRowRequest, IRowBase, IRowResponse, ITreeResponse, IUpdateRowRequest } from '../models/Row.model'
import { id } from './id'

export const Api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: `http://185.244.172.108:8081/v1/outlay-rows/entity/${id}/row`
	}),
	// tagTypes:['rows'],
	endpoints: (build) => ({

		getRows: build.query<ITreeResponse[],void>({
			query: () => 'list',
			transformResponse: (r:ITreeResponse[])=>{
				console.log('getRows r === ',r)
				return r
			}
			// providesTags: res => ['rows'],
		}),

		createRow: build.mutation<IRowResponse, ICreateRowRequest>({
			query: (body) => ({
				url:'create',
				method: 'POST',
				body
			}),
			// invalidatesTags:['rows']
		}),

		updateRow: build.mutation<IRowResponse, {id:number, body:IUpdateRowRequest}>({
			query: (opt) => ({
				url:`/${opt.id}/update`,
				method: 'POST',
				body: opt.body
			}),
			// invalidatesTags:['rows']
		}),

		deleteRow: build.mutation<IRowResponse, number>({
			query: (rId) => ({
				url:`/${rId}/delete`,
				method: 'DELETE',
			}),
			transformResponse: (r:IRowResponse)=>{
				console.log('delete Row r === ',r)
				return r
			}
			// invalidatesTags:['rows']
		})
	})
})
