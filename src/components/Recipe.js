// import React, { useContext } from "react";
// import IngredientList from "./IngredientList";
// import { RecipeContext } from "./App";


// export default function Recipe(props) {
//   const { handleRecipeDelete, handleRecipeSelect } = useContext(RecipeContext);
//   const { category, id, name, cookTime, servings, instructions, ingredients } = props;
//   return (
//     <div className='recipe'>
//       <div className='recipe__header'>
//         <h3 className='recipe__title'>{name}</h3>
//         <div>
//           <button className='btn btn--primary mr-1' onClick={() => handleRecipeSelect(id)}>Edit</button>
//           <button onClick={() => handleRecipeDelete(id)} className='btn btn--danger'>Delete</button>
//         </div>
//       </div>
//       <div>
//         <span className='recipe__label'>Category: </span>
//         <span className='recipe__value'>{category}</span>
//       </div>
//       <div className='recipe__row'>
//         <span className='recipe__label'>Cook Time:</span>
//         <span className='recipe__value'>{cookTime}</span>
//       </div>
//       <div>
//         <span className='recipe__label'>Servings:</span>
//         <span className='recipe__value'>{servings}</span>
//       </div>
//       <div>
//         <span className='recipe__label'>Instructions:</span>
//         <div className='recipe__value recipe__instructions recipe__value--indented'>{instructions}</div>
//       </div>
//       <div>
//         <span className='recipe__label'>Ingredients:</span>
//         <div className='recipe__value recipe__value--indented'><IngredientList ingredients={ingredients}/></div>
//       </div>
//     </div>
//   );
// }

import React, { useContext } from "react";
import IngredientList from "./IngredientList";
import { RecipeContext } from "./App";

import { Draggable } from 'react-beautiful-dnd';

export default function Recipe(props) {
  const { handleRecipeDelete, handleRecipeSelect } = useContext(RecipeContext);
  const { category, id, name, cookTime, servings, instructions, ingredients, index } = props;
  
  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => (
        <div 
          className='recipe'
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className='recipe__header'>
            <h3 className='recipe__title'>{name}</h3>
            <div>
              <button className='btn btn--primary mr-1' onClick={() => handleRecipeSelect(id)}>Edit</button>
              <button onClick={() => handleRecipeDelete(id)} className='btn btn--danger'>Delete</button>
            </div>
          </div>
          <div>
            <span className='recipe__label'>Category: </span>
            <span className='recipe__value'>{category}</span>
          </div>
          <div className='recipe__row'>
            <span className='recipe__label'>Cook Time:</span>
            <span className='recipe__value'>{cookTime}</span>
          </div>
          <div>
            <span className='recipe__label'>Servings:</span>
            <span className='recipe__value'>{servings}</span>
          </div>
          <div>
            <span className='recipe__label'>Instructions:</span>
            <div className='recipe__value recipe__instructions recipe__value--indented'>{instructions}</div>
          </div>
          <div>
            <span className='recipe__label'>Ingredients:</span>
            <div className='recipe__value recipe__value--indented'><IngredientList ingredients={ingredients}/></div>
          </div>
        </div>
      )}
    </Draggable>
  );
}