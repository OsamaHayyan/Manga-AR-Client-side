import React from "react";

export default function Abbreviate_Numbers({ number }) {
  const abbreviateNumber = (value) => {
    let newValue = value;
    const suffixes = ["", "K", "M", "B", "T"];
    const suffixNum = Math.floor(("" + newValue).length / 3);
    const suffixVal = parseFloat(
      suffixNum != 0 ? newValue / Math.pow(1000, suffixNum) : newValue
    );

    newValue =
      suffixVal.toString().length > 2
        ? suffixVal.toPrecision(3)
        : suffixVal.toPrecision();

    newValue += suffixes[suffixNum];
    return newValue;
  };

  return abbreviateNumber(number);
}
