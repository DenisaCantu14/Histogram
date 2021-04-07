import { request } from "graphql-request";
import { useEffect, useState } from "react";

const query = `{
    allPosts(count: 60) {
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
        if (year === 2019)
          numberOfPostsPerMonth[month] += 1;
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
     
    </>
  );
}

export default App;
