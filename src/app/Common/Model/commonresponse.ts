export interface ServerResponse<T>
{
    Success : boolean,
    Data : T,
    Message? : string
}