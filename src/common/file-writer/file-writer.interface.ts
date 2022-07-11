interface FileWriterInterface {
  readonly filename: string;
  write(row: string): void;
}

export {FileWriterInterface};
