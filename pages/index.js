import { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "./_app";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = useContext(AuthContext);
  const [error, setError] = useState();

  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [petsPerPage] = useState(5);

  const numOfTotalPages = Math.ceil(results.length / petsPerPage);
  const pages = [...Array(numOfTotalPages + 1).keys()].slice(1);

  const indexOfLastResult = currentPage * petsPerPage;
  const indexOfFirstResult = indexOfLastResult - petsPerPage;

  const visiblePets = results.slice(indexOfFirstResult, indexOfLastResult);
  const abortControllerRef = useRef(null);
  //IF get blocked by CORS exceeded api count free tier for the day
  const URL = "https://api.petfinder.com/v2/animals?type=dog&limit=50";
  useEffect(() => {
    if (accessToken === null) return;
    const abortController = new AbortController();
    const fetchPets = async () => {
      abortControllerRef.current?.abort();
      setIsLoading(true);
      try {
        const petResults = await fetch(`${URL}`, {
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
  }, [accessToken]);

  function handlePrevPage() {
    setCurrentPage((prevPage) => prevPage - 1);
  }
  function handleNextPage() {
    setCurrentPage((prevPage) => prevPage + 1);
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
        visiblePets.map((result, index) => {
          let { contact, name, age } = result;
          return (
            <div key={index}>
              <p>Name: {name}</p>
              <p>Age: {age}</p>
              <p>Zip Code: {contact.address.postcode}</p>
            </div>
          );
        })}
      {currentPage !== 1 && <button onClick={handlePrevPage}> Prev </button>}
      {pages.map((page) => (
        <span key={page} onClick={() => setCurrentPage(page)}>
          {` ${page} `}
        </span>
      ))}
      {currentPage !== numOfTotalPages && (
        <button onClick={handleNextPage}> Next </button>
      )}
    </>
  );
}
