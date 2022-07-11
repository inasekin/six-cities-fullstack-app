import { memo } from 'react';
import { FormAction, FormActionType } from '../../types/edit-form';
import { GOODS } from '../../const';

type GoodsListProps = {
  dispatch: (value: FormAction) => void;
  chosenGoods: string[];
};

function GoodsList({ chosenGoods, dispatch }: GoodsListProps) {
  const handleChange = (good: string, isChecked: boolean) => {
    let goods: string[];
    if (isChecked) {
      goods = [...chosenGoods, good];
    } else {
      goods = chosenGoods.filter((chosenGood) => chosenGood !== good);
    }
    dispatch({
      type: FormActionType.setGoods,
      payload: goods.join(', '),
    });
  };

  return (
    <fieldset className="goods-list">
      <h2 className="goods-list__title">Goods</h2>
      <ul className="goods-list__list">
        {GOODS.map((good) => (
          <li key={good} className="goods-list__item">
            <input
              type="checkbox"
              id={good}
              defaultChecked={chosenGoods.includes(good)}
              onChange={(evt) => handleChange(good, evt.target.checked)}
            />
            <label className="goods-list__label" htmlFor={good}>
              {good}
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

export default memo(
  GoodsList,
  (prevProps, nextProps) =>
    prevProps.chosenGoods.length === nextProps.chosenGoods.length
);
