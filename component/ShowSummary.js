import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


const ShowSummary = () => {
  // Calls the useParams hook to get the ID of the show/movie from the URL params
  const params = useParams();
  // Destructures the ID from the params object
  const { id } = params;
  // Initializes state variable for holding the user's name input
  const [name, setName] = useState("");
  // Initializes state variable for holding the user's email input
  const [email, setEmail] = useState("");

  // Initializes state variable for controlling the visibility of the modal form
  const [showModal, setShowModal] = useState(false);
  // Initializes state variable for holding error message for name field
  const [nameError, setNameError] = useState("");
  // Initializes state variable for holding error message for email field
  const [emailError, setEmailError] = useState("");
  // Initializes state variable for holding the movie/show summary data
  const [movieSummary, setMovieSummary] = useState(null);

  useEffect(() => {
    // Calls fetchShows function when component mounts
    fetchShows();
  }, []);

  // Defines an asynchronous function for fetching the show/movie summary data from TVMaze API
  const fetchShows = async () => {
    const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
    setMovieSummary(response.data);
  };

  // Defines a function for handling the click event on the "Book a Movie Ticket" button
  const handleBookClick = () => {
    setIsBooking(true);
    const storedName = localStorage.getItem("name");
    const storedEmail = sessionStorage.getItem("email");
    if (storedName) {
      setName(storedName);
    }
    if (storedEmail) {
      setEmail(storedEmail);
    }
  };
  // Defines a function for handling the form submit event
  const handleFormSubmit = (event) => {
    event.preventDefault();
    let isValid = true;
    if (name.trim() === "") {
      setNameError("Name is required");
      isValid = false;
    } else {
      setNameError("");
    }
    if (email.trim() === "") {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Invalid email address");
      isValid = false;
    } else {
      setEmailError("");
    }
    // Submit the form if valid
    if (isValid) {
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      //close the modal
      setShowModal(false);
    }
  };
  //if movieSummary not get data it will return null
  if (!movieSummary) {
    return null;
  }
  return (
    <>
      <div className="container mt-5">
        <h1>{movieSummary?.name}</h1>
        <div className="row">
          <div className="col-md-4">
            <img
              src={movieSummary?.image?.original}
              alt={movieSummary?.name}
              className="img-fluid"
            />
          </div>
          <div className="col-md-8">
            <h3>Rating: {movieSummary?.rating?.average}<FontAwesomeIcon style={{fontSize:'25px', color:'yellow'}} icon={faStar} /></h3>
            <h3>Genres:</h3>
            <ul>
              {movieSummary?.genres?.map((genre) => (
                <li key={genre}>{genre}</li>
              ))}
            </ul>
            <h3>Description:</h3>
            <div
              style={{
                backgroundColor: "lightblue",
                padding: "10px",
                borderRadius: "5px",
              }}
              dangerouslySetInnerHTML={{ __html: movieSummary?.summary }}
            ></div>
            <br/>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              Book a Movie Ticket
            </button>
          </div>
        </div>
      </div>
      {/* Modal for the form */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Book a Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form for the Ticket Book */}
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="movieName">
              <Form.Label>Movie Name:</Form.Label>
              <Form.Control type="text" value={movieSummary.name} disabled />
            </Form.Group>
            {/* Name */}
            <Form.Group controlId="name">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {nameError && (
                <Form.Text className="text-danger">{nameError}</Form.Text>
              )}
            </Form.Group>
            {/* Email */}
            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <Form.Text className="text-danger">{emailError}</Form.Text>
              )}
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">
              Book Ticket
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ShowSummary;
