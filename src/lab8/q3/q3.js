(async function () {
    try {
      const response = await fetch('https://dummyjson.com/recipes');
      const data = await response.json();
  
      if (Array.isArray(data.recipes)) {
        console.log("Recipe Names:");
        data.recipes.forEach(recipe => {
          console.log(`- ${recipe.name}`);
        });
      } else {
        console.error("No recipe data found.");
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  })();
  