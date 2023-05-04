import {MeanSummaryParameterDetails} from "./mean-summary-patiens";

export interface MeanSummaryGraph {
  graph1: SummaryDataParameter,
  graph2: SummaryDataParameter,
  graph3: SummaryDataParameter,
  graph4: SummaryDataParameter,
}

export interface SummaryDataParameter {
  dataLeft: summaryDataParameterDetails,
  dataRight: summaryDataParameterDetails,
}

export interface summaryDataParameterDetails {
  data: {}[],
  layout: {}
}
