interface DatabaseInterface {
  connect(uri: string): Promise<void>;
  disconnect(): Promise<void>;
}

export {DatabaseInterface};
