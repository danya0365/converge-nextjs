/**
 * Automation Entity
 * Represents automation rules, flows, and AI chatbot configurations
 */

export type TriggerType =
  | "message_received"
  | "conversation_started"
  | "keyword"
  | "time_based"
  | "tag_added"
  | "assigned";
export type ActionType =
  | "send_message"
  | "assign_user"
  | "add_tag"
  | "close_conversation"
  | "create_ticket"
  | "webhook";
export type FlowStatus = "active" | "inactive" | "draft";

export interface AutoReplyRule {
  id: string;
  teamId: string;
  name: string;
  description?: string;
  enabled: boolean;
  priority: number;
  trigger: AutoReplyTrigger;
  conditions: AutoReplyCondition[];
  actions: AutoReplyAction[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AutoReplyTrigger {
  type: TriggerType;
  config: {
    keywords?: string[];
    exactMatch?: boolean;
    channelTypes?: string[];
    schedule?: {
      days?: number[];
      hours?: { start: string; end: string };
    };
  };
}

export interface AutoReplyCondition {
  field: string;
  operator:
    | "equals"
    | "not_equals"
    | "contains"
    | "not_contains"
    | "greater_than"
    | "less_than";
  value: string | number | boolean;
}

export interface AutoReplyAction {
  type: ActionType;
  config: {
    message?: string;
    userId?: string;
    tags?: string[];
    webhookUrl?: string;
    delay?: number; // in seconds
  };
}

export interface ChatbotFlow {
  id: string;
  teamId: string;
  name: string;
  description?: string;
  status: FlowStatus;
  nodes: FlowNode[];
  edges: FlowEdge[];
  entryNodeId: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface FlowNode {
  id: string;
  type:
    | "start"
    | "message"
    | "question"
    | "condition"
    | "action"
    | "ai"
    | "end";
  position: { x: number; y: number };
  data: FlowNodeData;
}

export interface FlowNodeData {
  label: string;
  message?: string;
  options?: FlowOption[];
  condition?: {
    field: string;
    operator: string;
    value: unknown;
  };
  action?: {
    type: ActionType;
    config: Record<string, unknown>;
  };
  aiPrompt?: string;
}

export interface FlowOption {
  id: string;
  label: string;
  value: string;
  nextNodeId?: string;
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  condition?: string;
}

export interface ChatbotSession {
  id: string;
  conversationId: string;
  flowId: string;
  currentNodeId: string;
  context: Record<string, unknown>;
  startedAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface AIAgent {
  id: string;
  teamId: string;
  name: string;
  description?: string;
  enabled: boolean;
  model: "gpt-4" | "gpt-3.5-turbo" | "claude-3" | "custom";
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  knowledgeBase: string[];
  fallbackMessage?: string;
  handoffRules: AIHandoffRule[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AIHandoffRule {
  condition: string;
  message?: string;
  assignToUser?: string;
  addTags?: string[];
}

export interface AIKnowledgeBase {
  id: string;
  teamId: string;
  name: string;
  type: "document" | "url" | "qa" | "api";
  content: string;
  embedding?: number[];
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface AIConversationLog {
  id: string;
  conversationId: string;
  agentId: string;
  prompt: string;
  response: string;
  tokensUsed: number;
  confidence: number;
  handedOff: boolean;
  createdAt: Date;
}
