import React, { useMemo } from "react";

type Props = { rateNumber: number; style: React.CSSProperties };
export default function Abbreviate_Numbers({ rateNumber, style }: Props) {
  const rate = useMemo(() => abbreviateNumber(rateNumber), [rateNumber]);
  return <p style={style}>{rate}</p>;
}

//Add suffixes to long numbers
const abbreviateNumber = (value: number) => {
  const suffixes = ["", "K", "M", "B", "T"];
  const suffixNum = Math.floor(("" + value).length / 3);
  const suffixVal = parseFloat(
    suffixNum != 0
      ? (value / Math.pow(1000, suffixNum)).toString()
      : value.toString()
  );

  let newValue =
    suffixVal.toString().length > 2
      ? suffixVal.toPrecision(3)
      : suffixVal.toPrecision();

  newValue += suffixes[suffixNum];
  return newValue;
};
