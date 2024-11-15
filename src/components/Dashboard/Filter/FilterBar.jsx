import React, { useState, useEffect } from 'react';
import StatusDropdown from '../StatusDropdown/StatusDropdown';
import DateUploadPopup from '../DateUploadPopup/DateUploadPopup';
// import { errorFactory } from "less-loader/dist/utils";
import { Popover } from 'antd';
import './FilterBarStyle.css';
import { CloseOutlined } from '@ant-design/icons';

const FilterBar = ({ externalQuery }) => {
    const initialQueryState = {
        name: '',
        status: [],
        startDate: null,
        endDate: null,
    };
    const [query, setQuery] = useState({
        name: '',
        status: [],
        startDate: null,
        endDate: null,
    });
    const [inputError, setInputError] = useState({
        name: '',
        date: '',
    });
    const [isResetEnabled, setIsResetEnabled] = useState(false);
    // console.log(query);
    // console.log(JSON.stringify(query) !== JSON.stringify(initialQueryState));

    useEffect(() => {
        const hasQueryChanged =
            JSON.stringify(query) !== JSON.stringify(initialQueryState);
        setIsResetEnabled(hasQueryChanged);
    }, [query, externalQuery, isResetEnabled]);

    // console.log("query", query);

    useEffect(() => {
        if (externalQuery) {
            if (externalQuery.name) {
                setQuery((previousQuery) => ({
                    ...previousQuery,
                    name: externalQuery.name,
                }));
            }
            if (externalQuery.status) {
                setQuery((previousQuery) => ({
                    ...previousQuery,
                    status: externalQuery.status,
                }));
            }
            if (externalQuery.startDate) {
                setQuery((previousQuery) => ({
                    ...previousQuery,
                    startDate: externalQuery.startDate,
                }));
            }
            if (externalQuery.endDate) {
                setQuery((previousQuery) => ({
                    ...previousQuery,
                    endDate: externalQuery.endDate,
                }));
            }
        }
    }, [externalQuery]);

    const handleNameChange = (e) => {
        const value = e.target.value.trim();
        setQuery({ ...query, name: value });
        if (value.length < 2 && value !== '') {
            setInputError({ name: 'Name must be at least 2 characters' });
        } else if (value.length > 50) {
            setInputError({ name: 'Name must be less than 50 characters' });
        } else {
            setInputError({ name: '' });
        }
    };

    const handleStatusChange = (selectedStatusList) => {
        setQuery((previousQuery) => ({
            ...previousQuery,
            status: selectedStatusList,
        }));
    };

    const handleDateChange = (selectedStartDate, selectedEndDate) => {
        const today = new Date();
        const isStartDateValid =
            selectedStartDate && selectedStartDate <= today;
        const isEndDateValid = selectedEndDate && selectedEndDate <= today;

        setInputError({ date: '' });
        if (selectedStartDate && selectedEndDate) {
            if (selectedStartDate > selectedEndDate) {
                setInputError({
                    date: 'Start date must be earlier than or equal to end date.',
                });
                return;
            }
        }

        if (!isStartDateValid && selectedStartDate !== null) {
            setInputError({ date: 'Start date must not be later than today.' });
            return;
        }

        if (!isEndDateValid && selectedEndDate !== null) {
            setInputError({ date: 'End date must not be later than today.' });
            return;
        }
        setQuery((previousQuery) => ({
            ...previousQuery,
            startDate: selectedStartDate,
            endDate: selectedEndDate,
        }));
    };

    const handleReset = () => {
        setQuery(initialQueryState);
        setInputError({ name: '', date: '' });
    };

    return (
        <div className="flex items-center gap-4 py-4">
            <div>
                <Popover
                    content={inputError.name}
                    open={!!inputError.name}
                    placement="top"
                >
                    <input
                        type="text"
                        placeholder="Filter name..."
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={query.name}
                        onChange={handleNameChange}
                    />
                </Popover>
            </div>

            <StatusDropdown
                selectedStatusList={query.status}
                onStatusChange={handleStatusChange}
            />

            <Popover
                content={inputError.date}
                open={!!inputError.date}
                placement="top"
                overlayClassName="custom-popover"
            >
                <DateUploadPopup
                    selectedStartDate={query.startDate}
                    selectedEndDate={query.endDate}
                    onDateChange={handleDateChange}
                />
            </Popover>

            {isResetEnabled && (
                <button
                    className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none text-sm font-semibold"
                    onClick={() => handleReset()}
                >
                    Reset
                    <CloseOutlined className="ml-2" />
                </button>
            )}
            {/* {<p>{JSON.stringify(query)}</p>} */}
        </div>
    );
};

export default FilterBar;
