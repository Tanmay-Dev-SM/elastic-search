import { useState } from "react";

export default function FuzzySearch() {
  const [keyword, setKeyword] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleSearch = async () => {
    if (!keyword) return;
    const response = await fetch(`http://localhost:8000/api/search/fuzzy?keyword=${keyword}`);
    const data = await response.json();
    setReviews(data);
  };

  return (
    <div>
      <h1>Fuzzy Search</h1>
      <input
        type="text"
        placeholder="Enter keyword..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {reviews.map((review, index) => (
          <li key={index}>{review.reviewText}</li>
        ))}
      </ul>
    </div>
  );
}
