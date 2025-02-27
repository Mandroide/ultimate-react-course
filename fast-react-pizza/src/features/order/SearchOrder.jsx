import React from 'react';
import {useNavigate} from "react-router";
import {PATHS} from "../../utils/enums.js";

function SearchOrder() {
    const [query, setQuery] = React.useState('');
    const navigate = useNavigate()
    function handleSubmit(e) {
        e.preventDefault()
        if (!query) {
            return;
        }
        navigate(`${PATHS.ORDER.split(':')[0]}${query}`);
        setQuery('');
    }
    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Search order #"
                   pattern="[A-Za-z0-9]+"
                   type="search"
                   value={query}
                   onChange={e => setQuery(e.target.value)}
            className="rounded-full px-4 py-2 bg-yellow-100 text-sm placeholder:text-stone-400
            border-2 border-gray-200 sm:w-64 focus:w-72 sm:w-64
            transition-all duration-300 focus:outline-none focus:ring-yellow-500 focus:border-indigo-500"/>
        </form>

    );
}

export default SearchOrder;