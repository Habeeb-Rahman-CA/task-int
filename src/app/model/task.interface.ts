export interface ITask{
    id?: number
    title: string
    description: string
    priority: 'High' | 'Medium' | 'Low'
    completed?: boolean
}