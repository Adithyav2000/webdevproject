import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
function FoodDetailsPage() {
  const { foodId } = useParams();
  const [foodDetails, setFoodDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDetails();
  }, [foodId]);
  const goBack = () => {
    navigate(-1); 
  }

  const fetchDetails = async () => {
    try {
      const response = await fetch(`https://api.edamam.com/api/food-database/v2/parser?app_id=c19f8207&app_key=39edd12c970c2cdbe5cceedfe7dbdb5b&ingr=${foodId}`);
      const data = await response.json();
      if(data.parsed && data.parsed.length > 0) {
        setFoodDetails(data.parsed[0].food); // Adjusting this line
      } else {
        console.log('No details found for this food.');
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {foodDetails ? (
        <div style={{ width: '18rem', border: '1px solid gray', borderRadius: '5px', padding: '10px', margin: '0 auto' }}>
          <img src={foodDetails.image} alt={foodDetails.label} style={{ width: '100%' }} />
          <div style={{ padding: '10px' }}>
            <h2>{foodDetails.label}</h2>
          </div>
          <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
            <li>Calories: {foodDetails.nutrients.ENERC_KCAL}</li>
            <li>Fat: {foodDetails.nutrients.FAT}</li>
            <li>Carbs: {foodDetails.nutrients.CHOCDF}</li>
            <li>Protein: {foodDetails.nutrients.PROCNT}</li>
          </ul>
          <Button variant="secondary" onClick={goBack}>Go Back</Button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default FoodDetailsPage;
