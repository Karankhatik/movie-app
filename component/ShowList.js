import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShowListShimmer } from "../ShimmerEffect/ShowListShimmer";

const ShowList = () => {
  // State for storing list of shows fetched from API
  const [shows, setShows] = useState([]);
  // State for loading indicator
  const [loading, setLoading] = useState(true); 

  // Hook for navigating to another component/page
  const navigate = useNavigate();

  // Fetch shows from API on component mount
  useEffect(() => {
    fetchShows();
  }, []);

  // Function to fetch shows from TVMaze API
  const fetchShows = async () => {
    const response = await axios.get(
      "https://api.tvmaze.com/search/shows?q=all"
    );
    // Log the URL of the first show's image
    console.log(response.data[0].show.image.original);
    // Set the list of shows to the response data
    setShows(response.data);
    setLoading(false)
  };

  return (
    <div className="container">
      <h1>Movies</h1>
      <ul className="list-group">
        {loading ? ( 
          <>
            <ShowListShimmer/>
          </>
        ) : (
          // Otherwise, map through the list of shows and display them
          shows.map((show) => (
            <li key={show.show.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <img
                    src={show.show.image?.original}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "10%",
                    }}
                  />{" "}
                  &nbsp; &nbsp; &nbsp;
                  {show.show.name}
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    navigate(`/shows/${show.show.id}`);
                  }}
                >
                  View Detail
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ShowList;

