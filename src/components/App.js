import React, { useEffect, useState } from 'react';
import RecipeList from './RecipeList';
import RecipeEdit from './RecipeEdit';
import SearchBar from './SearchBar';
import '../css/app.css'
import { v4 as uuidv4 } from 'uuid';

export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes';

function App() {

  /* set the state of recipes to a function that will return the initial value
      it'll return either whatever is stored
      or if there is nothing stored, it will return the default sampleRecipes we have
  */
  const [recipes, setRecipes] = useState(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (recipeJSON === null) return sampleRecipes
      else { return JSON.parse(recipeJSON) }
  })

  // state to manage current selected recipe
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)

  // state to manage categorySelection
  const [selectedCategories, setSelectedCategories] = useState('');
  // state to manage searchQuery
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecipes = recipes.filter(recipe => {
    for (let i=0; i<searchQuery.length; i++) {
      if (searchQuery.toLowerCase()[i] !== recipe.name.toLowerCase()[i]) {
        return false;
      }
    }
    if (selectedCategories && selectedCategories !== recipe.category) {
      return false;
    }
    return true;
});



  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes]);

  /* Context (state management) that passes state down to any component that needs it without the need for drilling */
  const recipeContextValue = {
    handleRecipeAdd: handleRecipeAdd,
    handleRecipeDelete: handleRecipeDelete,
    handleRecipeSelect: handleRecipeSelect,
    handleRecipeChange: handleRecipeChange,
    handleSearchQuery: handleSearchQuery,
    handleSetSelectedCategories: handleSetSelectedCategories
  }

  return (
    <RecipeContext.Provider value = {recipeContextValue}>
      <SearchBar />
      <RecipeList filteredRecipes={filteredRecipes} />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </RecipeContext.Provider>
  )  

  function handleSetSelectedCategories(category) {
    setSelectedCategories(category);
  }

  function handleSearchQuery(search) {
    setSearchQuery(search);
  }

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id);
  }

  function handleRecipeAdd() {
    const newRecipe = {
      category: '',
      id: uuidv4(),
      name: '',
      servings: 1,
      cookTime: '',
      instructions: '',
      ingredients: [
        { id: uuidv4(), name: '', amount: '' }
      ]
    }
    setSelectedRecipeId(newRecipe.id);
    setRecipes([...recipes, newRecipe])
  }

  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes];
    const index = newRecipes.findIndex(r => r.id === id);
    newRecipes[index] = recipe;
    setRecipes(newRecipes);
  }

  function handleRecipeDelete(id) {
    if (selectedRecipeId !== null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined);
    }
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  }

}


const sampleRecipes = [
  {
    category: 'Entree',
    id: 1,
    name: 'Plain Chicken',
    servings: 3,
    cookTime: '1:45',
    instructions: '1. Put salt on Chicken\n 2. Put chicken in oven\n 3. Eat the chicken',
    ingredients: [
      {
        id: 1,
        name: 'Chicken',
        amount: '2 Pounds'
      },
      {
        id: 2,
        name: 'Salt',
        amount: '1 Tbs'
      }
    ]
  },
  {
    category: 'Entree',
    id: 2,
    name: 'Plain Pork',
    servings: 5,
    cookTime: '0:45',
    instructions: '1. Put paprika on pork\n 2. Put pork in oven\n 3. Eat the pork',
    ingredients: [
      {
        id: 1,
        name: 'Pork',
        amount: '3 Pounds'
      },
      {
        id: 2,
        name: 'Paprika',
        amount: '2 Tbs'
      }
    ]
  },
]

export default App;
