import React, { useContext } from "react";
import { RecipeContext } from './App';

export default function SearchBar({ recipes }) {
    const { handleSearchQuery } = useContext(RecipeContext);

    return (
        <div className='search-bar'>
            <label className='search-font'
                htmlFor='search'>
                Search:
            </label>
            <input className='search-space'
                type='text'
                name='search'
                id='search'
                onChange={e => handleSearchQuery(e.target.value)}
            />
      </div>
    );
}