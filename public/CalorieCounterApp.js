// DOM Elements
const foodInput = document.getElementById('foodInput');
const calorieInput = document.getElementById('calorieInput');
const addButton = document.getElementById('addButton');
const foodList = document.getElementById('foodList');
const totalCaloriesElement = document.getElementById('totalCalories');
const historyList = document.getElementById('historyList');

// State
let foods = [];
let totalCalories = 0;

// Event Listeners
addButton.addEventListener('click', addFood);
foodInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        calorieInput.focus();
    }
});
calorieInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addFood();
    }
});

// Functions
function addFood() {
    const foodName = foodInput.value.trim();
    const calories = parseInt(calorieInput.value);

    if (foodName && !isNaN(calories)) {
        const food = {
            name: foodName,
            calories: calories,
            timestamp: new Date()
        };

        foods.push(food);
        updateTotalCalories(calories);
        updateFoodList();
        updateHistory();
        clearInputs();
        saveToLocalStorage();
    } else {
        alert('Please enter both food name and valid calories!');
    }
}

function updateTotalCalories(calories) {
    totalCalories += calories;
    totalCaloriesElement.textContent = totalCalories;
    updateCalorieColor();
}

function updateCalorieColor() {
    if (totalCalories > 2500) {
        totalCaloriesElement.style.color = '#e74c3c';
    } else if (totalCalories > 2000) {
        totalCaloriesElement.style.color = '#f39c12';
    } else {
        totalCaloriesElement.style.color = '#27ae60';
    }
}

function updateFoodList() {
    foodList.innerHTML = '';
    const recentFoods = foods.slice(-5).reverse();
    
    recentFoods.forEach(food => {
        const foodItem = document.createElement('div');
        foodItem.className = 'food-item';
        foodItem.innerHTML = `
            <span>${food.name}</span>
            <span>${food.calories} calories</span>
        `;
        foodList.appendChild(foodItem);
    });
}

function updateHistory() {
    historyList.innerHTML = '';
    const sortedFoods = [...foods].reverse();

    sortedFoods.forEach(food => {
        const historyItem = document.createElement('li');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <span>${food.name}</span>
            <span>${food.calories} calories</span>
        `;
        historyList.appendChild(historyItem);
    });
}

function clearInputs() {
    foodInput.value = '';
    calorieInput.value = '';
    foodInput.focus();
}

function saveToLocalStorage() {
    localStorage.setItem('foods', JSON.stringify(foods));
    localStorage.setItem('totalCalories', totalCalories);
}

function loadFromLocalStorage() {
    const savedFoods = localStorage.getItem('foods');
    const savedCalories = localStorage.getItem('totalCalories');

    if (savedFoods) {
        foods = JSON.parse(savedFoods);
        updateFoodList();
        updateHistory();
    }

    if (savedCalories) {
        totalCalories = parseInt(savedCalories);
        totalCaloriesElement.textContent = totalCalories;
        updateCalorieColor();
    }
}

// Initialize
loadFromLocalStorage();
