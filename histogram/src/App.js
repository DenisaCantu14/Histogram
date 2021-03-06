import { request } from "graphql-request";
import { useEffect, useState } from "react";
import Histogram from "./components/Histogram";

const query = `{
    allPosts(count: 200) {
      id
      createdAt
    } 
}`;

function App() {
  const [loading, setLoading] = useState(true);
  const [histogramData, setHistogramData] = useState(null);

  async function fetchInfo() {
    request("https://fakerql.stephix.uk/graphql", query).then((data) => {
      let numberOfPostsPerMonth = [];
      for (let month = 0; month < 12; month++) numberOfPostsPerMonth[month] = 0;
      let monthAndNumber = [];

      data.allPosts.map((item) => {
        let date = new Date(parseInt(item.createdAt));
        let month = date.getMonth();
        let year = date.getFullYear();
        if (year === 2019) numberOfPostsPerMonth[month] += 1;
      });

      for (let i = 0; i < 12; i++) {
        monthAndNumber.push({ month: i, number: numberOfPostsPerMonth[i] });
      }
      setHistogramData(monthAndNumber);
    });

    setLoading(false);
  }

  useEffect(() => {
    if (loading) fetchInfo();
  });
  return (
    <>
      {histogramData === null ? (
        <p className="loading">Loading...</p>
      ) : (
        <>
          <h1 id="title">Posts in 2019</h1>
          <Histogram data={histogramData} />
        </>
      )}
    </>
  );
}

export default App;
