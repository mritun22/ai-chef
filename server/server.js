const express = require("express");
const path = require("node:path");
const { InferenceClient } = require("@huggingface/inference");

const app = express();

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get(/(.*)/, (req, res) => {
	res.status(200).sendFile(path.join(__dirname, "../client/dist/index.html"));
});


const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page. Don't add triple backticks in the markdown.
`;

const hf = new InferenceClient(process.env.HF_ACCESS_TOKEN);

async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ");
	console.log("askjf")
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        });

        return response.choices[0].message.content;
    } catch (err) {
        console.error(err.message);
    }
}


// getRecipeFromMistral(["mutton", "oil", "onion", "salt", "tomato"])
// 	.then(response => console.log(response));

app.use(express.json());
app.post("/get-recipe", (req, res) => {
	
	// console.log(JSON.stringify(req.headers));

	console.log(req.body);
	// res.status(200).send(req.body);

	getRecipeFromMistral(req.body.ingredientsArr)
		.then(response => {
			console.log(response);
			res.status(200).send(response);
		});
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server started on port ${port}...`);
})