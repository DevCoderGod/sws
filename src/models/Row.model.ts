export interface IRowBase {
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

export interface IRow extends IRowBase {
	parentId: number | null
	level:number
}

export interface ICreateRowRequest extends Omit<IRowBase, 'total'|'id'> {
	parentId: number | null
}

export interface IUpdateRowRequest extends Omit<IRowBase, 'total'|'id'> {}

export interface IRowResponse {
	changed: IRowBase[]
	current: IRowBase
}

export interface ITreeResponse extends IRowBase {
	child: ITreeResponse[]
}