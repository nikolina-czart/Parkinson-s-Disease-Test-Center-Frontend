export interface FingerTappingGraphData {
  period: string,
  dataTouchTime: FingerTappingDataParameter,
  dataUpTime: FingerTappingDataParameter,
  dataIntertapInterval: FingerTappingDataParameter,
  dataTouchTimeMean: FingerTappingDataParameter,
  dataUpTimeMean: FingerTappingDataParameter,
  dataIntertapIntervalMean: FingerTappingDataParameter
}

export interface FingerTappingDataParameter {
  data: {}[],
  layout: {}
}
