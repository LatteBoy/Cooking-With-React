// import React, { useContext } from "react";
// import Recipe from "./Recipe";
// import { RecipeContext } from './App';


// export default function RecipeList({ filteredRecipes }) {
//   const { handleRecipeAdd } = useContext(RecipeContext);

//   return (
//     <div className='recipe-list'>
//         <div>
//         {filteredRecipes.map((recipe) => {
//             return <Recipe key={recipe.id} {...recipe} />;
//         })}
//         </div>
//         <div className='recipe-list__add-recipe-btn-container'>
//           <button onClick={handleRecipeAdd} className='btn btn--primary'>Add Recipe</button> 
//         </div>
//     </div>
//   );
// }

import React, { useContext } from "react";
import Recipe from "./Recipe";
import { RecipeContext } from './App';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

export default function RecipeList({ filteredRecipes }) {
  const { handleRecipeAdd, updateRecipes } = useContext(RecipeContext);

  function handleOnDragEnd(result) {
    if (!result.destination) return; // dropped outside the list

    const reorderedRecipes = Array.from(filteredRecipes);
    const [reorderedItem] = reorderedRecipes.splice(result.source.index, 1);
    reorderedRecipes.splice(result.destination.index, 0, reorderedItem);

    // Update your state with the reordered recipes
    // Assuming you have such a function or you can create one
    updateRecipes(reorderedRecipes);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="recipes">
        {(provided) => (
          <div 
            className='recipe-list'
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <div>
            {filteredRecipes.map((recipe, index) => {
                return <Recipe key={recipe.id} index={index} {...recipe} />;
            })}
            </div>
            {provided.placeholder}
            <div className='recipe-list__add-recipe-btn-container'>
              <button onClick={handleRecipeAdd} className='btn btn--primary'>Add Recipe</button> 
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
