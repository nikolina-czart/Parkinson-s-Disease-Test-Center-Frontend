export interface FingerTappingGraphData {
  period: string,
  dataTouchTime: FingerTappingDataParameter,
  dataUpTime: FingerTappingDataParameter,
  dataIntertapInterval: FingerTappingDataParameter,
  dataTouchTimeMean: FingerTappingDataParameter,
  dataUpTimeMean: FingerTappingDataParameter,
  dataIntertapIntervalMean: FingerTappingDataParameter
}

export interface FingerTappingGraphDataViolin extends FingerTappingGraphData {
  dataTouchTimeSide: FingerTappingDataParameter,
  dataUpTimeSide: FingerTappingDataParameter,
  dataIntertapIntervalSide: FingerTappingDataParameter,
  dataTouchTimeMeanSide: FingerTappingDataParameter,
  dataUpTimeMeanSide: FingerTappingDataParameter,
  dataIntertapIntervalMeanSide: FingerTappingDataParameter
}

export interface FingerTappingDataParameter {
  data: {}[],
  layout: {}
}
