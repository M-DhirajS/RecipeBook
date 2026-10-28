
package com.example.recipebook.service;

import com.example.recipebook.entity.Recipe;
import com.example.recipebook.repository.RecipeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;

    // Constructor injection
    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    // Get all recipes
    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    // Get recipe by ID
    public Recipe getRecipeById(Long id) {
        return recipeRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Recipe not found with ID: " + id)
                );
    }

    // Add a new recipe
    public Recipe addRecipe(Recipe recipe) {
        recipe.setId(null);
        return recipeRepository.save(recipe);
    }

    // Update an existing recipe
    public Recipe updateRecipe(Long id, Recipe updatedRecipe) {
        Recipe existingRecipe = getRecipeById(id);

        existingRecipe.setName(updatedRecipe.getName());
        existingRecipe.setCuisine(updatedRecipe.getCuisine());
        existingRecipe.setType(updatedRecipe.getType());
        existingRecipe.setCookingTime(updatedRecipe.getCookingTime());
        existingRecipe.setIngredients(updatedRecipe.getIngredients());
        existingRecipe.setSteps(updatedRecipe.getSteps());

        return recipeRepository.save(existingRecipe);
    }

    // Delete a recipe
    public void deleteRecipe(Long id) {
        Recipe recipe = getRecipeById(id);
        recipeRepository.delete(recipe);
    }

    // Search recipes by name
    public List<Recipe> searchRecipes(String name) {
        return recipeRepository.findByNameContainingIgnoreCase(name);
    }

    // Get vegetarian recipes taking less than 30 minutes
    public List<Recipe> getQuickVegetarianRecipes() {
        return recipeRepository
                .findByTypeAndCookingTimeLessThan("VEG", 30);
    }

    // Filter recipes by type and maximum cooking time
    public List<Recipe> filterRecipes(String type, Integer maxTime) {
        return recipeRepository
                .findByTypeAndCookingTimeLessThan(type, maxTime);
    }
}
