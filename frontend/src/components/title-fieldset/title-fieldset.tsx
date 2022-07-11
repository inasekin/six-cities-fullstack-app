import { memo } from 'react';
import { FormAction, FormActionType } from '../../types/edit-form';

type TitleFieldsetProps = {
  dispatch: (value: FormAction) => void;
  title: string;
  isPremium: boolean;
};


function TitleFieldset({ dispatch, title, isPremium }: TitleFieldsetProps) {
  return (
    <fieldset className="title-fieldset">
      <div className="form__input-wrapper">
        <label htmlFor="title" className="title-fieldset__label">
          Title
        </label>
        <input
          className="form__input title-fieldset__text-input"
          placeholder="Title"
          name="title"
          id="title"
          required
          maxLength={100}
          minLength={10}
          value={title}
          onChange={(evt) =>
            dispatch({
              type: FormActionType.setTitle,
              payload: evt.target.value,
            })}
        />
      </div>
      <div className="title-fieldset__checkbox-wrapper">
        <input
          className="form__input"
          type="checkbox"
          name="isPremium"
          id="isPremium"
          checked={isPremium}
          onChange={(evt) =>
            dispatch({
              type: FormActionType.setIsPremium,
              payload: evt.target.checked ? 'true' : 'false',
            })}
        />
        <label htmlFor="isPremium" className="title-fieldset__checkbox-label">
          Premium
        </label>
      </div>
    </fieldset>
  );
}

export default memo(TitleFieldset);
