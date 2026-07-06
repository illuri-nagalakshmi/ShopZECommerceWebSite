import { useState } from "react";

function StarRating({ rating, setRating }) {
  const [hover, setHover] = useState(0);

  return (
    <div style={{ fontSize: "32px", margin: "15px 0" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            cursor: "pointer",
            color:
              star <= (hover || rating)
                ? "#FFD700"
                : "#d3d3d3",
          }}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default StarRating;