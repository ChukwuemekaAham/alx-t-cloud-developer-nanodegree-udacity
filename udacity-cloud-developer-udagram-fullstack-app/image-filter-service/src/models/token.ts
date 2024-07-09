import { ParamsBase, QueryBase, RequestBase, ResponseBase } from './base';

type TokenRequestParams = ParamsBase;
type TokenRequestQuery = QueryBase;
type TokenRequestBody = RequestBase;
type TokenResponseBody = ResponseBase & {
  token: string;
}

export {
  TokenRequestParams,
  TokenRequestQuery,
  TokenRequestBody,
  TokenResponseBody,
};