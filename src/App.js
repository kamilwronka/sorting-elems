import React, { Component } from "react";
import "./App.css";
import { sortBy } from "lodash";

var data = [
  {
    name: "c",
    children: [
      {
        name: "x",
        children: [
          {
            name: "c",
            children: []
          },
          {
            name: "a",
            children: []
          },
          {
            name: "b",
            children: []
          }
        ]
      },
      {
        name: "a",
        children: [
          {
            name: "c",
            children: []
          },
          {
            name: "a",
            children: []
          },
          {
            name: "b",
            children: []
          }
        ]
      }
    ]
  },
  {
    name: "a",
    children: [
      {
        name: "x",
        children: [
          {
            name: "c",
            children: []
          },
          {
            name: "a",
            children: []
          },
          {
            name: "b",
            children: []
          }
        ]
      }
    ]
  }
];

class App extends Component {
  state = {
    isSorted: false,
    list: data
  };
  renderElems = data => {
    return data.map((elem, index) => (
      <li key={index}>
        {elem.name}
        <ul>
          {elem.children.map(elem => {
            return (
              <li key={elem.name}>
                {elem.name}
                <ul>
                  {elem.children.map(elem => {
                    return <li key={elem.name}>{elem.name}</li>;
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </li>
    ));
  };

  sortElems = data => {
    const sorted = sortBy(data, "name").map(elem => {
      return {
        ...elem,
        children: sortBy(elem.children, "name").map(elem => {
          return { ...elem, children: sortBy(elem.children, "name") };
        })
      };
    });
    return sorted;
  };

  sortByName = () => {
    const { list } = this.state;
    this.setState({
      isSorted: true,
      list: this.sortElems(list)
    });
  };
  sortByDefault = () => {
    this.setState({
      isSorted: false,
      list: data
    });
  };
  render() {
    const { isSorted, list } = this.state;
    return (
      <div>
        <button onClick={this.sortByName}>SortByName</button>
        <button onClick={this.sortByDefault}>SortByDefault</button>
        <h2>{isSorted ? "Sorted by name" : "Sorted by default"}</h2>
        <ul>{this.renderElems(list)}</ul>
      </div>
    );
  }
}

export default App;
