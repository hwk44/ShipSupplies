import { useEffect } from "react";

const SearchResults = ({ seldata }) => {

  useEffect(() => {
    console.log("seldata => ", seldata);
  }, [seldata])
  return (
    <div>
      {/* {seldata.map((result) => (
        <div key={result.id}>{result.title}</div>
      ))} */}
    </div>
  );
}
export default SearchResults;