import { ParamsBase, QueryBase, RequestBase, ResponseBase } from './base';

type FilteredImageRequestParams = ParamsBase;
type FilteredImageRequestQuery = QueryBase & {
  image_url: string;
};
type FilteredImageRequestBody = RequestBase;
type FilteredImageResponseBody = ResponseBase;

export {
  FilteredImageRequestParams,
  FilteredImageRequestQuery,
  FilteredImageRequestBody,
  FilteredImageResponseBody,
};
