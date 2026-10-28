
package com.example.recipebook.controller;

import com.example.recipebook.entity.Recipe;
import com.example.recipebook.service.RecipeService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "http://localhost:5173")
public class RecipeController {

    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    // GET: Fetch all recipes
    @GetMapping
    public List<Recipe> getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    // GET: Fetch recipe by ID
    @GetMapping("/{id}")
    public Recipe getRecipeById(@PathVariable Long id) {
        return recipeService.getRecipeById(id);
    }

    // POST: Add a new recipe
    @PostMapping
    public ResponseEntity<Recipe> addRecipe(
            @RequestBody Recipe recipe) {

        Recipe savedRecipe = recipeService.addRecipe(recipe);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedRecipe);
    }

    // PUT: Update an existing recipe
    @PutMapping("/{id}")
    public Recipe updateRecipe(
            @PathVariable Long id,
            @RequestBody Recipe recipe) {

        return recipeService.updateRecipe(id, recipe);
    }

    // DELETE: Delete a recipe
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(
            @PathVariable Long id) {

        recipeService.deleteRecipe(id);

        return ResponseEntity.noContent().build();
    }

    // GET: Search recipes by name
    @GetMapping("/search")
    public List<Recipe> searchRecipes(
            @RequestParam String name) {

        return recipeService.searchRecipes(name);
    }

    // GET: Vegetarian recipes under 30 minutes
    @GetMapping("/quick-vegetarian")
    public List<Recipe> getQuickVegetarianRecipes() {
        return recipeService.getQuickVegetarianRecipes();
    }

    // GET: Filter recipes by type and cooking time
    @GetMapping("/filter")
    public List<Recipe> filterRecipes(
            @RequestParam String type,
            @RequestParam Integer maxTime) {

        return recipeService.filterRecipes(type, maxTime);
    }
}
