export interface AnalyticsOverview {
  readonly totalConversations: number;
  readonly totalMessages: number;
  readonly avgResponseTime: number;
  readonly avgSatisfactionScore: number;
  readonly activeVisitors: number;
  readonly period: AnalyticsPeriod;
}

export type AnalyticsPeriod = '24h' | '7d' | '30d' | '90d';

export interface AnalyticsTimeSeries {
  readonly metric: string;
  readonly period: AnalyticsPeriod;
  readonly dataPoints: readonly AnalyticsDataPoint[];
}

export interface AnalyticsDataPoint {
  readonly timestamp: string;
  readonly value: number;
}

export interface ConversationAnalytics {
  readonly conversationId: string;
  readonly messageCount: number;
  readonly duration: number;
  readonly satisfactionScore?: number;
  readonly resolved: boolean;
  readonly handedOff: boolean;
}

export interface TopQuery {
  readonly query: string;
  readonly count: number;
  readonly avgSatisfaction?: number;
}
