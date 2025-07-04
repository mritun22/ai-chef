const path = require("node:path");
const Anthropic = require("@anthropic-ai/sdk");
const express = require("express");

const app = express();

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get(/(.*)/, (req, res) => {
	res.status(200).sendFile(path.join(__dirname, "../client/dist/index.html"));
});


const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page. Don't add triple backticks in the markdown.
`;


const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
})

async function getRecipeFromChefClaude(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")

	try {
		const msg = await anthropic.messages.create({
			model: "claude-3-haiku-20240307",
			max_tokens: 1024,
			system: SYSTEM_PROMPT,
			messages: [
				{ role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
			],
    	});
		return msg.content[0].text;
	}
	catch (err) {
		console.error(err);
	}
}



app.use(express.json());
app.post("/get-recipe", (req, res) => {
	
	console.log(req.body);
	
	getRecipeFromChefClaude(req.body.ingredientsArr)
		.then(response => {
			console.log(response);
			res.status(200).send(response);
		})
		.catch(err => {
			console.error(err);
			res.status(500).send("Internal Server Error");
		});
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server started on port ${port}...`);
});