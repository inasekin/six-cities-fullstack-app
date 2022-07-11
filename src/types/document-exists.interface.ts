interface DocumentExistsInterface {
  exists(documentId: string): Promise<boolean>;
}

export {DocumentExistsInterface};
