import { useState } from "react";
import axios from "axios";

export default function QuantitativeSearch() {
  const [rating, setRating] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/search/quantitative?rating=${rating}`
    );
    setResults(response.data);
  };

  return (
    <div>
      <h2>Quantitative Search</h2>
      <input
        type="number"
        placeholder="Enter rating (1-5)"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.map((review, idx) => (
          <li key={idx}>{review.reviewText}</li>
        ))}
      </ul>
    </div>
  );
}
