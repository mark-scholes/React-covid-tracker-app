import React from "react";
import "../Table.css";
import numeral from "numeral";

const CasesByCountry = ({ countries }) => {
  return (
    <div className="CasesByCountry__table">
      <table>
        <tbody>
          {countries.map(({ country, cases }) => (
            <tr key={country}>
              <td>{country}</td>
              <td>
                <strong>{numeral(cases).format("0,0")}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CasesByCountry;
