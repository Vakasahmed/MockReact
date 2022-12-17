import React, { useState, useEffect } from "react";
import data from "../Data";
import AllBank from "./AllBank";
import SingleBank from "./SingleBank";

function Bank() {
  const [input, setInput] = useState("");
  const [same, setSamedata] = useState();
  const [uniq, setUniq] = useState([]);
  const change = (e) => {
    e.target.value === "" ? setInput("") : setInput(JSON.parse(e.target.value));
  };

  useEffect(() => {
    data.forEach((e) => {
      const uniqData = uniq.find((ele) => ele.Bank === e.Bank);
      if (!uniqData) {
        setUniq([...uniq, e]);
      }
    });
  }, [uniq]);

  useEffect(() => {
    let arr = [];
    data.forEach((e) => {
      if (e.Bank === input.Bank) {
        arr.push(e);
      }
    });
    setSamedata(arr);
  }, [input]);

  return (
    <div className="bank">
      <div className="header flex">
        <h2>All Banks</h2>
        <div className="dropdown">
          <select onChange={(e) => change(e)}>
            <option value={""}>Select Option</option>
            {uniq.map((e, i) => {
              return (
                <option value={JSON.stringify(e)} key={i}>
                  {e.Bank}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="table-parent">
        {input === "" ? <AllBank /> : <SingleBank same={same} />}
      </div>
    </div>
  );
}

export default Bank;
