const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Rico Huijbers',
  authorAddress: 'rix0rrr@gmail.com',
  cdkVersion: '2.21.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-ops-reporter',
  repositoryUrl: 'https://github.com/rix0rrr/cdk-ops-reporter.git',

  description: 'A Lambda with a Function URL that publishes the state of alarms and pipelines on the web',
  lambdaAutoDiscover: true,
  releaseToNpm: true,

  // deps: [],                /* Runtime dependencies of this module. */
  devDeps: [
    '@types/aws-lambda',
    'aws-sdk',
  ],
  // packageName: undefined,  /* The "name" in package.json. */
});

project.synth();
