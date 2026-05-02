export interface ExceptionFilterResponse{
    statusCode: number;
    timestamp: string;
    path: string;
    method: string;
    message: string | string[];
}