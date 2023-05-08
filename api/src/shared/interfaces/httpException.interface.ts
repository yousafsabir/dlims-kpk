export interface HttpExceptionI extends Error {
    status: number
    details?: any
}