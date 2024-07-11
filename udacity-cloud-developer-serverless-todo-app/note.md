# Backend
The serverless.yml file, your starting point, has the pre-built endpoints referencing to the the following handler functions:

```javascript
# Your TODO: tasks to implement
└── backend
    ├── serverless.yml                    #TODO:
    └── src
        ├── auth
        └── lambda
            ├── auth
            │   └── auth0Authorizer.ts    #TODO:
            └── http
                ├── createTodo.ts         #TODO:
                ├── deleteTodo.ts         #TODO:
                ├── generateUploadUrl.ts  #TODO:
                ├── getTodos.ts           #TODO:
                └── updateTodo.ts         #TODO:
The handler functions above, in turn, will require additional helpers function. The helper files in this following directory handle different layers like businessLogic, dataLayer, and fileStorage, thereby following a "separation of concerns" strategy.

# Your TODO: tasks to implement
└── backend
    └── src
        ├── auth
        └── helpers					# Handle different layers
            ├── todos.ts            # TODO: Implement businessLogic
            ├── todosAcess.ts       # TODO: Implement dataLayer
            └── attachmentUtils.ts  # TODO: Implement: fileStorage 
Tip: In the handler/helper functions, use async/await constructs instead of passing callbacks, to get results of asynchronous operations.

You need to implement all the handler and helper functions listed above. Here is the detailed list:

Auth

This function is already defined in the serverless file.
See the /backend/src/lambda/auth/auth0Authorizer.ts file for your specific tasks. This function should implement a custom authorizer for API Gateway that should be added to all other functions.
GetTodos

In the serverless file, provide iamRoleStatements property for performing necessary Actions on DynamoDB
See the /backend/src/lambda/http/getTodos.ts file. It should return all TODOs for a current user. A user id can be extracted from a JWT token that is sent by the frontend. It should return data that looks like this:
{
"items": [
{
    "todoId": "123",
    "createdAt": "2019-07-27T20:01:45.424Z",
    "name": "Buy milk",
    "dueDate": "2019-07-29T20:01:45.424Z",
    "done": false,
    "attachmentUrl": "http://example.com/image.png"
},
{
    "todoId": "456",
    "createdAt": "2019-07-27T20:01:45.424Z",
    "name": "Send a letter",
    "dueDate": "2019-07-29T20:01:45.424Z",
    "done": true,
    "attachmentUrl": "http://example.com/image.png"
},
]
}
CreateTodo
In the serverless file, provide iamRoleStatements property. Decide the Actions and AWS Resource.
See the /backend/src/lambda/http/createTodos.ts file. It should create a new TODO for a current user. A shape of data send by a client application to this function can be found in the /backend/src/requests/CreateTodoRequest.ts file. It receives a new TODO item to be created in JSON format that looks like this:
{
      "createdAt": "2019-07-27T20:01:45.424Z",
      "name": "Buy milk",
      "dueDate": "2019-07-29T20:01:45.424Z",
      "done": false,
      "attachmentUrl": "http://example.com/image.png"
}
It should return a new TODO item that should looks like this:

{
      "item": {
       "todoId": "123",
       "createdAt": "2019-07-27T20:01:45.424Z",
       "name": "Buy milk",
       "dueDate": "2019-07-29T20:01:45.424Z",
       "done": false,
       "attachmentUrl": "http://example.com/image.png"
}
}
UpdateTodo
See your task for this function the serveerless file.
See the /backend/src/lambda/http/updateTodo.ts file. It should update a TODO item created by a current user. A shape of data send by a client application to this function can be found in the /backend/src/requests/UpdateTodoRequest.ts file. It receives an object that contains three fields that can be updated in a TODO item:
{
    "name": "Buy bread",
    "dueDate": "2019-07-29T20:01:45.424Z",
    "done": true
}
The ID of an item that should be updated is passed as a URL parameter. It should return an empty body.

DeleteTodo

See your task for this function the serveerless file.
See the /backend/src/lambda/http/deleteTodo.ts file. It should delete a TODO item created by a current user. Expects an id of a TODO item to remove. It should return an empty body.
GenerateUploadUrl

Again, see your task for this function the serveerless file.
See the /backend/src/lambda/http/generateUploadUrl.ts file. It returns a pre-signed URL that can be used to upload an attachment file for a TODO item. It should return a JSON object that looks like this:
{
 "uploadUrl": "https://s3-bucket-name.s3.eu-west-2.amazonaws.com/image.png"
}
All functions above are already connected to appropriate events from API Gateway.

CORS configuration in the handler functions
You can return correct headers in API handler responses, in either of the following two ways:

You can either include the CORS headers in the handler function, as:
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
const newTodo: CreateTodoRequest = JSON.parse(event.body);
// Write your logic here
.
.
.
return {
  statusCode: 201,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  },
  body: JSON.stringify({
    item: todoItem
  })
};
}
Otherwise, you can use middy(opens in a new tab) middleware package, for example:
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
      // Write your logic here
      .
      .
      .
      return undefined
  }
)
handler
  .use(httpErrorHandler())
  .use(
      cors({
        credentials: true
   })
)
Refer here(opens in a new tab) for more examples.

In addition, you must declare the function in the serverless.yml file with the CORS property as cors: true, see an example:

  <FUNCTION-NAME>:
    handler: <YOUR-HANDLER>
    events:
      - http:
          method: get
          path: todos
          cors: true
          authorizer: Auth
    iamRoleStatementsInherit: true
    iamRoleStatements:
      - Effect: Allow
        Action:
          - dynamodb:GetItem
          - dynamodb:UpdateItem
          - dynamodb:PutItem
        Resource: arn:aws:dynamodb:<TABLE-NAME>

AWS Resources
Next, you need to add necessary AWS resources to the resources section of the serverless.yml file, such as, DynamoDB table and S3 bucket. We have identifies the minimal set of AWS resources in the serverless file. Check it out.

For any help in the Resources section of the Serverless YAML file, refer to the examples below:

AWS::ApiGateway::GatewayResponse(opens in a new tab)
AWS::DynamoDB::Table(opens in a new tab)
AWS::S3::Bucket(opens in a new tab) - See the Enable cross-origin resource sharing example.
AWS::S3::BucketPolicy(opens in a new tab)
DynamoDB in the Serverless YAML file
Create DynamoDB table - To store TODO items, use a DynamoDB table with local secondary index(es)(opens in a new tab). You can refer to an example(opens in a new tab) of how to use LocalSecondaryIndex in your Serverless YAML file's resource section. Your DynamoDB resource code would like this:
 # Here "TodosTable" is the name for cross-referencing  in the serverless.yml file
 # It's not the name of the actual DynamoDB table. 
 TodosTable:
   Type: AWS::DynamoDB::Table
   Properties:
     AttributeDefinitions:
       - AttributeName: userId
         AttributeType: S
       - AttributeName: todoId
         AttributeType: S
       - AttributeName: createdAt
         AttributeType: S
     KeySchema:
       - AttributeName: userId
         KeyType: HASH
       - AttributeName: todoId
         KeyType: RANGE
     BillingMode: PAY_PER_REQUEST
     TableName: ${self:provider.environment.TODOS_TABLE}
     LocalSecondaryIndexes:
       - IndexName: ${self:provider.environment.TODOS_CREATED_AT_INDEX}
         KeySchema:
           - AttributeName: userId
             KeyType: HASH
           - AttributeName: createdAt
             KeyType: RANGE
         Projection:
           ProjectionType: ALL # What attributes will be copied to an index
In the code above, the userId is acting like a partitionKey, todoId as the sortKey, and createdAt as the indexKey. Also, it uses the variables defined in the provider.environment section at the top of the serverless.yaml file. For example:

  provider:
     stage: ${opt:stage, 'dev'}
     region: ${opt:region, 'us-east-1'}
     environment:
         TODOS_TABLE: Todos-${self:provider.stage}
         TODOS_CREATED_AT_INDEX: CreatedAtIndex
Do not copy the YAML code snippets from above, it may cause indentation issues during copying over.

Fetch data from DynamoDB table - To query an index you need to use the query() method like:
await this.dynamoDBClient
.query({
     TableName: 'table-name',
     IndexName: 'index-name',
     KeyConditionExpression: 'paritionKey = :paritionKey',
     ExpressionAttributeValues: {
       ':paritionKey': partitionKeyValue
     }
})
.promise()

```

# Best practices

## Validate HTTP requests
Validate incoming HTTP requests either in Lambda handlers or using request validation in API Gateway. The latter can be done either using the serverless-reqvalidator-plugin or by providing request schemas in function definitions.

## Application monitoring
The project application has at least some of the following:

1. Metrics: Generate application-level metrics

2. Enable the distributed tracing. We recommend to use AWS X-ray for this purpose. To do this, you will have to:

    - Enable X-ray tracing in the serverless YAML file

    - Instrument code in the handler functions to generate sub-segments. Meaning, wrap all AWS calls with X-ray SDK.

    - Once you deploy and test your API endpoints, you will need to check the Service map in the AWS X-Ray web console. View the traces

3. Logging: The application must have a sufficient amount of log statements. The starter code comes with a configured Winston(opens in a new tab) logger that creates JSON formatted(opens in a new tab) log statements. You can use it to write log messages like this:

```javascript
import { createLogger } from '../../utils/logger'
const logger = createLogger('auth')
// You can provide additional information with every log statement
// This information can then be used to search for log statements in a log storage system
logger.info('User was authorized', {
// Additional information stored with a log statement
key: 'value'
})

```

I would like to share this link about the [best practices for working with lambda functions](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html); I believe this information will be relevant for your future projects!


Consider that you are paying every time the lambda is called even if the request is not validated; you can reduce the cost of operation using JSON Schemas in the API gateway. The validation occurs in the API gateway before getting to the lambda function so you will pay only for lambda execution with valid requests.

You can read more about [JSON schemas properties here](https://json-schema.org/draft/2019-09/json-schema-validation.html)
This blog is very handy and explains very well [how to implement JSON Schemas in Serverless.](https://www.fernandomc.com/posts/schema-validation-serverless-framework/)

Incoming HTTP requests are validated either in Lambda handlers or using request validation in API Gateway. The latter can be done either using the serverless-reqvalidator-plugin or by providing request schemas in function definitions.

Items fetched using the "query()" method and not "scan()" method is less efficient on large datasets