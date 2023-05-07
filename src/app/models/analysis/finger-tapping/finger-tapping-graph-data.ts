export interface FingerTappingGraphData {
  period: string,
  dataTouchTime: FingerTappingDataParameter,
  dataUpTime: FingerTappingDataParameter,
  dataIntertapInterval: FingerTappingDataParameter,
  dataTouchTimeMean: FingerTappingDataParameter,
  dataUpTimeMean: FingerTappingDataParameter,
  dataIntertapIntervalMean: FingerTappingDataParameter
}

export interface FingerTappingGraphDataMeans {
  period: string,
  touchTimeBeforeLeft: FingerTappingDataParameter,
  touchTimeBeforeRight: FingerTappingDataParameter,
  upTimeBeforeLeft: FingerTappingDataParameter,
  upTimeBeforeRight: FingerTappingDataParameter,
  intertapIntervalBeforeLeft: FingerTappingDataParameter
  intertapIntervalBeforeRight: FingerTappingDataParameter
  touchTimeAfterLeft: FingerTappingDataParameter,
  touchTimeAfterRight: FingerTappingDataParameter,
  upTimeAfterLeft: FingerTappingDataParameter,
  upTimeAfterRight: FingerTappingDataParameter,
  intertapIntervalAfterLeft: FingerTappingDataParameter
  intertapIntervalAfterRight: FingerTappingDataParameter
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
