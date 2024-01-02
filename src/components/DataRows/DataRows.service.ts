import { ITreeResponse, IRow } from "../../models/Row.model"

export function getViewRows(data:ITreeResponse[] | undefined, level:number=0, parentId:number|null=null):IRow[]{
	if(!data) return []
	return data.map(row => [{level, parentId, ...row}, ...getViewRows(row.child, level+1, row.id)]).flat()
}

export function createViewRow(level:number, parentId:number):IRow{
	return {
		level,
		parentId,
		equipmentCosts: 0,
		estimatedProfit: 0,
		id: 0,
		machineOperatorSalary: 0,
		mainCosts: 0,
		materials: 0,
		mimExploitation: 0,
		overheads: 0,
		rowName: '',
		salary: 0,
		supportCosts: 0,
		total:0
	}
}
