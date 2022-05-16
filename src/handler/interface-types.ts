export interface HandlerParameters {
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

  readonly pipelines: Pipeline[];
  readonly alarms: Alarm[];
}

export interface HandlerResponse {
  readonly pipelines: PipelineStatus[];
  readonly alarms: AlarmStatus[];
}

export interface PipelineStatus {
  readonly displayName: string;
  readonly red: boolean;
  readonly link?: string;
}

export interface Pipeline {
  readonly pipelineName: string;
  readonly displayName?: string;
  readonly link?: string;
}

export interface Alarm {
  readonly alarmName: string;
  readonly displayName?: string;
  readonly link?: string;
}

export interface AlarmStatus {
  readonly displayName: string;
  readonly red: boolean;
  readonly link?: string;
}

export interface PipelineStatus {
  readonly displayName: string;
  readonly red: boolean;
  readonly link?: string;
}