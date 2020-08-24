import React from "react";
import { Card, CardContent } from "@material-ui/core";
import "../InfoBox.css";

const InfoBox = ({ title, cases, total, active, ...props }) => {
  return (
    <Card
      className={`infoBox ${active && "infoBox--selected"}`}
      onClick={props.onClick}
    >
      <CardContent>
        <h1 className="infoBox__title" color="textSecondary">
          {title}
        </h1>
        <h2 className="infoBox__cases">{cases}</h2>
        <p className="infoBox__total" color="textSecondary">
          {total} Total
        </p>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
