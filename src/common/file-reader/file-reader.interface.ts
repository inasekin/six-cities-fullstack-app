interface FileReaderInterface {
  readonly fileName: string;
  read(): void;
}

export {FileReaderInterface};
