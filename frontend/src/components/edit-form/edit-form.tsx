import { useReducer, Reducer } from 'react';
import TitleFieldset from '../title-fieldset/title-fieldset';
import TypeFieldset from '../type-filedset/type-fieldset';
import GoodsList from '../goods-list/goods-list';
import LocationPicker from '../location-picker/location-picker';
import { Offer } from '../../types/offer';
import { NewOffer } from '../../types/new-offer';
import { FormAction, FormActionType } from '../../types/edit-form';
import { formReducer } from './edit-form.reducer';

type EditFormProps<T> = {
  offer: T;
  onSubmit: (offerData: T) => void;
};

function EditForm<T extends Offer | NewOffer>({
  offer,
  onSubmit,
}: EditFormProps<T>) {
  const [offerData, dispatchOfferData] = useReducer<Reducer<T, FormAction>>(
    formReducer,
    offer
  );

  const {
    title,
    description,
    city,
    previewImage,
    isPremium,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    location,
  } = offerData;

  return (
    <form
      className="form edit-form"
      action="#"
      method="post"
      onSubmit={(evt) => {
        evt.preventDefault();
        onSubmit(offerData);
      }}
    >
      <TitleFieldset
        dispatch={dispatchOfferData}
        title={title}
        isPremium={isPremium}
      />
      <div className="form__input-wrapper">
        <label htmlFor="description" className="edit-form__label">
          Description
        </label>
        <textarea
          className="form__input edit-form__textarea"
          placeholder="Description"
          name="description"
          id="description"
          required
          maxLength={1024}
          minLength={20}
          value={description}
          onChange={(evt) =>
            dispatchOfferData({
              type: FormActionType.setDescription,
              payload: evt.target.value,
            })}
        />
      </div>
      <div className="form__input-wrapper">
        <label htmlFor="previewImagee" className="edit-form__label">
          Preview Image
        </label>
        <input
          className="form__input edit-form__text-input"
          type="url"
          placeholder="Preview image"
          name="previewImage"
          id="previewImage"
          required
          defaultValue={previewImage}
          onChange={(evt) =>
            dispatchOfferData({
              type: FormActionType.setPreviewImage,
              payload: evt.target.value,
            })}
        />
      </div>
      <TypeFieldset
        dispatch={dispatchOfferData}
        type={type}
        price={price}
        bedrooms={bedrooms}
        maxAdults={maxAdults}
      />
      <GoodsList chosenGoods={goods} dispatch={dispatchOfferData} />
      <LocationPicker
        dispatch={dispatchOfferData}
        location={location}
        city={city}
      />
      <button className="form__submit button" type="submit">
        Save
      </button>
    </form>
  );
}

export default EditForm;
