import { useState, useRef } from "react";
import IngredientsList from "./IngredientsList.jsx";
import RecipeFromAI from "./RecipeFromAI.jsx";


function Main() {
	// Ingredients sample: "mutton", "turmeric", "onion", "gingelly oil"
	const [ingredients, setIngredient] = useState([]);
	const [recipeMarkdown, setRecipeMarkdown] = useState("");
	
	const [isRemoveRecipeDisabled, setIsRemoveRecipeDisabled] = useState(false);
	const [isAddRecipeDisabled, setIsAddRecipeDisabled] = useState(false);

	const recipeSection = useRef(null);


	function addIngredient(formData) {
		const newIngredientInput = formData.get("ingredient");
		setIngredient(ingredients => [...ingredients, newIngredientInput]);
	}


	async function getRecipe() {
		setIsRemoveRecipeDisabled(true);
		setIsAddRecipeDisabled(true);
		
		try {
			const response = await fetch("/get-recipe", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ ingredientsArr: ingredients })
			});

			if (!response.ok) {
				throw new Error(`HTTP Error: ${response.status}`);
			}

			const textData = await response.text();
			console.log(textData);

			setRecipeMarkdown(textData);

		}
		catch (err) {
			console.error("Error fetching data: ", err);
		}

		setIsRemoveRecipeDisabled(false);
	}


	function clearRecipe() {
		setIngredient([]);

		if (recipeMarkdown) {
			setRecipeMarkdown("");
			setIsAddRecipeDisabled(false);
		}
	}

	
	return (

	<main>
		<form action={ addIngredient }>
			<input
				type="text"
				placeholder="e.g., oregano"
				aria-label="Add ingredient"
				name="ingredient"
				required />
			<button type="submit" disabled={ isAddRecipeDisabled }>Add ingredient</button>
			
		</form>

		{ ingredients.length > 0 &&
		<IngredientsList
			ingredients={ ingredients }
			getRecipe={ getRecipe }
			clearRecipe={ clearRecipe }
			isRemoveRecipeDisabled={ isRemoveRecipeDisabled }
			isAddRecipeDisabled= { isAddRecipeDisabled }
			recipeMarkdown={ recipeMarkdown }
		/>
		}

		{ recipeMarkdown && <RecipeFromAI recipeMarkdown={ recipeMarkdown } ref={ recipeSection } /> }
	</main>

	);

}

export default Main;