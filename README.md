# 🍲 RecipeBook

A modern, full-stack recipe management web application built with **React (Vite)**, **Spring Boot**, and **MySQL**. RecipeBook allows users to explore, create, search, and filter delicious recipes effortlessly.

---

## ✨ Features

- 📖 **Browse Recipes**: View all recipes with cooking time, cuisine, and food type indicators.
- ➕ **Add Recipes**: Intuitive form to save new recipes with ingredients and step-by-step preparation instructions.
- 🔍 **Real-Time Search**: Instant search by recipe name.
- 🥗 **Smart Filtering**:
  - Filter by dietary preference: **Vegetarian** or **Non-Vegetarian**.
  - Quick filter: Vegetarian recipes under 30 minutes.
- 📱 **Responsive Design**: Clean and responsive UI built with modern CSS aesthetics.
- ⚡ **RESTful API**: Robust Spring Boot backend with JPA persistence and CORS support.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: [React 19](https://react.dev/)
- **Bundler / Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS (Custom design system)
- **Linter**: Oxlint

### **Backend**
- **Framework**: [Spring Boot 4.x](https://spring.io/projects/spring-boot)
- **Language**: Java 17
- **Persistence**: Spring Data JPA / Hibernate
- **Build Tool**: Maven (`mvnw`)
- **API Style**: RESTful JSON API

### **Database**
- **DBMS**: MySQL
- **Database Name**: `recipe_book_db`

---

## 📁 Project Structure

```text
RecipeBook/
├── Backend/                    # Spring Boot backend application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/recipebook/
│   │   │   │   ├── controller/ # RecipeController (REST APIs)
│   │   │   │   ├── entity/     # Recipe JPA Entity
│   │   │   │   ├── repository/ # RecipeRepository
│   │   │   │   └── service/    # RecipeService
│   │   │   └── resources/
│   │   │       └── application.properties # DB & Server configs
│   │   └── test/
│   ├── pom.xml                 # Maven dependencies
│   └── mvnw / mvnw.cmd         # Maven wrapper scripts
├── Database/                   # Database scripts & schema
├── Frontend/
│   └── Frontend/               # React Vite frontend application
│       ├── public/             # Static assets & icons
│       ├── src/
│       │   ├── App.jsx         # Main React component
│       │   ├── App.css         # Component styling
│       │   └── main.jsx        # App entry point
│       ├── index.html
│       ├── package.json
│       └── vite.config.js
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

Follow the steps below to set up and run the project locally.

### 📋 Prerequisites
Make sure you have installed:
- **Java JDK 17** or higher
- **Node.js** (v18+ recommended) & **npm**
- **MySQL Server** running locally

---

### 1️⃣ Database Setup

1. Open your MySQL client / CLI:
   ```sql
   CREATE DATABASE recipe_book_db;
   ```
2. Check `Backend/src/main/resources/application.properties` and verify your MySQL credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/recipe_book_db
   spring.datasource.username=root
   spring.datasource.password=root
   ```
   *(Update username and password to match your local MySQL configuration).*

---

### 2️⃣ Backend Setup (Spring Boot)

1. Open a terminal and navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Run the application using the Maven wrapper:
   - **Windows:**
     ```cmd
     mvnw.cmd spring-boot:run
     ```
   - **Linux / macOS:**
     ```bash
     ./mvnw spring-boot:run
     ```
3. The backend server will start on `http://localhost:8080`.

---

### 3️⃣ Frontend Setup (React + Vite)

1. Open another terminal and navigate to the frontend directory:
   ```bash
   cd Frontend/Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and visit: `http://localhost:5173`

---

## 📡 REST API Reference

Base URL: `http://localhost:8080/api/recipes`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/recipes` | Fetch all recipes |
| `GET` | `/api/recipes/{id}` | Fetch a single recipe by its ID |
| `POST` | `/api/recipes` | Create and save a new recipe |
| `PUT` | `/api/recipes/{id}` | Update an existing recipe |
| `DELETE` | `/api/recipes/{id}` | Delete a recipe |
| `GET` | `/api/recipes/search?name={name}` | Search recipes by name |
| `GET` | `/api/recipes/quick-vegetarian` | Get vegetarian recipes under 30 minutes |
| `GET` | `/api/recipes/filter?type={type}&maxTime={maxTime}` | Filter by type (`VEG`/`NON-VEG`) and cooking time |

### Sample Recipe JSON (Payload for POST/PUT)
```json
{
  "name": "Paneer Butter Masala",
  "cuisine": "Indian",
  "type": "VEG",
  "cookingTime": 25,
  "ingredients": "Paneer, butter, tomatoes, cream, spices",
  "steps": "1. Saute spices\\n2. Cook tomato gravy\\n3. Add paneer cubes and simmer with cream"
}
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/M-DhirajS/RecipeBook/issues).

---

## 📄 License

This project is licensed under the MIT License.
