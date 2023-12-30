import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITreeResponse } from '../models/Row'
import { id } from './id'

export const Api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://185.244.172.108:8081/v1/outlay-rows/entity'
	}),
	endpoints: (build) => ({
		getRows: build.query<ITreeResponse[],void>({
			query: () => `${id}/row/list`,
			transformResponse: (res:ITreeResponse[] ) => {
				return res;
			},
		})
	})
})
