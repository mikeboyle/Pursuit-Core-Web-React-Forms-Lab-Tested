import React from "react";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
      types: [],
      results: [],
    };
  }

  handleInputChange = (e) => {
    this.setState({ input: e.target.value });
  };

  handleSelectChange = (e) => {
    const selectedOptions = e.target.selectedOptions;
    let types = [];
    for (let option of selectedOptions) {
      types.push(option.value);
    }

    this.setState({ types });
  };

  sum = (nums) => {
    return nums.reduce((prev, next) => prev + next, 0);
  };

  average = (nums) => {
    return this.sum(nums) / nums.length;
  };

  mode = (nums) => {
    const counter = nums.reduce((acc, num) => {
      if (acc[num]) {
        acc[num]++;
      } else {
        acc[num] = 1;
      }
      return acc;
    }, {});

    const sortedKeys = Object.keys(counter).sort(
      (a, b) => counter[b] - counter[a]
    );
    return sortedKeys[0];
  };

  getResult = (nums, type) => {
    switch (type) {
      case "sum":
        return `Sum: ${this.sum(nums)}`;
      case "average":
        return `Average: ${this.average(nums)}`;
      case "mode":
        return `Mode: ${this.mode(nums)}`;
      default:
        return "";
    }
  };

  getResults = (nums, types) => {
    let results = [];
    for (let type of types) {
      results.push(this.getResult(nums, type));
    }
    return results;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { input, types } = this.state;
    const nums = this.parseInput(input);
    let results;

    if (!input || !this.validateNums(nums)) {
      results = ["Invalid input."];
    } else {
      results = this.getResults(nums, types);
    }
    this.setState({ results });
  };

  parseInput = (input) => {
    try {
      return input.split(",").map((n) => Number(n));
    } catch (e) {
      return false;
    }
  };

  isNumber = (val) => {
    return typeof val === "number" && !isNaN(val);
  };

  validateNums = (nums) => {
    return nums && nums.every((n) => this.isNumber(n));
  };

  render() {
    const { results } = this.state;
    return (
      <div className="App">
        <h1>Enter each number in the array, separated by a ','</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleInputChange} />
          <select multiple onChange={this.handleSelectChange}>
            <option value="sum">sum</option>
            <option value="average">average</option>
            <option value="mode">mode</option>
          </select>
          <button type="submit">Calculate</button>
        </form>
        {results.map((r, i) => (
          <p key={r + i}>{r}</p>
        ))}
      </div>
    );
  }
}

export default App;
