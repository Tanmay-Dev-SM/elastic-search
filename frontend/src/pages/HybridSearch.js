import { useState } from "react";

export default function HybridSearch() {
  const [rating, setRating] = useState("");
  const [keyword, setKeyword] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleSearch = async () => {
    if (!rating || !keyword) return;
    const response = await fetch(
      `http://localhost:8000/api/search/hybrid?rating=${rating}&keyword=${keyword}`
    );
    const data = await response.json();
    setReviews(data);
  };

  const handleYearSearch = async (year) => {
    const response = await fetch(`http://localhost:8000/api/search/embedding/year?year=${year}`);
    const data = await response.json();
    setReviews(data);
  };

  const handleCategorySearch = async (category) => {
    if (!category) return;
    const response = await fetch(
      `http://localhost:8000/api/search/embedding/category?category=${encodeURIComponent(category)}`
    );
    const data = await response.json();
    setReviews(data);
  };

  return (
    <div>
      <h1>Hybrid Search</h1>

      <div>
        <input
          type="text"
          placeholder="Enter rating (number)..."
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter keyword..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>Hybrid Search</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h2>Search Top Reviews by Year</h2>
        <button onClick={() => handleYearSearch(2011)}>2011</button>
        <button onClick={() => handleYearSearch(2012)}>2012</button>
        <button onClick={() => handleYearSearch(2013)}>2013</button>
        <button onClick={() => handleYearSearch(2014)}>2014</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h2>Search Top Reviews by Category</h2>
        <select onChange={(e) => handleCategorySearch(e.target.value)}>
          <option value="">Select a category</option>
          <option value="Refrigerator Parts & Accessories">Refrigerator Parts & Accessories</option>
          <option value="Humidifier Parts & Accessories">Humidifier Parts & Accessories</option>
          <option value="Range Parts & Accessories">Range Parts & Accessories</option>
          <option value="Dishwasher Parts & Accessories">Dishwasher Parts & Accessories</option>
        </select>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h2>Results:</h2>
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>{review.reviewText}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
