import React, { useCallback, useContext } from 'react';
import clearTitle from '../helpers/clearTitle';
import { AppContext } from '../store/AppContext';
import { SELECT_CARD } from '../store/AppReducers';

const ScheduleCard = ({ card, index }) => {
  const { selected, dispatchSelected } = useContext(AppContext);

  const handleSelect = useCallback(cardId => {
    dispatchSelected({ type: SELECT_CARD, payload: cardId });
  }, []);

  return (
    <div
      className={`border-2 border-black rounded-xl p-2 cursor-pointer hover:shadow-xl ${
        index ? 'my-4' : ''
      } ${selected === card.id ? 'bg-slate-400 shadow-lg' : ''}`}
      onClick={() => handleSelect(card.id)}
    >
      <h2>{clearTitle(card.name)}</h2>
      <p>{card.description}</p>
      <div className="flex justify-end">
        <button className="px-2 border-2 border-black rounded-md">
          Retire
        </button>
      </div>
    </div>
  );
};

export default ScheduleCard;
