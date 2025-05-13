// script.js
const mealTracker = document.getElementById("mealTracker");
const bmiTracker = document.getElementById("bmiTracker");
const mealNavBtn = document.getElementById("mealNavBtn");
const bmiNavBtn = document.getElementById("bmiNavBtn");
const currentDateSpan = document.getElementById("currentDate");
const mealList = document.getElementById("mealList");
const calorieBar = document.getElementById("calorieBar");
const calorieSummary = document.getElementById("calorieSummary");

const today = new Date();
let currentDate = today.toISOString().split('T')[0];

const updateDateDisplay = () => {
  currentDateSpan.textContent = currentDate;
    document.getElementById("calendar").value = currentDate;
    };

    const loadMeals = () => {
      mealList.innerHTML = "";
        const meals = JSON.parse(localStorage.getItem(currentDate)) || [];
          let totalCalories = 0;

            meals.forEach((meal, index) => {
                const card = document.createElement("div");
                    card.className = "meal-card";
                        card.innerHTML = `
                              <strong>${meal.type}:</strong> ${meal.name} - ${meal.calories} kcal
                                    ${meal.image ? `<img src="${meal.image}" alt="Meal image">` : ""}
                                        `;
                                            mealList.appendChild(card);
                                                totalCalories += parseInt(meal.calories);
                                                  });

                                                    let percent = Math.min((totalCalories / 2000) * 100, 100);
                                                      calorieBar.style.width = percent + "%";
                                                        calorieSummary.textContent = `${totalCalories} / 2000 kcal`;
                                                        };

                                                        const addMeal = () => {
                                                          const name = document.getElementById("mealName").value;
                                                            const calories = document.getElementById("mealCalories").value;
                                                              const type = document.getElementById("mealType").value;
                                                                const imageFile = document.getElementById("mealImage").files[0];

                                                                  if (!name || !calories) return;

                                                                    const reader = new FileReader();
                                                                      reader.onload = () => {
                                                                          const image = imageFile ? reader.result : null;
                                                                              const meal = { name, calories, type, image };

                                                                                  const meals = JSON.parse(localStorage.getItem(currentDate)) || [];
                                                                                      meals.push(meal);
                                                                                          localStorage.setItem(currentDate, JSON.stringify(meals));

                                                                                              loadMeals();
                                                                                                };

                                                                                                  if (imageFile) reader.readAsDataURL(imageFile);
                                                                                                    else reader.onload();
                                                                                                    };

                                                                                                    const navigateDate = (days) => {
                                                                                                      const dateObj = new Date(currentDate);
                                                                                                        dateObj.setDate(dateObj.getDate() + days);
                                                                                                          currentDate = dateObj.toISOString().split('T')[0];
                                                                                                            updateDateDisplay();
                                                                                                              loadMeals();
                                                                                                              };

                                                                                                              const calculateBMI = () => {
                                                                                                                const height = parseFloat(document.getElementById("height").value);
                                                                                                                  const weight = parseFloat(document.getElementById("weight").value);
                                                                                                                    const bmiResult = document.getElementById("bmiResult");

                                                                                                                      if (!height || !weight) return;

                                                                                                                        const bmi = weight / ((height / 100) * (height / 100));
                                                                                                                          let bmiCategory = "";
                                                                                                                            let bmiStatusColor = "";

                                                                                                                              if (bmi < 18.5) {
                                                                                                                                  bmiCategory = "Underweight";
                                                                                                                                      bmiStatusColor = "orange";
                                                                                                                                        } else if (bmi >= 18.5 && bmi < 24.9) {
                                                                                                                                            bmiCategory = "Normal weight";
                                                                                                                                                bmiStatusColor = "green";
                                                                                                                                                  } else if (bmi >= 25 && bmi < 29.9) {
                                                                                                                                                      bmiCategory = "Overweight";
                                                                                                                                                          bmiStatusColor = "yellow";
                                                                                                                                                            } else {
                                                                                                                                                                bmiCategory = "Obese";
                                                                                                                                                                    bmiStatusColor = "red";
                                                                                                                                                                      }

                                                                                                                                                                        bmiResult.innerHTML = `BMI: ${bmi.toFixed(2)} - ${bmiCategory}`;
                                                                                                                                                                          bmiResult.style.color = bmiStatusColor;
                                                                                                                                                                          };

                                                                                                                                                                          // Bottom Nav Functionality

                                                                                                                                                                          const setActiveView = (view) => {
                                                                                                                                                                            mealTracker.classList.remove("active");
                                                                                                                                                                              bmiTracker.classList.remove("active");

                                                                                                                                                                                view.classList.add("active");
                                                                                                                                                                                };

                                                                                                                                                                                mealNavBtn.addEventListener("click", () => {
                                                                                                                                                                                  setActiveView(mealTracker);
                                                                                                                                                                                  });

                                                                                                                                                                                  bmiNavBtn.addEventListener("click", () => {
                                                                                                                                                                                    setActiveView(bmiTracker);
                                                                                                                                                                                    });

                                                                                                                                                                                    // Initialize App
                                                                                                                                                                                    updateDateDisplay();
                                                                                                                                                                                    loadMeals();