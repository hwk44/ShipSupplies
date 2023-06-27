const SearchResults = ({ results, currentPage, resultsPerPage, totalResults, onPageChange }) => {
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;

  const currentPageResults = results.slice(startIndex, endIndex);

  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handlePageChange = (newPage) => {
    onPageChange(newPage);
  };

  return (
    <div>
      {currentPageResults.map((result) => (
        <div key={result.id}>{result.title}</div>
      ))}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div>
      <button onClick={handlePrevPage}>Previous</button>
      <span>{}</span>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
}
export default SearchResults;
