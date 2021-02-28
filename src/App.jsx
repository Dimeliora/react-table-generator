import { useState, useEffect } from "react";

import TableGenerator from "./Components/TableGenerator";
import Loader from "./Components/Loader";

import s from "./App.module.scss";

const App = () => {
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const requestData = async () => {
      try {
        setIsFetching(true);
        const response = await fetch("https://api.publicapis.org/entries");
        const { entries } = await response.json();

        const usefullData = entries.map((entry) => {
          const { Link: _, ...rest } = entry;
          return rest;
        });

        setData(usefullData);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsFetching(false);
      }
    };

    requestData();
  }, []);

  if (!isError && isFetching) {
    return (
      <div className={s.center}>
        <Loader />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className={s.center}>
        <h1>Something went wrong. Please try later</h1>
      </div>
    );
  }

  return (
    <div className={s.app}>
      <TableGenerator data={data} />
    </div>
  );
};

export default App;
