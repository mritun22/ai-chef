import { useEffect } from "react";
import Markdown from "react-markdown";

export default function RecipeFromMistral(props) {
	useEffect(() => {
		props.ref.current.scrollIntoView({
			behavior: "smooth",
			block: "start",
			inline: "nearest"
		});
	}, []);
	
	return (

	<section ref={ props.ref }>
		<h2>Recommended Recipe</h2>
		<Markdown>
			{ props.recipeMarkdown }
		</Markdown>
	</section>

	);
}