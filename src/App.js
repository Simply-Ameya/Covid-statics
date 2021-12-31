import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Pagination } from "react-bootstrap";
import { Bar, BarChart, Legend, XAxis, YAxis } from "recharts";

class App extends React.Component {
  state = {
    covidData: [],
    currentPage: 1,
    dataPerPage: 5,
  };

  async componentDidMount() {
    const url = "https://api.covid19api.com/summary";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      covidData: data.Countries,
    });
    console.log();
  }

  handleClick = (event) => {
    this.setState({
      currentPage: Number(event.target.id),
    });
  };

  render() {
    const { currentPage, dataPerPage, covidData } = this.state;
    const lastData = currentPage * dataPerPage;
    const firstData = lastData - dataPerPage;
    const currentData = covidData?.slice(firstData, lastData);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(covidData.length / dataPerPage); i++) {
      pageNumbers.push(i);
    }

    let paginationNumbers = [];
    if (currentPage < 3) {
      paginationNumbers = [1, 2, 3, 4, 5];
    } else if (currentPage > 37) {
      paginationNumbers = [35, 36, 37, 38, 39];
    } else {
      for (
        let i = currentPage - 2;
        i <= currentPage + Math.floor(pageNumbers.length / 7) - 3;
        i++
      ) {
        paginationNumbers.push(i);
      }
    }

    return (
      <div className="App">
        <h1 className="heading">Covid Statistics</h1>
        <div className="chart-container">
          <BarChart
            width={1000}
            height={500}
            data={currentData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="Country" />
            <YAxis />
            <Legend />
            <>
              <Bar dataKey="TotalConfirmed" fill="#8884d8" />
              <Bar dataKey="TotalDeaths" fill="#82ca9d" />
              <Bar dataKey="TotalRecovered" fill="#8884d8" />
            </>
            );
          </BarChart>
        </div>

        <div className="pagination-container">
          <Pagination>
            <Pagination.First
              onClick={() => {
                this.setState({ currentPage: 1 });
              }}
            />
            {currentPage > 1 ? (
              <Pagination.Prev
                onClick={() => {
                  this.setState({ currentPage: currentPage - 1 });
                }}
              />
            ) : (
              <></>
            )}
            {paginationNumbers.map((number) => {
              return (
                <Pagination.Item
                  key={number}
                  id={number}
                  onClick={this.handleClick}
                >
                  {number}
                </Pagination.Item>
              );
            })}
            {currentPage < 39 ? (
              <Pagination.Next
                onClick={() => {
                  this.setState({ currentPage: currentPage + 1 });
                }}
              />
            ) : (
              <></>
            )}
            <Pagination.Last
              onClick={() => {
                this.setState({ currentPage: 39 });
              }}
            />
          </Pagination>
        </div>
      </div>
    );
  }
}

export default App;
