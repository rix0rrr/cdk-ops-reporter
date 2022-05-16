import { App, Stack, StackProps, aws_cloudwatch as cw, aws_codepipeline as cp, aws_codepipeline_actions as cpa, aws_codebuild as cb } from 'aws-cdk-lib';
import { Asset } from 'aws-cdk-lib/aws-s3-assets';
import { Construct } from 'constructs';
import { OpsReporter } from '../src';

class TestOpsReporterStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const alarm = new cw.Alarm(this, 'SomeAlarm', {
      evaluationPeriods: 10,
      metric: new cw.Metric({ namespace: 'Fake', metricName: 'DoesntExist' }),
      threshold: 5,
    });

    const fileAsset = new Asset(this, 'FileAsset', {
      path: __dirname,
    });

    const source = new cp.Artifact();

    const project = new cb.PipelineProject(this, 'Project', {
      buildSpec: cb.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          build: {
            commands: ['false'],
          },
        },
      }),
    });

    const pipe = new cp.Pipeline(this, 'Pipeline', {
      stages: [
        {
          stageName: 'Source',
          actions: [
            new cpa.S3SourceAction({
              actionName: 'Source',
              bucket: fileAsset.bucket,
              bucketKey: fileAsset.s3ObjectKey,
              output: source,
            }),
          ],
        },
        {
          stageName: 'Build',
          actions: [
            new cpa.CodeBuildAction({
              actionName: 'Build',
              project,
              input: source,
            }),
          ],
        },
      ],
    });

    const reporter = new OpsReporter(this, 'Reporter');
    reporter.addAlarm(alarm);
    reporter.addPipeline(pipe);
  }
}


const app = new App();
new TestOpsReporterStack(app, 'TestOpsReporter');
app.synth();