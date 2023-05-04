export interface TremorGraphData {
  period: string,
  meanByDayX: TremorDataParameter;
  meanByDayY: TremorDataParameter;
  meanByDayZ: TremorDataParameter;
  aggregatedMeanByDay: TremorDataParameter;
  differenceMeanByDayX: TremorDataParameter;
  differenceMeanByDayY: TremorDataParameter;
  differenceMeanByDayZ: TremorDataParameter;
}

export interface TremorDataParameter {
  data: {}[],
  layout: {}
}
