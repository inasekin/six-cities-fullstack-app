export enum FormActionType {
  setTitle,
  setDescription,
  setCity,
  setPreviewImage,
  setIsPremium,
  setType,
  setBedrooms,
  setMaxAdults,
  setPrice,
  setGoods,
  setLocation,
}

export type FormAction = {
  type: FormActionType;
  payload: string;
};
