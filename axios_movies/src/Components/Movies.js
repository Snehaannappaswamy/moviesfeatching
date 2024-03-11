import { Card, Container, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function Movies() {
  const [mov, setMov] = useState([]);
  const [userInput, setUserInput] = useState(""); // for userInput in search
  const [page, setPage] = useState(1); // for pagination

  useEffect(() => {
    axios
      .get(`http://www.omdbapi.com/?s=${userInput}&apikey=f056e2f7`)
      .then((response) => {
        // Extract the movies array from the response data
        if (response.data.Search) {
          setMov(response.data.Search);
        } else {
          setMov([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userInput]);

  const selectPage = (selectedPage) => {
    setPage(selectedPage);
  };

  const handlePrev = () => {
    if (page === 1) return;
    setPage((prev) => prev - 1);
  };
  const handleNext = () => {
    if (page >= 10) return;
    setPage((prev) => prev + 1);
  };
  return (
    <div className="styles">
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          style={{ marginTop: "2%" }}
          id="search"
          type="text"
          value={userInput}
          onChange={(event) => setUserInput(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <h1>Movies</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(10px, 1fr))",
          gap: "1%",
          padding: "1%",
          marginBottom: "1%",
        }}
      >
        {mov.slice(page * 10 - 10, page * 10).map((val, index) => (
          // Ensure each child in a list has a unique "key" prop
          <Container key={index}>
            <Card style={{ width: "18rem" }}>
              <Typography gutterBottom variant="h5">
                <h5>{val.Title}</h5>
                <img className="img" src={val.Poster} alt="img" />
              </Typography>
            </Card>
          </Container>
        ))}
      </div>
      {/*pagination code   */}
      {mov.length > 0 && (
        <div className="pagination">
          <span onClick={handlePrev}>Previous</span>
          {[...Array(mov.length / 1)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? " pagination__selected" : ""}
                onClick={() => selectPage(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          <span onClick={handleNext}>Next</span>
        </div>
      )}
    </div>
  );
}

export default Movies;
