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
                   onChange={e => setQuery(e.target.value)}/>
        </form>

    );
}

export default SearchOrder;