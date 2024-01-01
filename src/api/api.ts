import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICreateRowRequest, IRowResponse, ITreeResponse, IUpdateRowRequest } from '../models/Row'
import { id } from './id'

export const Api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: `http://185.244.172.108:8081/v1/outlay-rows/entity/${id}/row`
	}),
	endpoints: (build) => ({

		getRows: build.query<ITreeResponse[],void>({
			query: () => 'list',
			transformResponse: (res:ITreeResponse[] ) => {
				return res;
			},
		}),

		createRow: build.mutation<IRowResponse, ICreateRowRequest>({
			query: (body) => ({
				url:'create',
				method: 'POST',
				body
			}),
		}),

		updateRow: build.mutation<IRowResponse, {id:number, body:IUpdateRowRequest}>({
			query: (opt) => ({
				url:`/${opt.id}/update`,
				method: 'POST',
				body: opt.body
			}),
		}),

		deleteRow: build.mutation<IRowResponse, number>({
			query: (rId) => ({
				url:`/${rId}/delete`,
				method: 'DELETE',
			})
		})
	})
})
