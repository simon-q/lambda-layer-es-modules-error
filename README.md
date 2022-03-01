# lambda-layer-es-modules-error
This test shows failing es modules import from a lambda layer.
There are two functions - one with commonjs require that works and another one with es modules import that should work but it doesn't unless we specify full path.

# Prerequisites
- AWS CLI v2
- AWS CDK v2
- Node v14

## Deployment
```
cd cdk
export CDK_DEFAULT_ACCOUNT=<your account>
export CDK_DEFAULT_REGION=<region where you want to deploy>
cdk deploy
```

## Run
### Run commonjs lambda:
```
aws lambda invoke --function-name <name of commonjs lambda> response.json
```
It will work and it will return:
```
{
    "StatusCode": 200,
    "ExecutedVersion": "$LATEST"
}
```

### Run es modules lambda:
```
aws lambda invoke --function-name <name of es modules lambda> response.json
```
It will fail and it will return:
```
{
    "StatusCode": 200,
    "FunctionError": "Unhandled",
    "ExecutedVersion": "$LATEST"
}
```
The error says:
```
"errorMessage": "Cannot find package '@aws-sdk/url-parser' imported from /var/task/index.js\nDid you mean to import @aws-sdk/url-parser/dist-cjs/index.js?"
```

Importing from `@aws-sdk/url-parser/dist-cjs/index.js` does not fix it.

The error goes away only after using the full path: `/opt/nodejs/node_modules/@aws-sdk/url-parser/dist-cjs/index.js`
