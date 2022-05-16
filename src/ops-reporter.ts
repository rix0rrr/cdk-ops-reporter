import { CfnOutput, Duration, Lazy, Stack } from 'aws-cdk-lib';
import * as cw from 'aws-cdk-lib/aws-cloudwatch';
import * as cp from 'aws-cdk-lib/aws-codepipeline';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { IndexFunction } from './handler/index-function';
import { HandlerParameters } from './handler/interface-types';

export interface OpsReporterProps {
  /**
   * Federation link with '{}' as placeholder
   */
  readonly federationLink?: string;

  /**
   * Drop the domain from the federation link
   *
   * @default false
   */
  readonly federationImpliesConsole?: boolean;

}

export class OpsReporter extends Construct {
  private readonly parameters: HandlerParameters;
  private readonly fn: lambda.Function;

  constructor(scope: Construct, id: string, props: OpsReporterProps = {}) {
    super(scope, id);
    const stack = Stack.of(this);

    this.parameters = {
      federationImpliesConsole: props.federationImpliesConsole,
      federationLink: props.federationLink,
      alarms: [],
      pipelines: [],
    };

    this.fn = new IndexFunction(this, 'Default', {
      description: 'Report on the state of pipelines and alarms',
      environment: {
        PARAMETERS: Lazy.string({ produce: () => stack.toJsonString(this.parameters) }),
      },
      timeout: Duration.minutes(1),
    });
    const url = this.fn.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ['*'],
      },
    });

    new CfnOutput(this, 'ReporterUrl', {
      value: url.url,
    });
  }

  public addPipeline(pipeline: cp.IPipeline, options: MonitorableOptions = {}) {
    this.parameters.pipelines.push({
      pipelineName: pipeline.pipelineName,
      displayName: options.displayName,
      link: options.link,
    });
    this.fn.addToRolePolicy(new iam.PolicyStatement({
      actions: ['codepipeline:ListPipelineExecutions'],
      resources: [pipeline.pipelineArn],
    }));
  }

  public addAlarm(alarm: cw.IAlarm, options: MonitorableOptions = {}) {
    this.parameters.alarms.push({
      alarmName: alarm.alarmName,
      displayName: options.displayName,
      link: options.link,
    });
    this.fn.addToRolePolicy(new iam.PolicyStatement({
      actions: ['cloudwatch:DescribeAlarmHistory'],
      resources: ['*'], // Need a '*' to report on composite alarms
    }));
  }
}

export interface MonitorableOptions {
  readonly displayName?: string;
  readonly link?: string;
}