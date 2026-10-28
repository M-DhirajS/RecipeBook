
import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:8080/api/recipes";

const initialForm = {
  name: "",
  cuisine: "",
  type: "VEG",
  cookingTime: "",
  ingredients: "",
  steps: "",
};

function App() {
  const [recipes, setRecipes] = useState([]);
  const [form, setForm] = useState(initialForm);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Search and filter states
  const [search, setSearch] = useState("");
  const [foodType, setFoodType] = useState("ALL");
  const [quickOnly, setQuickOnly] = useState(false);

  // Fetch recipes from Spring Boot
  async function loadRecipes() {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Unable to load recipes.");
      }

      const data = await response.json();
      setRecipes(data);
      setError("");
    } catch {
      setError("Could not load recipes. Please check the backend.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRecipes();
  }, []);

  // Handle form input changes
  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  // Add a new recipe
  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (
      !form.name.trim() ||
      !form.cuisine.trim() ||
      !form.type ||
      !form.ingredients.trim() ||
      !form.steps.trim() ||
      form.cookingTime === ""
    ) {
      setError("Please fill in all fields.");
      return;
    }

    const cookingTime = Number(form.cookingTime);

    if (!Number.isInteger(cookingTime) || cookingTime <= 0) {
      setError("Cooking time must be a positive whole number.");
      return;
    }

    const newRecipe = {
      name: form.name.trim(),
      cuisine: form.cuisine.trim(),
      type: form.type,
      cookingTime,
      ingredients: form.ingredients.trim(),
      steps: form.steps.trim(),
    };

    setSaving(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe),
      });

      if (!response.ok) {
        throw new Error(
          `Could not save recipe. Server returned ${response.status}.`
        );
      }

      setForm({ ...initialForm });
      setMessage("Recipe added successfully!");

      await loadRecipes();
    } catch (err) {
      setError(err.message || "Something went wrong while saving.");
    } finally {
      setSaving(false);
    }
  }

  // Search and filter recipes
  const filteredRecipes = recipes.filter((recipe) => {
    const recipeName = (recipe.name || "").toLowerCase();
    const searchText = search.trim().toLowerCase();

    const matchesName = recipeName.includes(searchText);

    const matchesType =
      foodType === "ALL" || recipe.type === foodType;

    const matchesQuick =
      !quickOnly ||
      (recipe.type === "VEG" &&
        Number(recipe.cookingTime) < 30);

    return matchesName && matchesType && matchesQuick;
  });

  // Reset all filters
  function resetFilters() {
    setSearch("");
    setFoodType("ALL");
    setQuickOnly(false);
  }

  return (
    <div className="app">
      <header className="navbar">
        <h1>🍲 Recipe Book</h1>
        <span>Discover your next favourite meal</span>
      </header>

      <main className="container">
        {/* Hero section */}
        <section className="hero">
          <p className="eyebrow">YOUR PERSONAL COOKBOOK</p>
          <h2>Good food starts here.</h2>
          <p>
            Save your favourite recipes and discover delicious meals.
          </p>
        </section>

        {/* Add Recipe Form */}
        <section className="form-section">
          <h2>➕ Add a New Recipe</h2>
          <p>Enter the details below to save your recipe.</p>

          <form className="recipe-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Recipe Name</label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Paneer Butter Masala"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cuisine">Cuisine</label>
              <input
                id="cuisine"
                name="cuisine"
                value={form.cuisine}
                onChange={handleChange}
                placeholder="e.g. Indian"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="type">Food Type</label>
                <select
                  id="type"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  required
                >
                  <option value="VEG">Vegetarian</option>
                  <option value="NON-VEG">Non-Vegetarian</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="cookingTime">
                  Cooking Time (minutes)
                </label>
                <input
                  id="cookingTime"
                  name="cookingTime"
                  type="number"
                  min="1"
                  step="1"
                  value={form.cookingTime}
                  onChange={handleChange}
                  placeholder="e.g. 25"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="ingredients">Ingredients</label>
              <textarea
                id="ingredients"
                name="ingredients"
                value={form.ingredients}
                onChange={handleChange}
                placeholder="Enter ingredients..."
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="steps">Preparation Steps</label>
              <textarea
                id="steps"
                name="steps"
                value={form.steps}
                onChange={handleChange}
                placeholder="Explain how to prepare the recipe..."
                rows="5"
                required
              />
            </div>

            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}

            {message && (
              <p className="success" role="status">
                {message}
              </p>
            )}

            <button
              className="submit-button"
              type="submit"
              disabled={saving}
            >
              {saving ? "Saving Recipe..." : "Save Recipe"}
            </button>
          </form>
        </section>

        {/* Recipe List Heading */}
        <section className="section-heading">
          <h2>All Recipes</h2>
          <p>{recipes.length} recipes in your cookbook</p>
        </section>

        {/* Search and Filters */}
        <section className="filter-section">
          <input
            type="text"
            placeholder="Search recipes by name..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search recipes by name"
          />

          <select
            value={foodType}
            onChange={(event) => setFoodType(event.target.value)}
            aria-label="Filter by food type"
          >
            <option value="ALL">All Types</option>
            <option value="VEG">Vegetarian</option>
            <option value="NON-VEG">Non-Vegetarian</option>
          </select>

          <label className="quick-filter">
            <input
              type="checkbox"
              checked={quickOnly}
              onChange={(event) =>
                setQuickOnly(event.target.checked)
              }
            />
            Veg under 30 minutes
          </label>

          <button type="button" onClick={resetFilters}>
            Reset Filters
          </button>
        </section>

        {/* Recipe List */}
        {loading && <p>Loading recipes...</p>}

        {!loading && !error && filteredRecipes.length === 0 && (
          <p>No matching recipes found.</p>
        )}

        <div className="recipe-grid">
          {filteredRecipes.map((recipe) => (
            <article className="recipe-card" key={recipe.id}>
              <div className="recipe-image">
                {recipe.type === "VEG" ? "🥗" : "🍗"}
              </div>

              <div className="recipe-content">
                <div className="recipe-meta">
                  <span>{recipe.cuisine}</span>

                  <span
                    className={
                      recipe.type === "VEG" ? "veg" : "nonveg"
                    }
                  >
                    {recipe.type === "VEG" ? "Veg" : "Non-Veg"}
                  </span>
                </div>

                <h3>{recipe.name}</h3>
                <p>⏱️ {recipe.cookingTime} minutes</p>

                <details>
                  <summary>View ingredients and steps</summary>

                  <h4>Ingredients</h4>
                  <p>{recipe.ingredients || "Not provided"}</p>

                  <h4>Preparation</h4>
                  <p>{recipe.steps || "Not provided"}</p>
                </details>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
