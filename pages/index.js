import { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "./_app";

export default () => {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = useContext(AuthContext);
  const [error, setError] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [petsPerPage] = useState(5);
  //IF get blocked by CORS exceeded api count free tier for the day
  const URL = "https://api.petfinder.com/v2/animals?type=dog";
  const [currentResult, setCurrentResult] = useState([]);
  const abortControllerRef = useRef(null);
  const [lastPage, setLastPage] = useState(false);
  useEffect(() => {
    if (accessToken === null) return;
    const abortController = new AbortController();
    const fetchPets = async () => {
      abortControllerRef.current?.abort();
      setIsLoading(true);
      try {
        const petResults = await fetch(`${URL}&page=${currentPage}`, {
          signal: abortControllerRef.current?.signal,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const json = await petResults.json();
        setResults(json.animals);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setError(error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchPets();
    return () => abortController.abort();
  }, [accessToken, currentPage]);

  //Get Current Results
  const indexOfLastResult = currentPage * petsPerPage;
  const indexOfFirstResult = indexOfLastResult - petsPerPage;
  useEffect(() => {
    if (results && !isLoading) {
      const totalResult = results.slice(indexOfFirstResult, indexOfLastResult);
      setCurrentResult(totalResult);
      if (totalResult.length == 0) {
        setLastPage(true);
      }
    }

    return () => {
      setResults(null);
    };
  }, [results]);

  function handleNextPage() {
    setCurrentPage((prevPage) => prevPage + 1);
  }

  function handlePreviousPage() {
    setCurrentPage((prevPage) => prevPage - 1);
  }

  return (
    <>
      {isLoading && <div>Loading Pet Matches...</div>}
      {error && (
        <div>
          Sorry, <b>exceeded API requests for the day</b> or something went
          wrong...contact admin
        </div>
      )}
      {!isLoading &&
        currentResult.map((result, index) => {
          let { contact, name, age } = result;
          return (
            <div key={index}>
              <p>Name: {name}</p>
              <p>Age: {age}</p>
              <p>Zip Code: {contact.address.postcode}</p>
            </div>
          );
        })}
      {!isLoading && !lastPage && (
        <button onClick={handleNextPage}>Next Page</button>
      )}
      {!isLoading && !lastPage && currentPage !== 1 && (
        <button onClick={handlePreviousPage}>Previous Page</button>
      )}
      {lastPage && <p>No More Results</p>}
    </>
  );
};
