import React from "react";
import "../Table.css";

const CasesByCountry = ({ countries }) => {
  return (
    <div className="CasesByCountry__table">
      {countries.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td>
            <strong>{cases}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
};

export default CasesByCountry;
