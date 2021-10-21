import React from "react";
import StarRatings from "react-star-ratings";
import moment from "moment";

function Review({ rating, full }) {
  return (
    <div className="flex flex-col px-5 relative max-w-xl w-full">
      <div className="flex items-baseline justify-between">
        <div className="flex items-center">
          <img
            src={rating?.user_pic || "/images/website/no_photo.png"}
            alt="user"
            className="w-10 h-10 rounded-full object-contain"
          />
          <p className="flex flex-col leading-5 ml-3">
            <b style={{ fontFamily: "Opensans-bold" }}>
              {rating?.name || "Guest"}
            </b>
            <span
              style={{ fontFamily: "Opensans-regular" }}
              className="text-gray-400 text-xs"
            >
              {moment(rating?.created_at).fromNow()}
            </span>
          </p>
        </div>
        <p className="flex">
          <StarRatings
            numberOfStars={5}
            rating={parseFloat(rating?.rating) || 0}
            starRatedColor="var(--orange)"
            starDimension="15px"
            starSpacing="3px"
            starHoverColor="var(--orange)"
          />
        </p>
      </div>
      <div className="">
        <p className="py-2 mb-1 text-gray-400 text-2xs leading-4">
          {rating?.review?.length > 150 && !full
            ? rating?.review.substring(0, 150) + "..."
            : rating?.review}
        </p>
      </div>
    </div>
  );
}

export default Review;
