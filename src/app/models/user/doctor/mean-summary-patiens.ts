export interface MeanSummaryPatients {
  group: string,
  data: MeanSummaryParameter
}

export interface MeanSummaryParameter {
  touchTime: MeanSummaryParameterDetails;
  upTime: MeanSummaryParameterDetails;
  intertapInterval: MeanSummaryParameterDetails;
  meanX: MeanSummaryParameterDetails;
  meanY: MeanSummaryParameterDetails;
  meanZ: MeanSummaryParameterDetails;
  aggregated: MeanSummaryParameterDetails;
  differenceX: MeanSummaryParameterDetails;
  differenceY: MeanSummaryParameterDetails;
  differenceZ: MeanSummaryParameterDetails;
}

export interface MeanSummaryParameterDetails {
  dataLeft: number[];
  dataRight: number[];
}
