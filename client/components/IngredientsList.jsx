export default function IngredientsList(props) {
	const ingredientsListItems = props.ingredients.map((ingredient, index) => {
		return (<li key= { index } >{ ingredient }</li>)
	});

	return (
	<section className="ingredients-list">
		<div className="ingredients-panel">
			<div>
				<h2>Ingredients on hand:</h2>
				<ul aria-live="polite">
					{ ingredientsListItems }
				</ul>
			</div>
			
			{ props.ingredients.length > 0 &&
			
			<button
					type="button"
					className="clear-recipe"
					onClick={ props.clearRecipe }
					disabled={ props.isRemoveRecipeDisabled }
				>
					Remove all ingredients { props.recipeMarkdown && "& recipe" }
			</button>
			}
		</div>

		{ props.ingredients.length >= 4 &&
		
		<div className="get-recipe">
			<div>
				<h3>Ready for a recipe?</h3>
				<p>Generate a recipe from your list of ingredients</p>
			</div>
			<button onClick={ props.getRecipe } disabled={ props.isAddRecipeDisabled }>Get a recipe</button>
		</div>
		}
	</section>
	);
}