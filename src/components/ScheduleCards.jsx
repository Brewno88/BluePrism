import React, { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import ScheduleCard from './ScheduleCard';
import { axiosRequest } from '../helpers/axiosRequest';

const ScheduleCards = () => {
  // useStates
  const [show, setShow] = useState('all');
  // React Query
  const { isLoading, data, refetch, isError } = useQuery(
    [
      'schedules',
      {
        method: 'GET',
        endpoint: 'schedules',

        params:
          show === 'all'
            ? {}
            : {
                isRetired: Boolean(show === 'retired')
              }
      }
    ],
    axiosRequest,
    // Reduce cache if we want to keep the list updated when toggle retire and then switch list
    { cacheTime: 1 }
  );

  const handleShow = useCallback(e => {
    setShow(e.target.value);
  }, []);
  if (isError) return <div>Something's Wrong!</div>;
  return (
    <aside className="w-full pb-4 overflow-x-auto overflow-y-hidden md:pr-4 md:overflow-x-hidden md:overflow-y-scroll md:max-w-xs max-w-none md:pb-0">
      <div className="sticky top-0 flex justify-between pb-4 bg-white">
        <span>Show: {data?.length}</span>
        <div>
          <button
            className={`btn ${show === 'all' ? 'bg-active' : ''}`}
            value="all"
            onClick={handleShow}
          >
            All
          </button>
          <button
            className={`btn mx-2 ${show === 'retired' ? 'bg-active' : ''}`}
            value="retired"
            onClick={handleShow}
          >
            Retire
          </button>
          <button
            className={`btn ${show === 'unretired' ? 'bg-active' : ''}`}
            value="unretired"
            onClick={handleShow}
          >
            Un-retired
          </button>
        </div>
      </div>
      {isLoading ? (
        <span>Loading</span>
      ) : (
        <div className="flex items-stretch pb-2 overflow-x-auto md:flex-col md-pb-0">
          {data.map((card, index) => {
            return (
              <ScheduleCard
                key={card.id}
                card={card}
                index={index}
                refetchCards={refetch}
              />
            );
          })}
        </div>
      )}
    </aside>
  );
};

export default ScheduleCards;
