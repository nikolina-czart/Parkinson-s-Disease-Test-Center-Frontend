import {FingerTappingAnalysisParameter} from "./finger-tapping-analysis-parameter";

export interface TremorAnalysis {
  period: string;
  data: FingerTappingAnalysisParameter;
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
