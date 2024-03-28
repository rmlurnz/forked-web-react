import { useEffect, useState } from "react";

const Home = () => {
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch("http://localhost:4000/api/recipes");
      const json = await response.json();

      if (response.ok) {
        setRecipes(json);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="home">
      <div className="recipes">
        {recipes && recipes.map((recipe) => (
          <p key={recipe._id}>{recipe.title}</p>
        ))}
      </div>
    </div>
  );
};

export default Home;
