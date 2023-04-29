import {FingerTappingAnalysisDataSide} from "./finger-tapping-analysis-data-side";

export interface FingerTappingAnalysisData {
  period: string;
  data: {
    dataBeforeMed: FingerTappingAnalysisDataSide[],
    dataAfterMed: FingerTappingAnalysisDataSide[]
  }

}
