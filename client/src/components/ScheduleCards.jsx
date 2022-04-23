import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import ScheduleCard from './ScheduleCard';

const ScheduleCards = () => {
  // React Query
  const { isLoading, data } = useQuery('schedules', async () => {
    const { data } = await axios('http://localhost:3000/schedules');
    return data;
  });
  console.log(data);
  return (
    <aside className="w-full max-w-xs pr-4">
      {isLoading ? (
        <span>Loading</span>
      ) : (
        data.map((card, index) => {
          return (
            <ScheduleCard
              key={card.id}
              card={card}
              hasMargin={index && index < data.length - 1}
            />
          );
        })
      )}
    </aside>
  );
};

export default ScheduleCards;
