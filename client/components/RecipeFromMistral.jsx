import Markdown from "react-markdown";

export default function RecipeFromMistral(props) {
	console.log(props.recipeMarkdown);
	
	return (

	<section>
		<h2>Recommended Recipe</h2>
		<Markdown>
			{ props.recipeMarkdown }
		</Markdown>
	</section>

	);
}