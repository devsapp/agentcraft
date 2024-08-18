export enum DataSetType {
    QUESTION = 1,
    DOCUMENT = 2
}
export interface DataSetRequestPayload {
    name: string,
    description: string,
    dataset_type: DataSetType | string
}


export interface DataSet {
    id: number,
    description: string,
    created: string,
    user_id: number,
    name: string,
    dataset_type: number, // 1 question 精确数据集 2 document 模糊数据集
    modified: string
}