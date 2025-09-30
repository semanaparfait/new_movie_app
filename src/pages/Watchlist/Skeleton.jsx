// components/SkeletonCard.jsx
import React from "react";
import "./Skeleton.css"; // shimmer styles

function SkeletonCard() {
  return (
    <div className="movie-card flex flex-col items-center flex-shrink-0 relative">
      <div className="skeleton-poster w-28 h-44 md:w-43 md:h-65 rounded-[8px]"></div>
      <div className="skeleton-overlay w-24 h-6 mt-2 rounded"></div>
    </div>
  );
}

export default SkeletonCard;
