import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { profileThunk, logoutThunk, updateUserThunk } from "../services/auth-thunks";
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

function ProfileScreen() {
  const { currentUser } = useSelector((state) => state.user);
  const [profile, setProfile] = useState(currentUser);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const save = async () => {   
    await dispatch(updateUserThunk(profile)); 
  };

  useEffect(() => {
    const loadProfile = async () => {
      const { payload } = await dispatch(profileThunk());
      setProfile(payload);
    };
  }, [ ]);

  const handleInputChange = (event, prop) => {
    setProfile(prev => ({
      ...prev,
      [prop]: event.target.value
    }));
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <Card>
            <Card.Header><h1>Profile Screen</h1></Card.Header>
            <Card.Body>
              <Form>
                {profile && Object.keys(profile)
                  .filter(prop => profile[prop] && prop !== '_id' && prop !== '__v')

                  .map((prop) => (
                    prop === 'fitnessGoalType' ? (
                      <Form.Group key={prop}>
                        <Form.Label>{prop}</Form.Label>
                        <Form.Control 
                          as="select" 
                          value={profile[prop]} 
                          disabled={!edit} 
                          onChange={(event) => handleInputChange(event, prop)}
                        >
                          <option value="weightloss">Weight Loss</option>
                          <option value="weightgain">Weight Gain</option>
                        </Form.Control>
                      </Form.Group>
                    ) : (
                      <Form.Group key={prop}>
                        <Form.Label>{prop}</Form.Label>
                        <Form.Control
                          type="text"
                          value={profile[prop]}
                          disabled={!edit}
                          onChange={(event) => handleInputChange(event, prop)}
                        />
                      </Form.Group>
                    )
                  ))}
                <Button variant="danger" onClick={() => {
                  dispatch(logoutThunk());
                  navigate("/tuiter/login");
                }}>
                  Logout
                </Button>
                <Button variant="primary" onClick={() => setEdit(!edit)} className="ml-3">
                  {edit ? "Cancel" : "Edit"}
                </Button>
                {edit && <Button variant="success" onClick={save} className="ml-3">Save</Button>}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileScreen;
