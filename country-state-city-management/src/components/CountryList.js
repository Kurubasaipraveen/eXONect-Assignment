import React from "react";
import StateList from "./StateList";

const CountryList = ({ countries, setCountries }) => {
  /** 
   * Function to update a country's name 
   */
  const updateCountry = (id) => {
    const newName = prompt("Enter the new country name:");
    if (newName && newName.trim() !== "") {
      setCountries(
        countries.map((country) =>
          country.id === id ? { ...country, name: newName.trim() } : country
        )
      );
    }
  };

  /** 
   * Function to delete a country 
   */
  const deleteCountry = (id) => {
    if (window.confirm("Are you sure you want to delete this country?")) {
      setCountries(countries.filter((country) => country.id !== id));
    }
  };

  /** 
   * Function to toggle visibility of states for a country 
   */
  const toggleStates = (id) => {
    setCountries(
      countries.map((country) =>
        country.id === id ? { ...country, showStates: !country.showStates } : country
      )
    );
  };

  return (
    <div className="country-container">
      <h2>Countries</h2>

      {countries.length === 0 ? (
        <p>No countries added yet. Add a country to get started.</p>
      ) : (
        <ul className="country-list">
          {countries.map((country) => (
            <li key={country.id} className="country-item">
              {/* Country Name */}
              <span className="country-name">{country.name}</span>

              {/* Action Buttons */}
              <div className="country-actions">
                <button className="edit" onClick={() => updateCountry(country.id)}>
                  Edit
                </button>
                <button className="delete" onClick={() => deleteCountry(country.id)}>
                  Delete
                </button>
                <button className="toggle" onClick={() => toggleStates(country.id)}>
                  {country.showStates ? "Hide States" : "Manage States"}
                </button>
              </div>

              {/* StateList Component (shown when toggled) */}
              {country.showStates && (
                <StateList country={country} setCountries={setCountries} countries={countries} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CountryList;
