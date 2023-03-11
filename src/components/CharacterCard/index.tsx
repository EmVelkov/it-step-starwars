import React from "react";
import "./card.style.scss";

interface ICardProps {
  imageUrl: string;
  name: string;
}

export function Card({ imageUrl, name }: ICardProps) {
  return (
    <div className="card">
      <img
        className="card_image"
        src={imageUrl}
        alt={`Image ${name} not found.`}
      />
      <div className="card_title">
        <p>{name}</p>
      </div>
    </div>
  );
}
