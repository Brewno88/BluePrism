import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { Close } from '../assets/icons/Close';
import { axiosRequest } from '../helpers/axiosRequest';
import { AppContext } from '../store/AppContext';

const AddLogModal = ({ close, refetchLogs }) => {
  // Context
  const { selected } = useContext(AppContext);
  // useStates
  const [values, setValues] = useState({
    serverName: '',
    status: '',
    startTime: '',
    endTime: '',
    scheduleId: selected.id
  });
  const [enabled, setEnabled] = useState(false);

  // React Query
  const { isLoading } = useQuery(
    [
      'addLog',
      {
        method: 'POST',
        endpoint: 'scheduleLogs',
        headers: { 'Content-Type': 'application/json' },
        data: values
      }
    ],
    axiosRequest,
    { enabled }
  );

  const handleChange = ({ target: { id, value } }) => {
    setValues(state => ({ ...state, [id]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setEnabled(true);
    setTimeout(() => {
      refetchLogs();
      close();
    }, 500);
  };

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center w-full h-full overflow-y-auto bg-gray-600 bg-opacity-50"
      id="my-modal"
    >
      <div className="z-20 w-full max-w-lg mx-4 cursor-default card">
        <form onSubmit={handleSubmit}>
          {/* Form Header */}
          <div className="flex items-center justify-between form-header ">
            <h3 className="text-lg font-bold ">{selected.name}</h3>
            <button className="flex items-center justify-center p-1 rounded-full btn">
              <Close onClick={close} />
            </button>
          </div>
          {/* Form Content */}
          <div className="py-4 form-content">
            <div className="form-section">
              <label htmlFor="serverName" className="form-label">
                Server Name
              </label>
              <input
                required
                onChange={handleChange}
                type="text"
                id="serverName"
                className="form-input"
                value={values.serverName}
              />
            </div>
            <div className="form-section">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <input
                required
                onChange={handleChange}
                type="text"
                id="status"
                className="form-input"
                value={values.status}
              />
            </div>
            <div className="form-section">
              <label htmlFor="startTime" className="form-label">
                Start Time
              </label>
              <input
                required
                onChange={handleChange}
                type="datetime-local"
                id="startTime"
                className="form-input"
                value={values.startTime}
              />
            </div>
            <div className="form-section">
              <label htmlFor="endTime" className="form-label">
                End Time
              </label>
              <input
                required
                onChange={handleChange}
                type="datetime-local"
                id="endTime"
                className="form-input"
                value={values.endTime}
              />
            </div>
            <div className="form-section">
              <label htmlFor="scheduleId" className="form-label">
                ScheduleId
              </label>
              <input
                required
                onChange={handleChange}
                type="number"
                id="scheduleId"
                disabled
                value={values.scheduleId}
              />
            </div>
          </div>
          {/* Form Actions */}
          <div className="flex justify-end form-actions">
            <button className="mr-2 btn" onClick={close}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn bg-active"
              disabled={isLoading || enabled}
            >
              {isLoading || enabled ? 'Loading' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLogModal;
