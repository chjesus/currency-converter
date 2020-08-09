import React from "react";

import "./inputmonto.css";

function InputMonto(props) {
  const list = [];
  for (const quotes in props.listMoney) {
    list.push(quotes);
  }

  return (
    <div className="form__money">
      <input
        type="number"
        className="monto"
        name="from"
        id=""
        placeholder="Monto"
        value={props.valueMoney}
        onChange={props.valueChange}
      />
      <select
        value={props.symbolMoney}
        onChange={props.symbolChange}
        name=""
        id=""
        className="money"
      >
        {list.map(element => {
          return (
            <option value={element} key={element}>
              {element}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default InputMonto;
