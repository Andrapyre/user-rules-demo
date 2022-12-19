export interface Mqtt {
  sendMessage: (topic: string, payload: Record<string, any>) => Promise<void>;
  subscribe: (topic: string) => Promise<void>;
}
