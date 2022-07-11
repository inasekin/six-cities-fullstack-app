interface CheckOwnerInterface {
  isOwner(userId: string, documentId: string): Promise<boolean>;
}

export {CheckOwnerInterface};
