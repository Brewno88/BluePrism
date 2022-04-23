import React, { useCallback, useContext, useState } from 'react';
import { AppContext } from '../store/AppContext';
import { SELECT_CARD } from '../store/AppReducers';
import { axiosRequest } from '../helpers/axiosRequest';
import { useQuery } from 'react-query';

const ScheduleCard = ({ card, index }) => {
  // Context
  const { selected, dispatchSelected } = useContext(AppContext);

  // UseStates
  const [enabled, setEnabled] = useState(false);
  const [isRetired, setIsRetired] = useState(card.isRetired);

  // React Query
  const { isLoading } = useQuery(
    [
      'toggleRetire',
      {
        method: 'PUT',
        endpoint: `schedules/${card.id}`,
        data: { ...card, isRetired }
      }
    ],
    axiosRequest,
    // Need to set cacheTime to 0 otherwise req will only fire twice for each true/false state
    { enabled, cacheTime: 0 }
  );

  const handleSelect = useCallback(cardId => {
    dispatchSelected({ type: SELECT_CARD, payload: cardId });
  }, []);

  const handleToggleRetire = useCallback(e => {
    e.stopPropagation();
    setIsRetired(state => !state);
    setEnabled(true);
  }, []);

  return (
    <div
      className={`border-2 border-black rounded-xl p-2 cursor-pointer hover:shadow-xl ${
        index ? 'my-4' : ''
      } ${selected === card.id ? 'bg-slate-400 shadow-lg' : ''}`}
      onClick={() => {
        handleSelect(card.id);
      }}
    >
      <h2>{card.name}</h2>
      <p>{card.description}</p>
      <div className="flex justify-end">
        <button
          className="px-2 border-2 border-black rounded-md"
          onClick={handleToggleRetire}
          disabled={isLoading}
        >
          {isLoading ? 'Loading' : isRetired ? 'Un-retire' : 'Retire'}
        </button>
      </div>
    </div>
  );
};

export default ScheduleCard;
