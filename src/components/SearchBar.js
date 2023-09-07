import React, { useContext } from "react";
import { RecipeContext } from './App';

export default function SearchBar() {
    const { handleSearchQuery, handleSetSelectedCategories } = useContext(RecipeContext);

    return (
        <>
        <div className='search-bar-section'>
            <div>
                <label className='search-bar-font'
                    htmlFor='search'>
                    Search:
                </label>
                <input className='search-bar-space'
                    type='text'
                    name='search'
                    id='search'
                    onChange={e => handleSearchQuery(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor='searchCategory' className='search-bar-font'> Category: </label>
                <select 
                    name='searchCategory'
                    id='searchCategory'
                    className='search-category__label'
                    onChange={e => handleSetSelectedCategories(e.target.value)}
                >
                    <option value=''>Please select</option>
                    <option value='Appetizer'>Appetizer</option>
                    <option value='Entree'>Entree</option>
                    <option value='Dessert'>Dessert</option>
                </select>
            </div>
      </div>
      </>
    );
}