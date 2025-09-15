declare module 'expo-ga4-logger/src' {
  export function logEventToGA4(
    apiSecret: string,
    measurementId: string,
    eventName: string,
    eventParams?: Record<string, any>
  ): Promise<void>;
}
