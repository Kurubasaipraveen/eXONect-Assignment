import React, { useState } from "react";
import CountryList from "./components/CountryList";
import "./App.css";

const App = () => {
  const [countries, setCountries] = useState([]);

  // Function to add a new country
  const addCountry = () => {
    const name = prompt("Enter country name:");
    if (name && name.trim() !== "") {
      setCountries([...countries, { id: Date.now(), name: name.trim(), states: [] }]);
    } else {
      alert("Country name cannot be empty!");
    }
  };

  // Function to edit an existing country
  const editCountry = (countryId) => {
    const newName = prompt("Enter new country name:");
    if (newName && newName.trim() !== "") {
      setCountries(
        countries.map((country) =>
          country.id === countryId ? { ...country, name: newName.trim() } : country
        )
      );
    } else {
      alert("Country name cannot be empty!");
    }
  };

  // Function to delete a country
  const deleteCountry = (countryId) => {
    if (window.confirm("Are you sure you want to delete this country?")) {
      setCountries(countries.filter((country) => country.id !== countryId));
    }
  };

  return (
    <div className="app-container">
      <h2>Countries Management</h2>
      <button className="add" onClick={addCountry}>Add Country</button>
      <CountryList
        countries={countries}
        setCountries={setCountries}
        updateCountry={editCountry}
        deleteCountry={deleteCountry}
      />
    </div>
  );
};

export default App;
