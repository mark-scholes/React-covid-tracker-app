import React, { useState, useEffect } from "react";
import "./App.css";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import CasesByCountry from "./components/CasesByCountry";
import Graph from "./components/Graph";
import { sortData, statFormat } from "./util";
import "leaflet/dist/leaflet.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [cases, setCases] = useState(0);
  const [total, setTotal] = useState(0);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [center, setCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [zoom, setZoom] = useState(4);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
          setMapCountries(data);
        });
    };

    getCountriesData();
  }, []);

  //inital data displayed when all loads will be the worldwide data.
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountry("worldwide");
        setCountryInfo(data);
      });
  }, []);

  //fires of when the user chooses a different country from the dropdown
  const changeCountry = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
    // api call
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);

        setCenter([data.countryInfo.lat, data.countryInfo.long]);
        setZoom(4);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>covid-19 tracker</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" value={country} onChange={changeCountry}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            cases={statFormat(countryInfo.todayCases)}
            total={statFormat(countryInfo.cases)}
            active={casesType === "cases"}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={statFormat(countryInfo.todayRecovered)}
            total={statFormat(countryInfo.recovered)}
            active={casesType === "recovered"}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={statFormat(countryInfo.todayDeaths)}
            total={statFormat(countryInfo.deaths)}
            active={casesType === "deaths"}
          />
        </div>

        <Map
          center={center}
          zoom={zoom}
          countries={mapCountries}
          casesType={casesType}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <CasesByCountry countries={tableData} />
        </CardContent>
        <CardContent>
          <h3>Worldwide {casesType}</h3>
          <Graph casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
};

export default App;

// firebase init
//select the correct one from the list
// build
//npm run build
