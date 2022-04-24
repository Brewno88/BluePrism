import React, { useCallback, useContext, useState } from 'react';
import { AppContext } from '../store/AppContext';
import { SELECT_CARD } from '../store/AppReducers';
import { axiosRequest } from '../helpers/axiosRequest';
import { useQuery } from 'react-query';

const ScheduleCard = ({ card, index, refetchCards }) => {
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
    {
      enabled,
      // Remove cache otherwise req will only fire once for each true/false of "isRetired" state
      cacheTime: 0
    }
  );

  const handleSelect = useCallback(card => {
    dispatchSelected({
      type: SELECT_CARD,
      payload: { id: card.id, name: card.name }
    });
  }, []);

  const handleToggleRetire = useCallback(
    e => {
      e.stopPropagation();
      setIsRetired(state => !state);
      setEnabled(true);
      // Update Cards list
      setTimeout(() => {
        setEnabled(false);
        refetchCards();
      }, 500);
    },
    [refetchCards]
  );

  return (
    <div
      className={`card ${index ? 'mx-2 md:mx-0 md:my-4' : ''} ${
        selected?.id === card.id ? 'bg-active' : ''
      }`}
      onClick={() => {
        handleSelect(card);
      }}
    >
      <h2 className="whitespace-nowrap">{card.name}</h2>
      <p>{card.description}</p>
      <div className="flex items-end justify-end flex-1">
        <button
          className="btn"
          onClick={handleToggleRetire}
          disabled={isLoading || enabled}
        >
          {isLoading || enabled
            ? 'Loading'
            : isRetired
            ? 'Un-retire'
            : 'Retire'}
        </button>
      </div>
    </div>
  );
};

export default ScheduleCard;
