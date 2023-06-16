import React, { useState } from 'react';
import { BsPerson } from 'react-icons/bs';

const Dropdown1 = () => {
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 상태를 관리하는 state

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // 드롭다운 상태를 토글
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        data-dropdown-toggle="dropdown"
        id="dropdownDefaultButton"
        className="mx-2.5 text-gray-400 hover:text-black"
      >
        <BsPerson size={30} />
      </button>
      {isOpen && (
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200 absolute left-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow z-10"
          aria-labelledby="dropdownDefaultButton"
        >
          <li>
            <a
              href="/userupdate"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center"
            >
              <span style={{ whiteSpace: 'nowrap' }}>정보수정</span>
            </a>
          </li>
          
          <li>
            <a
              href="/userdelete"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center"
            >
              <span style={{ whiteSpace: 'nowrap' }}>회원탈퇴</span>
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown1;
