import { memo } from 'react';
import Select from 'react-select';
import { FormAction, FormActionType } from '../../types/edit-form';
import { TYPES } from '../../const';
import { capitalize } from '../../utils';

type TypeFieldetProps = {
  dispatch: (value: FormAction) => void;
  type: string;
  price: number;
  bedrooms: number;
  maxAdults: number;
};

function TypeFieldet({
  dispatch,
  type,
  price,
  bedrooms,
  maxAdults,
}: TypeFieldetProps) {
  return (
    <fieldset className="type-fieldset">
      <div className="form__input-wrapper">
        <label htmlFor="type" className="type-fieldset__label">
          Type
        </label>
        <Select
          className="type-fieldset__select"
          classNamePrefix="react-select"
          name="type"
          id="type"
          defaultValue={{ value: type, label: capitalize(type) }}
          options={TYPES.map((typeItem) => ({
            value: typeItem,
            label: capitalize(typeItem),
          }))}
          onChange={(evt) =>
            dispatch({
              type: FormActionType.setType,
              payload: evt?.value ?? type,
            })}
        />
      </div>
      <div className="form__input-wrapper">
        <label htmlFor="price" className="type-fieldset__label">
          Price
        </label>
        <input
          className="form__input type-fieldset__number-input"
          type="number"
          placeholder="100"
          name="price"
          id="price"
          max={100000}
          min={100}
          defaultValue={price}
          onChange={(evt) =>
            dispatch({
              type: FormActionType.setPrice,
              payload: evt.target.value,
            })}
        />
      </div>
      <div className="form__input-wrapper">
        <label htmlFor="bedrooms" className="type-fieldset__label">
          Bedrooms
        </label>
        <input
          className="form__input type-fieldset__number-input"
          type="number"
          placeholder="1"
          name="bedrooms"
          id="bedrooms"
          required
          step={1}
          max={8}
          min={1}
          defaultValue={bedrooms}
          onChange={(evt) =>
            dispatch({
              type: FormActionType.setBedrooms,
              payload: evt.target.value,
            })}
        />
      </div>
      <div className="form__input-wrapper">
        <label htmlFor="maxAdults" className="type-fieldset__label">
          Max adults
        </label>
        <input
          className="form__input type-fieldset__number-input"
          type="number"
          placeholder="1"
          name="maxAdults"
          id="maxAdults"
          required
          step={1}
          max={10}
          min={1}
          defaultValue={maxAdults}
          onChange={(evt) =>
            dispatch({
              type: FormActionType.setMaxAdults,
              payload: evt.target.value,
            })}
        />
      </div>
    </fieldset>
  );
}

export default memo(TypeFieldet);
