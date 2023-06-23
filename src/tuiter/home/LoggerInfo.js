import React, { useState, useEffect } from 'react';

function LoggerInfoScreen() {
  const [mealChoices, setMealChoices] = useState({
    breakfast: '',
    lunch: '',
    snacks: '',
    dinner: ''
  });
  const [totalCalories, setTotalCalories] = useState(0);

  const handleInputChange = (event, meal) => {
    const { value } = event.target;
    setMealChoices(prevChoices => ({
      ...prevChoices,
      [meal]: value
    }));
  };

  useEffect(() => {
    const calculateTotalCalories = async () => {
      let total = 0;

      for (const meal in mealChoices) {
        if (mealChoices[meal] !== '') {
          const response = await fetch(
            `https://api.edamam.com/api/food-database/v2/parser?app_id=4ef9f282&app_key=7660de5b63462fc4acfb5a2764500281&ingr=${encodeURIComponent(mealChoices[meal])}&nutrition-type=logging`
          );
          const data = await response.json();

          if (data.parsed && data.parsed.length > 0) {
            const calories = data.parsed[0].food.nutrients.ENERC_KCAL;
            total += calories;
          }
        }
      }

      setTotalCalories(total);
    };

    calculateTotalCalories();
  }, [mealChoices]);

  const handleSubmit = () => {
    // Perform actions with the meal choices
    console.log(mealChoices); // Example: Logging the meal choices to the console
  };

  return (
    <>
      <h4>LoggerInfo</h4>
      <p>MyNetDiary will guide you with personalized tips, diet advice, and feedback as you go.</p>
      <h4>Food Log</h4>

      <div>
        <label>Breakfast</label>
        <input
          type="text"
          value={mealChoices.breakfast}
          onChange={(event) => handleInputChange(event, 'breakfast')}
        />
      </div>

      <div>
        <label>Lunch</label>
        <input
          type="text"
          value={mealChoices.lunch}
          onChange={(event) => handleInputChange(event, 'lunch')}
        />
      </div>

      <div>
        <label>Snacks</label>
        <input
          type="text"
          value={mealChoices.snacks}
          onChange={(event) => handleInputChange(event, 'snacks')}
        />
      </div>

      <div>
        <label>Dinner</label>
        <input
          type="text"
          value={mealChoices.dinner}
          onChange={(event) => handleInputChange(event, 'dinner')}
        />
      </div>

      <button onClick={handleSubmit}>Submit</button>

      <p>Total Calories: {totalCalories}</p>
    </>
  );
}

export default LoggerInfoScreen;
