import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import type { Pipeline, Alarm, HandlerParameters, AlarmStatus, HandlerResponse } from './interface-types';

const REGION = process.env.AWS_REGION ?? 'here';;

const cwClient = new AWS.CloudWatch();
const cpClient = new AWS.CodePipeline();

const parameters: HandlerParameters = JSON.parse(process.env.PARAMETERS ?? '{}');

export async function handler(ev: APIGatewayEvent): Promise<APIGatewayProxyResult> {
  const response: HandlerResponse = {
    alarms: await Promise.all(parameters.alarms.map(fetchAlarmState)),
    pipelines: await Promise.all(parameters.pipelines.map(fetchPipelineState)),
  };

  if (ev.queryStringParameters?.format === 'html') {
    return {
      statusCode: 200,
      body: renderResponse(response),
      headers: {
        'Content-Type': 'text/html',
      },
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(response),
    headers: {
      'Content-Type': 'application/json',
    },
  };
}

async function fetchAlarmState(alarm: Alarm): Promise<AlarmStatus> {
  const response = await cwClient.describeAlarmHistory({
    AlarmName: alarm.alarmName,
    AlarmTypes: ['CompositeAlarm', 'MetricAlarm'],
    HistoryItemType: 'StateUpdate',
    ScanBy: 'TimestampDescending',
    MaxRecords: 10,
  }).promise();

  // The interesting data is in the 'HistoryData' field
  const items = (response.AlarmHistoryItems ?? []).map(item => JSON.parse(item.HistoryData ?? '{}'));

  // Newest is up front
  const red = items.length > 0 && items[0].newState?.stateValue === 'ALARM';
  // TODO: visualize history

  return {
    displayName: alarm.displayName ?? alarm.alarmName,
    link: federate(alarm.link ?? `https://${REGION}.console.aws.amazon.com/cloudwatch/home?region=${REGION}#alarmsV2:alarm/${alarm.alarmName}`),
    red,
  };
}

async function fetchPipelineState(pipe: Pipeline) {
  const response = await cpClient.listPipelineExecutions({
    pipelineName: pipe.pipelineName,
    maxResults: 5,
  }).promise();

  // Find the first one that isn't "in progress"
  const current = (response.pipelineExecutionSummaries ?? []).find(x => x.status === 'Failed' || x.status === 'Succeeded');
  const red = current?.status === 'Failed';

  // TODO: visualize history
  return {
    displayName: pipe.displayName ?? pipe.pipelineName,
    link: federate(pipe.link ?? `https://${REGION}.console.aws.amazon.com/codesuite/codepipeline/pipelines/${pipe.pipelineName}/view?region=${REGION}`),
    red,
  };
}

function federate(link: string) {
  if (!parameters.federationLink) {
    return link;
  }

  if (parameters.federationImpliesConsole) {
    link = link.replace(/^http.*\.console\.aws\.amazon\.com/, '');
  }

  return parameters.federationLink.replace('{}', encodeURIComponent(link));
}

function renderResponse(response: HandlerResponse): string {
  const container = {
    'display': 'flex',
    'flex-wrap': 'wrap',
    'align-items': 'stretch',
    'gap': '10px',
  };
  const base = {
    'font-family': 'Verdana,Arial,Helvetica,sans-serif',
    'font-weight': 'bold',
    'padding': '0.2em',
    'text-align': 'center',
    'overflow': 'hidden',
    'width': '15em',
    'text-decoration': 'none',
  };
  const redStyle = { 'background-color': '#FFBBBB', 'border': '1px solid red', 'color': 'red' };
  const greenStyle = { 'background-color': '#BBFFBB', 'border': '1px solid green', 'color': '#669966' };

  const ret = new Array<string>();
  ret.push(`<div style="${styles(container)}">`);
  for (const pipe of response.pipelines) {
    ret.push(renderCell(pipe.displayName, pipe.red, pipe.link));
  }
  for (const alarm of response.alarms) {
    ret.push(renderCell(alarm.displayName, alarm.red, alarm.link));
  }
  ret.push('</div>');
  return ret.join('');

  function renderCell(text: string, red: boolean, link?: string) {
    return [
      `<div style="${styles({ ...base, ...red ? redStyle : greenStyle })}" title="${escapeHTML(text)}">`,
      ...link ? [`<a href="${escapeHTML(link)}" target="_blank" style="color: inherit; text-decoration: inherit">`] : [],
      escapeHTML(text),
      ...link ? ['</a>'] : [],
      '</div>',
    ].join('');
  }

  function styles(xs: Record<string, string>) {
    return Object.entries(xs).map(([k, v]) => `${k}: ${v}`).join('; ');
  }

  function escapeHTML(str: string) {
    const replacements: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    };
    return str.replace(/[&<>'"]/g, tag => (replacements[tag] ?? ''));
  }
}

// CloudWatch HistoryData looks like
/*
{
  version: '1.0',
  oldState: {
    stateValue: 'OK',
    stateReason: 'Threshold Crossed: no datapoints were received for 3 periods and 3 missing datapoints were treated as [NonBreaching].',
    stateReasonData: {
      version: '1.0',
      queryDate: '2022-05-13T11:59:52.575+0000',
      statistic: 'Sum',
      period: 2700,
      recentDatapoints: [],
      threshold: 1,
      evaluatedDatapoints: [Array]
    }
  },
  newState: {
    stateValue: 'ALARM',
    stateReason: 'Threshold Crossed: 3 datapoints [4.0 (13/05/22 13:14:00), 5.0 (13/05/22 12:29:00), 1.0 (13/05/22 11:44:00)] were greater than or equal to the threshold (1.0).',
    stateReasonData: {
      version: '1.0',
      queryDate: '2022-05-13T13:59:52.472+0000',
      startDate: '2022-05-13T11:44:00.000+0000',
      statistic: 'Sum',
      period: 2700,
      recentDatapoints: [Array],
      threshold: 1,
      evaluatedDatapoints: [Array]
    }
  }
}
*/