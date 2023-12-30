export interface IRow {
	equipmentCosts: number
	estimatedProfit: number
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

export interface ICreateRowRequest extends IRow {
	parentId: number
}

export interface ITreeResponse extends IRow {
	child: ITreeResponse[]
	id: number
}