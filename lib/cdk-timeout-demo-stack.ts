import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Runtime, Function, Code} from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';

export class CdkTimeoutDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaFunction = new Function(this, 'my-lambda-function', {
      runtime: Runtime.NODEJS_20_X,
      memorySize: 1024,
      timeout: cdk.Duration.seconds(3),
      handler: 'index.hello',
      code: Code.fromAsset(join(__dirname, '/../lambda')),
    });
    let url = lambdaFunction.addFunctionUrl({authType: cdk.aws_lambda.FunctionUrlAuthType.NONE});
    new cdk.CfnOutput(this, 'function-url', {
      value: url.url
    })
  }
}
