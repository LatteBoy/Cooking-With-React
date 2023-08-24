import React, { useState, useContext } from "react";
import Recipe from "./Recipe";
import { RecipeContext } from './App';

export default function RecipeList({ recipes }) {
  const { handleRecipeAdd } = useContext(RecipeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const filteredRecipes = recipes.filter(recipe => {
    return recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  });

  return (
    <div className='recipe-list'>
        <div>
          <label 
            htmlFor='search'>
            Search:
          </label>
          <input
            type='text'
            name='search'
            id='search'
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div>
        {filteredRecipes.map((recipe) => {
            return <Recipe key={recipe.id} {...recipe} />;
        })}
        </div>
        <div className='recipe-list__add-recipe-btn-container'>
          <button onClick={handleRecipeAdd} className='btn btn--primary'>Add Recipe</button> 
        </div>
    </div>
  );
}
