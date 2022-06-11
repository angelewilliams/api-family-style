const express = require('express');
const app = express();
const cors = require('cors')
const recipes = require('./data.js');


app.use(cors());
app.use(express.json());

app.locals.title = 'Family Style';
app.locals.recipes = recipes;

app.set('port', process.env.PORT || 3001);

app.get('/api/v1/', (request, response) => {
  response.send('Oh HEY Family Style API');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

app.get('/api/v1/recipes', (request, response) => {
    const recipes = app.locals.recipes;
  
    response.json({ recipes });
  }); 


  app.get('/api/v1/recipes/:id', (request, response) => {
    const id  = parseInt(request.params.id);
    const foundRecipe = app.locals.recipes.find(recipe => recipe.id === id);
    if (!foundRecipe) {
      return response.sendStatus(404).json({ message: `Sorry, no recipe was found with an id of ${id}` })
    }
  
    response.status(200).json(foundRecipe);
  });

  app.post('/api/v1/recipes', (request, response) => {
    const submittedRecipe = request.body;
  
    for (let requiredParameter of ['title', 'url', 'notes', 'submittedBy', 'group', 'tag']) {
      if (!submittedRecipe[requiredParameter]) {
        return response.status(422).json({ message: `Body is missing required parameter of ${requiredParameter}.`})
      }
    }
  
    submittedRecipe.id = Date.now();
    app.locals.recipes.push(submittedRecipe);
  
    response.status(201).json(submittedRecipe);
  });


  app.delete('/api/v1/recipes/:id', (request, response) => {
    const id = parseInt(request.params.id);
    const filteredRecipes = app.locals.recipes.filter(recipe => recipe.id !== id);
    app.locals.recipes = filteredRecipes;
  
    response.status(200).json(app.locals.recipes);
  });