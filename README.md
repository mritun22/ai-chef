# AI Chef

Project live at: https://ai-chef-3noh.onrender.com

It is deployed on Render's Free Tier Plan therefore, the instance becomes inactive after sometime. _Kindly wait while the application is loading. If loading persists, kindly reload the page again. Thank you!_ :slightly_smiling_face:


## Project Overview

It's a **ReactJS** app build using **Vite** and deployed on **Render**.  
Frontend part lies at ```client``` folder and the backend part lies at ```server``` folder. **Vite** produces build code at ```client/dist``` folder which is then served statically by an **ExpressJS** server.  
**React** shares the list of ingredients to the **Express** server. It then makes a request to the  **Anthropic API** and forwards the response from the API to the **React** app. **Claude 3 Haiku** model is used to generate the recommended recipe.

Users can add atleast 4 ingredients to get an AI recommended recipe. Also, they can discard all the ingredients or the recipe AI suggested so to generate another recipe with different set of ingredients.


### Dependencies

- **Client-side NPM Packages**
  - "react"
  - "react-dom"
  - "react-markdown"
  - "vite"
- **Server-side NPM Packages**
  - "@anthropic-ai/sdk"
  - "express"


### UI Workflow

