import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import ScheduleCard from './ScheduleCard';
import { axiosRequest } from '../helpers/axiosRequest';

const ScheduleCards = () => {
  // React Query
  const { isLoading, data } = useQuery(
    [
      'schedules',
      {
        method: 'GET',
        endpoint: 'schedules'
      }
    ],
    axiosRequest
  );

  return (
    <aside className="w-full max-w-xs pr-4 overflow-auto">
      {isLoading ? (
        <span>Loading</span>
      ) : (
        data.map((card, index) => {
          return <ScheduleCard key={card.id} card={card} index={index} />;
        })
      )}
    </aside>
  );
};

export default ScheduleCards;
