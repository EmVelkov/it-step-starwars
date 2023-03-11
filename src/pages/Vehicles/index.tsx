import React, { useCallback, useEffect, useState } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { debounce } from "lodash";
import { useSelector } from "react-redux";
import { Card } from "../../components/CharacterCard";
import { InputSearch } from "../../components/InputSearch";

import { api } from "../../services/api";

import { Character } from "../../types/Character.type";
import { Container } from "./styles";
import { CompleteDataTypes } from "../../types/CompleteData.types";
import { Loading } from "../../components/Loading";
import { getUrlId } from "../../utils/getUrlId";
import { RootState } from "../../store";

export default function Vehicles() {
  const [data, setData] = useState<CompleteDataTypes>();
  const [vehicles, setCharacters] = useState<Character[]>([]);
  const [inputSearch, setInputSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFavouriteSelected, setIsFavouriteSelected] =
    useState<boolean>(false);
  const vehiclesFavourite = useSelector((state: RootState) => state.vehicle);

  const getData = useCallback(async () => {
    try {
      const response = await api.get(`vehicles/?page=${page}`);

      const returnedData = await response.data;

      setData(returnedData);
      setCharacters(returnedData.results);
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  const getFilteredData = useCallback(async () => {
    try {
      const response = await api.get(`vehicles/?search=${inputSearch}`);

      const returnedData = await response.data;

      setData(returnedData);
      setCharacters(returnedData.results);
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, [inputSearch]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputSearch(event.target.value);
  }

  const debouncedOnChange = debounce(handleInputChange, 500);

  useEffect(() => {
    setIsLoading(true);
    getData();
  }, [getData]);

  useEffect(() => {
    setIsLoading(true);
    getFilteredData();
  }, [getFilteredData]);

  return (
    <Container>
      <div className="title">
        <h1>
          Vehicles - <span>Star Wars</span>
        </h1>
      </div>

      <div className="header">
        <InputSearch
          type="text"
          placeholder="Search..."
          onChange={(event) => debouncedOnChange(event)}
        />
      </div>

      {isLoading ? (
        <div className="loading">
          <Loading />
        </div>
      ) : !isFavouriteSelected ? (
        <div className="cards">
          {vehicles.map((vehicle) => (
            <Card
              imageUrl={`https://starwars-visualguide.com/assets/img/vehicles/${getUrlId(
                vehicle.url
              )}.jpg`}
              name={vehicle.name}
              key={vehicle.name}
              id={getUrlId(vehicle.url)}
              type="vehicles"
              isFavourited={vehiclesFavourite.some(
                (dataStore) => dataStore.name === vehicle.name
              )}
            />
          ))}
        </div>
      ) : (
        <div className="cards">
          {vehiclesFavourite.map((vehicle) => (
            <Card
              imageUrl={`https://starwars-visualguide.com/assets/img/vehicles/${vehicle.id}.jpg`}
              name={vehicle.name}
              key={vehicle.name}
              id={vehicle.id}
              type="vehicles"
              isFavourited
            />
          ))}
        </div>
      )}
    </Container>
  );
}
