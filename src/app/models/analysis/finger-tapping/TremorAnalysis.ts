export interface TremorAnalysis {
  period: string;
  data: TremorAnalysisParameter;
}

export interface TremorAnalysisParameter {
  meanByDayX: TremorAnalysisParameterDetails;
  meanByDayY: TremorAnalysisParameterDetails;
  meanByDayZ: TremorAnalysisParameterDetails;
  aggregatedMeanByDay: TremorAnalysisParameterDetails;
  differenceMeanByDayX: TremorAnalysisParameterDetails;
  differenceMeanByDayY: TremorAnalysisParameterDetails;
  differenceMeanByDayZ: TremorAnalysisParameterDetails;
}

export interface TremorAnalysisParameterDetails {
  dataBeforeMedLeft: number[];
  dataBeforeMedRight: number[];
  dataAfterMedLeft: number[];
  dataAfterMedRight: number[];
}
