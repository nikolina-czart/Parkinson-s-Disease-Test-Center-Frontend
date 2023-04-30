export interface HistogramFingerTapping {
  period: string,
  dataTouchTime: HistogramFingerTappingParameter,
  dataUpTime: HistogramFingerTappingParameter,
  dataIntertapInterval: HistogramFingerTappingParameter,
  dataTouchTimeMean: HistogramFingerTappingParameter,
  dataUpTimeMean: HistogramFingerTappingParameter,
  dataIntertapIntervalMean: HistogramFingerTappingParameter
}

export interface HistogramFingerTappingParameter {
  data: {}[],
  layout: {}
}
