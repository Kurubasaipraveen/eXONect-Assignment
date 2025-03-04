import React from "react";

const CityList = ({ state, country, countries, setCountries }) => {
  const addCity = () => {
    const cityName = prompt("Enter city name:");
    if (cityName) {
      const newCity = { id: Date.now(), name: cityName };

      const updatedCountries = countries.map((c) =>
        c.id === country.id
          ? {
              ...c,
              states: c.states.map((s) =>
                s.id === state.id ? { ...s, cities: [...s.cities, newCity] } : s
              ),
            }
          : c
      );

      setCountries(updatedCountries);
    }
  };

  const deleteCity = (cityId) => {
    if (window.confirm("Are you sure you want to delete this city?")) {
      const updatedCountries = countries.map((c) =>
        c.id === country.id
          ? {
              ...c,
              states: c.states.map((s) =>
                s.id === state.id
                  ? { ...s, cities: s.cities.filter((city) => city.id !== cityId) }
                  : s
              ),
            }
          : c
      );

      setCountries(updatedCountries);
    }
  };

  return (
    <div>
      <h4>Cities in {state.name}</h4>
      <button onClick={addCity}>Add City</button>
      {state.cities.length === 0 ? (
        <p>No cities added yet.</p>
      ) : (
        <ul>
          {state.cities.map((city) => (
            <li key={city.id}>
              {city.name}
              <button onClick={() => deleteCity(city.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CityList;
