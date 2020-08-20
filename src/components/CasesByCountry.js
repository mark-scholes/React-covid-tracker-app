import React from "react";
import "../Table.css";
import numeral from "numeral";

const CasesByCountry = ({ countries }) => {
  return (
    <div className="CasesByCountry__table">
      {countries.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td>
            <strong>{numeral(cases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
};

export default CasesByCountry;
