const express = require('express');
const app = express();
const cors = require('cors')
const recipes = require('./data.js');


app.use(cors());
app.use(express.json());

app.locals.title = 'Family Style';
app.locals.recipes = recipes;

app.set('port', process.env.PORT || 3000);

app.get('/', (request, response) => {
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
    const { id } = request.params;
    const recipe = app.locals.recipes.find(recipe => recipe.id === id);
    if (!recipe) {
      return response.sendStatus(404);
    }
  
    response.status(200).json(recipe);
  });

  app.delete('/recipes/:id', (request, response) => {
    const id = parseInt(request.params.id);
    const filteredRecipes = app.locals.ideas.filter(recipe => recipe.id !== id);
    app.locals.recipes = filteredRecipes;
  
    response.status(200).json(app.locals.recipes);
  });