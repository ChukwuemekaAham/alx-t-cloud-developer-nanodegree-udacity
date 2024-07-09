import { Params, Query } from 'express-serve-static-core';

type ParamsBase = Params;
type QueryBase = Query;
type RequestBase = {};
type ResponseBase = {
    success: boolean;
    message?: string;
    detail?: string;
};

export { ParamsBase, QueryBase, RequestBase, ResponseBase };