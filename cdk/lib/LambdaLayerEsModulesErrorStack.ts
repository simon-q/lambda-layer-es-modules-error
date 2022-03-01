import { Stack, StackProps, aws_iam, aws_lambda } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class LambdaLayerEsModulesErrorStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // iam role for lambda
        const LambdaRole = new aws_iam.Role(
            this,
            'LambdaRole', {
                assumedBy: new aws_iam.ServicePrincipal('lambda.amazonaws.com'),
                managedPolicies: [
                    aws_iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
                ]
            }
        );

        // lambda layer
        const LambdaNodeModulesLayer = new aws_lambda.LayerVersion(this, 'LambdaNodeModulesLayer', {
            compatibleRuntimes: [
                aws_lambda.Runtime.NODEJS_14_X,
            ],
            code: aws_lambda.Code.fromAsset('../lambda_layer'),
            description: 'node_modules for LambdaFunction'
        });

        // lambda function - commonjs
        new aws_lambda.Function(
            this,
            'LambdaFunctionCommonJS',
            {
                code: aws_lambda.Code.fromAsset('../lambda_commonjs'),
                handler: './index.handler',
                runtime: aws_lambda.Runtime.NODEJS_14_X,
                role: LambdaRole,
                layers: [LambdaNodeModulesLayer]
            }
        );

        // lambda function - es modules
        new aws_lambda.Function(
            this,
            'LambdaFunctionEsModules',
            {
                code: aws_lambda.Code.fromAsset('../lambda_es_modules'),
                handler: './index.handler',
                runtime: aws_lambda.Runtime.NODEJS_14_X,
                role: LambdaRole,
                layers: [LambdaNodeModulesLayer]
            }
        );
    }
}
