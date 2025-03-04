import React from "react";
import CityList from "./CityList";

const StateList = ({ country, countries, setCountries }) => {
  const addState = () => {
    const stateName = prompt("Enter state name:");
    if (stateName) {
      const newState = {
        id: Date.now(),
        name: stateName,
        cities: [],
        showCities: false,
      };

      const updatedCountries = countries.map((c) =>
        c.id === country.id ? { ...c, states: [...c.states, newState] } : c
      );

      setCountries(updatedCountries);
    }
  };

  const updateState = (stateId) => {
    const newName = prompt("Enter new state name:");
    if (newName) {
      const updatedCountries = countries.map((c) =>
        c.id === country.id
          ? {
              ...c,
              states: c.states.map((s) =>
                s.id === stateId ? { ...s, name: newName } : s
              ),
            }
          : c
      );

      setCountries(updatedCountries);
    }
  };

  const deleteState = (stateId) => {
    if (window.confirm("Are you sure you want to delete this state?")) {
      const updatedCountries = countries.map((c) =>
        c.id === country.id
          ? { ...c, states: c.states.filter((s) => s.id !== stateId) }
          : c
      );

      setCountries(updatedCountries);
    }
  };

  const toggleCities = (stateId) => {
    const updatedCountries = countries.map((c) =>
      c.id === country.id
        ? {
            ...c,
            states: c.states.map((s) =>
              s.id === stateId ? { ...s, showCities: !s.showCities } : s
            ),
          }
        : c
    );

    setCountries(updatedCountries);
  };

  return (
    <div>
      <h3>States of {country.name}</h3>
      <button onClick={addState}>Add State</button>
      {country.states.length === 0 ? (
        <p>No states added yet.</p>
      ) : (
        <ul>
          {country.states.map((state) => (
            <li key={state.id}>
              <strong>{state.name}</strong>
              <button onClick={() => updateState(state.id)}>Edit</button>
              <button onClick={() => deleteState(state.id)}>Delete</button>
              <button onClick={() => toggleCities(state.id)}>
                {state.showCities ? "Hide Cities" : "Manage Cities"}
              </button>

              {/* Show CityList if toggled */}
              {state.showCities && (
                <CityList state={state} country={country} countries={countries} setCountries={setCountries} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StateList;
