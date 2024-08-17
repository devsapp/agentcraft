export interface DataSource {
    id: number,
    title: string,
    url: string,
    tag: number,
    question?:string,
    doc_chunk: string,
    chunk_idx: number,
    token_size: number,
    created: string,
    modified: string
}

export interface DocumentRequestPayload {
    title: string,
    url: string,
    tag: number,
    ext: string,
    content: string,
    chunk_size: number
}


export interface QuestionRequestPayload {
    question: string,
    tag: number,
    answer: string,
    title: string,
    url: string
}



