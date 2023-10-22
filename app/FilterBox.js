import React, { useState, useEffect } from 'react';

const FilterBox = () => {
    const [ filters, setFilters ] = useState([]);

    useEffect(() => {
        fetch('/api/filters')
            .then(response => response.json())
            .then(data => setFilters(data));
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(filters => ({
            ...filters,
            [name]: value,
        }));
    }

    const renderFilters = () => {
        return filters.map((filter, index) => (
            <button key = {index} name = {filter.name} value = {filter.value} onClick = {handleFilterChange}>
                {filter.name}
            </button>
        ));
    }

    return (
        <div>
            <h1>Filter</h1>
            <div>
                {renderFilters()}
            </div>
        </div>
    );
};