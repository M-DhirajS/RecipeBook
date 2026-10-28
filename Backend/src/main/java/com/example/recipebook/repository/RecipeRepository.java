
package com.example.recipebook.repository;

import com.example.recipebook.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    // Search recipes by name
    List<Recipe> findByNameContainingIgnoreCase(String name);

    // Find recipes by food type and cooking time
    List<Recipe> findByTypeAndCookingTimeLessThan(
        String type,
        Integer cookingTime
    );
}
