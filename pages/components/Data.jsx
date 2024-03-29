import { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../_app";
import Image from "next/image";
import placeholderImage from "../images/dogPlaceHolder.png";
export default function Data() {
  const slide = 0;

  const [isLoading, setIsLoading] = useState(false);
  const accessToken = useContext(AuthContext);
  const [error, setError] = useState();

  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [petsPerPage] = useState(12);

  const numOfTotalPages = Math.ceil(results.length / petsPerPage);
  const pages = [...Array(numOfTotalPages + 1).keys()].slice(1);

  const indexOfLastResult = currentPage * petsPerPage;
  const indexOfFirstResult = indexOfLastResult - petsPerPage;

  const visiblePets = results.slice(indexOfFirstResult, indexOfLastResult);
  const abortControllerRef = useRef(null);
  //IF get blocked by CORS exceeded api count free tier for the day
  const URL = "https://api.petfinder.com/v2/animals?type=dog&limit=80";

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
          setError("Something went wrong please try again later!");
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
    <section className="main">
      <div className="dogsResults">
        <p className="adorable">Adorable Pups Available for Adoption</p>
        <div className="loading">
          {isLoading && <div>Loading Pet Matches...</div>}
          {error && (
            <div>
              Sorry, <b>exceeded API requests for the day</b> or something went
              wrong...contact admin
            </div>
          )}
        </div>
        <div className="matches">
          {!isLoading && (
            <>
              <div className="pets">
                {visiblePets.map((result, index) => {
                  let photos = result["photos"];
                  let pic = photos.map((pic, index) => {
                    return (
                      <div key={index}>
                        <img
                          src={pic.medium}
                          alt="small pic"
                          className={` ${
                            slide === index ? "petImg" : "petImg slide-hidden"
                          }`}
                        />
                      </div>
                    );
                  });
                  return (
                    <div key={index} className="petCard">
                      {pic.length > 0 && pic}
                      {!pic.length && (
                        <div>
                          <Image
                            src={placeholderImage}
                            alt="placeholder Image"
                            className="petImg"
                          />
                        </div>
                      )}
                      <div className="dogInfo">
                        <p>Name: {result.name}</p>
                        <p>Age: {result.age}</p>
                        <p>Zip Code: {result.contact.address.postcode}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
        <div className="pagination">
          {currentPage !== 1 && (
            <button onClick={handlePrevPage} className="prevBtn">
              Prev
            </button>
          )}
          {pages.map((page) => (
            <span
              key={page}
              onClick={() => setCurrentPage(page)}
              className={page == currentPage ? "activePage" : ""}
            >
              {` ${page} `}
            </span>
          ))}
          {results.length > 0 && currentPage !== numOfTotalPages && (
            <button onClick={handleNextPage} className="nextBtn">
              Next
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
