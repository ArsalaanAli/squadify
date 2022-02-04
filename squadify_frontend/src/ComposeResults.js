import React from "react";
import "./ComposeResults.css";
function ComposeResults(parsedData) {
  const renderedItems = [];
  for (const [key, value] of Object.entries(parsedData)) {
    if (key === "lowestPop") {
      renderedItems.push(
        <h1 className="squadifyResult">
          {value[0]} listens to less popular music
        </h1>
      );
      continue;
    }
    if (key === "highestPop") {
      renderedItems.push(
        <h1 className="squadifyResult">
          {value[0]} listens to more popular music
        </h1>
      );
      continue;
    }
    renderedItems.push(
      <h1 className="squadifyResult">
        {value[0]} listens to the most {key}
      </h1>
    );
  }
  return <div>{renderedItems}</div>;
}

export default ComposeResults;
