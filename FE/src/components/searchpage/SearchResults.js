// 결과 페이지 컴포넌트
import React from 'react';

const SearchResults = ({ results, currentPage, resultsPerPage, totalResults, onPageChange }) => {
  // 현재 페이지의 결과 범위 계산
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;

  // 현재 페이지의 결과 데이터 추출
  const currentPageResults = results.slice(startIndex, endIndex);

  // 페이지네이션을 위한 페이지 수 계산
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handlePageChange = (newPage) => {
    // 부모 컴포넌트로 페이지 변경 이벤트 전달
    onPageChange(newPage);
  };

  return (
    <div>
      {currentPageResults.map((result) => (
        <div key={result.id}>{result.title}</div>
      ))}

      {/* 페이지네이션 컴포넌트 렌더링 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

// 페이지네이션 컴포넌트
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
      <span>{currentPage}</span>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
}
export default SearchResults;
