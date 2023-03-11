import React, { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { Card } from "../../components/CharacterCard";
import { InputSearch } from "../../components/InputSearch";
import { api } from "../../services/api";
import { Loading } from "../../components/Loading";
import { getUrlId } from "../../utils/getUrlId";
import { People } from "./models/people.interface";
import "./people.styles.scss";

export default function Films() {
  const [people, setPeoples] = useState<People[]>([]);
  const [inputSearch, setInputSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getData = useCallback(async () => {
    try {
      const response = await api.get(`people/`);

      const returnedData = await response.data;

      setPeoples(returnedData.results);
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getFilteredData = useCallback(async () => {
    try {
      const response = await api.get(`people/?search=${inputSearch}`);

      const returnedData = await response.data;

      setPeoples(returnedData.results);
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
    <>
      <div className="title">
        <h1>
          People - <span>Star Wars</span>
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
        <section className="loading">
          <Loading />
        </section>
      ) : (
        <section className="people-section">
          {people.map((character) => (
            <Card
              imageUrl={`https://starwars-visualguide.com/assets/img/characters/${getUrlId(
                character.url
              )}.jpg`}
              name={character.name}
              key={character.name}
              id={getUrlId(character.url)}
              type="characters"
            />
          ))}
        </section>
      )}
    </>
  );
}
