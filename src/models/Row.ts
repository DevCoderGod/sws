export interface IRow {
	equipmentCosts: number
	estimatedProfit: number
	id: number
	machineOperatorSalary: number
	mainCosts: number
	materials: number
	mimExploitation: number
	overheads: number
	rowName: string
	salary: number
	supportCosts: number
	total: number
}

export interface ICreateRowRequest extends Omit<IRow, 'total'|'id'> {
	parentId: number | null
}

export interface IUpdateRowRequest extends Omit<IRow, 'total'|'id'>{}

export interface IRowResponse {
	changed: IRow[]
	current: IRow
}

export interface ITreeResponse extends IRow {
	child: ITreeResponse[]
}