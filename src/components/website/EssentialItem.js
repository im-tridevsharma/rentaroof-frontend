import React from "react";

function EssentialItem({ distance, name, icon }) {
  return (
    <div className="flex items-center justify-between my-1 md:mr-5">
      <p className="flex items-center py-2">
        <img src={icon} alt="e1" className="h-5 w-5 object-contain mr-2" />
        <span>{name}</span>
      </p>
      <span className="uppercase">{distance}</span>
    </div>
  );
}

export default EssentialItem;
