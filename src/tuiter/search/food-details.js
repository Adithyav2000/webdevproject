import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';
import { updateUserThunk } from "../services/auth-thunks";
import {createProductThunk} from "../services/product-thunk";

function FoodDetailsPage() {
  const { foodId } = useParams();
  const [foodDetails, setFoodDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ quantity: '', price: '', description: '' });
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchDetails();
  }, [foodId]);

  const goBack = () => {
    navigate(-1);
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProfile = {
      ...currentUser,
      products: [
        ...(currentUser.products || []),
        {
          foodId,
          quantity: formData.quantity,
          price: formData.price,
          description: formData.description,
          image:foodDetails.image
        },
      ],
    };
    dispatch(updateUserThunk(updatedProfile));
    dispatch(createProductThunk({
      foodId,
      userid: currentUser._id
    },))
    setFormData({ quantity: '', price: '', description: '' });
    setShowModal(false);
  }

  const fetchDetails = async () => {
    try {
      const response = await fetch(`https://api.edamam.com/api/food-database/v2/parser?app_id=c19f8207&app_key=39edd12c970c2cdbe5cceedfe7dbdb5b&ingr=${foodId}`);
      const data = await response.json();
      if (data.parsed && data.parsed.length > 0) {
        setFoodDetails(data.parsed[0].food);
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
          {currentUser && currentUser.userType === "seller" && (
            <Button variant="primary" onClick={() => setShowModal(true)}>Sell Product</Button>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sell Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Quantity Available</Form.Label>
              <Form.Control type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price Per Quantity</Form.Label>
              <Form.Control type="number" name="price" value={formData.price} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" value={formData.description} onChange={handleInputChange} />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FoodDetailsPage;
