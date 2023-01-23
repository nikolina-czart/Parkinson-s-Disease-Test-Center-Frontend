import {UpDownChartResult} from "./UpDownChartResult";
import {StandardChartResult} from "./StandardChartResult";


export interface FingerTappingResult{
  medicineSupply: string,
  side: string,
  standardChart: StandardChartResult,
  upDownChartDTO: UpDownChartResult
}
