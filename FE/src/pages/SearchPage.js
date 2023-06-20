import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import items from '../db/items.json';
import data from '../db/datas.json'
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Search.css';
import { BiSearch } from "react-icons/bi";
import Select from 'react-select';
import SearchBar from '../components/searchpage/SearchBar';
import SearchResults from '../components/searchpage/SearchBar';

const SearchPage = () => {

  return (
    <div>
      <SearchBar/>
      {/* <SearchResults results={searchResults} /> */}
    </div>
  );
}
export default SearchPage;