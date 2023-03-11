import React, { useState } from "react";
import { MdStarBorder, MdStar } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./card.style.scss";
import {
  setFavouriteCharacter,
  removeFavouriteCharacter,
} from "../../store/slices/Character.slice";
import {
  removeFavoriteFilm,
  setFilmFavourite,
} from "../../store/slices/Film.slice";
import {
  removeFavouriteStarship,
  setStarshipFavourite,
} from "../../store/slices/Starship.slice";
import {
  removeFavouriteVehicle,
  setVehicleFavourite,
} from "../../store/slices/Vehicle.slice";

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
