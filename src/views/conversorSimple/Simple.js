import React, { Component } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import InputMonto from "../../components/InputMonto/InputMonto";

import "./simple.css";

class Simple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerHeight + "px",
      fromValue: "USD",
      toValue: "EUR",
      fromPais: "",
      toPais: "",
      fromNumber: 1,
      toNumber: 0,
      money: {},
      quotes: [],
      valueChange: true,
      valorN: ""
    };
  }

  componentDidMount() {
    this.fetchMoney();
    this.fetchCurrency();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      (prevState.fromNumber !== this.state.fromNumber &&
        this.state.valueChange) ||
      prevState.fromValue !== this.state.fromValue
    ) {
      this.handleUpdate();
    } else if (
      (prevState.toNumber !== this.state.toNumber && !this.state.valueChange) ||
      prevState.toValue !== this.state.toValue
    ) {
      this.handleUpdate();
    }
  }

  fetchMoney = async () => {
    const cacheList = window.localStorage.getItem("currencies");
    let data = {};

    if (!cacheList) {
      const response = await fetch(
        "http://free.currconv.com/api/v7/currencies?apiKey=a1e899d15f766cc09eea"
      );

      data = await response.json();

      window.localStorage.setItem("currencies", JSON.stringify(data));
    } else data = await JSON.parse(cacheList);

    this.setState({
      money: data.results
    });
  };

  fetchCurrency = async () => {
    if (this.state.quotes.length === 0) {
      const band = await this.cacheExist();
      if (band && this.state.quotes.length === 0) {
        await this.fetchQuotes();
      }
    }
    const value = this.valueExist();
    this.validation(value);

    this.setState({
      fromPais: this.state.money[this.state.fromValue].currencyName,
      toPais: this.state.money[this.state.toValue].currencyName
    });
  };

  handleUpdate = async () => {
    let value = this.valueExist();
    if (value === -1) {
      await this.fetchQuotes();
      value = this.valueExist();
    }
    this.validation(value);

    this.setState({
      fromPais: this.state.money[this.state.fromValue].currencyName,
      toPais: this.state.money[this.state.toValue].currencyName
    });
  };

  fetchQuotes = async () => {
    const from = this.state.fromValue;
    const to = this.state.toValue;

    const response = await fetch(
      `http://free.currconv.com/api/v7/convert?q=${from}_${to},${to}_${from}&compact=ultra&apiKey=a1e899d15f766cc09eea`
    );

    const data = await response.json();

    window.localStorage.setItem(this.state.valorN, JSON.stringify(data));

    this.setState({
      quotes: [...this.state.quotes, data]
    });
  };

  cacheExist = async () => {
    let band = true;
    let n = 0;
    do {
      const cacheList = window.localStorage.getItem(`quotes${n}`);
      if (cacheList) {
        const data = await JSON.parse(cacheList);
        this.setState({
          quotes: [...this.state.quotes, data]
        });
      } else {
        this.setState({
          valorN: `quotes${n}`
        });
        return true;
      }
      n++;
    } while (band);
  };

  valueExist = () => {
    const data = this.state.quotes;
    const id = this.state.valueChange
      ? `${this.state.fromValue}_${this.state.toValue}`
      : `${this.state.toValue}_${this.state.fromValue}`;

    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if (element.hasOwnProperty(id)) {
        return element[id];
      }
    }
    return -1;
  };

  validation = value => {
    if (this.state.valueChange) {
      this.setState({
        toNumber: Math.round(this.state.fromNumber * value * 100) / 100
      });
    } else {
      this.setState({
        fromNumber: Math.round(this.state.toNumber * value * 100) / 100
      });
    }
  };

  handleChangeSymbolFrom = e => {
    const value = e.target.value;
    if (value === this.state.toValue) {
      this.setState({
        toValue: this.state.fromValue,
        fromValue: value,
        valueChange: `${this.state.fromValue}`
      });
    } else {
      this.setState({
        fromValue: value
      });
    }
  };

  handleChangeSymbolTo = e => {
    const value = e.target.value;
    if (value === this.state.fromValue) {
      this.setState({
        fromValue: this.state.toValue,
        toValue: value
      });
    } else {
      this.setState({
        toValue: value
      });
    }
  };

  handleChangeValueFrom = e => {
    const value = e.target.value;
    this.setState({
      fromNumber: value,
      valueChange: true
    });
  };

  handleChangeValueTo = e => {
    const value = e.target.value;
    this.setState({
      toNumber: value,
      valueChange: false
    });
  };

  render() {
    return (
      <div className="container" style={{ height: this.state.width }}>
        <NavBar />
        <div className="container__conversor">
          <form action="" className="container__conversor--form">
            <InputMonto
              listMoney={this.state.money}
              symbolMoney={this.state.fromValue}
              valueMoney={this.state.fromNumber}
              symbolChange={this.handleChangeSymbolFrom}
              valueChange={this.handleChangeValueFrom}
            />
            <InputMonto
              listMoney={this.state.money}
              symbolMoney={this.state.toValue}
              valueMoney={this.state.toNumber}
              symbolChange={this.handleChangeSymbolTo}
              valueChange={this.handleChangeValueTo}
            />
            <div className="container__name">
              <span>{this.state.fromPais}</span>
              <span>></span>
              <span>{this.state.toPais}</span>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Simple;
