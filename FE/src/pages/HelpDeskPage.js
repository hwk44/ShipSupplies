import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/HelpDesk.css';

const HelpDesk = () => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [id, setId] = useState(""); // 사용자 ID를 입력받기 위한 state
    const [isWriting, setIsWriting] = useState(false); // 글 작성 중인지 상태를 관리하는 state
    const [posts, setPosts] = useState([]);

    const userId = localStorage.getItem('userId');

    // 페이지 번호에 대한 상태 변수 추가
    const [page, setPage] = useState(0);

    // 페이지별 게시글 개수
    const pageSize = 10;

    // 페이지네이션 변수
    const [currentPage, setCurrentPage] = useState(1);

    // 페이지네이션 시작과 끝 인덱스 설정
    const ITEMS_PER_PAGE = 10;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    // 페이지네이션 숫자 배열 생성
    // 이 부분 오류?
    const pageNumbers = posts
        ? [...Array(Math.ceil(posts.length / ITEMS_PER_PAGE)).keys()]
        : [];

    // 현재 페이지가 속한 페이지 그룹 인덱스 계산
    const currentPageGroupIndex = Math.floor((currentPage - 1) / 10);

    // n 개씩 페이지네이션 그룹으로 나누기
    const pageGroups = [];
    for (let i = 0; i < pageNumbers.length; i += 10) {
        pageGroups.push(pageNumbers.slice(i, i + 10));
    }

    // 페이지 전환 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const fetchData = async (page, size) => {
        const response = await axios.get(`/api/board/view?page=${page}&size=${size}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        setPosts(response.data.content); // 'content'는 페이지에 대한 데이터를 담고있는 속성
    }

    useEffect(() => {
        fetchData(page, pageSize); // 첫 번째 페이지, 페이지당 10개의 게시글 불러옴  
    }, [page]);

    const handleWriteButton = () => {
        setIsWriting(true); // 글 작성 시작
    };

    const addBoard = async (e) => {
        e.preventDefault(); // form이 새로고침을 유발하는 것을 방지

        try {
            const response = await axios.post('/api/board/add', { title, text, user: { id: userId } },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            console.log(response.data);

            setTitle("");
            setText("");
            setId("");
            setIsWriting(false);
            await fetchData(page, pageSize); // 게시글을 추가한 후 게시글 목록을 다시 불러옴

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            {isWriting ? (
                <div className="flex justify-center">

                    <div className='wrtTable'>
                        <div className="border p-6 h-full">
                            <form onSubmit={addBoard}>
                                <div className='float-right'>
                                    <button onClick={handleWriteButton}
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ">
                                        제출
                                    </button>
                                </div>
                                <table className="h-96">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <input className="block w-full h-full border-0 border-b-2 border-gray-200 outline-none px-11 py-3 text-2xl"
                                                    type="text" placeholder="제목"
                                                    value={title} onChange={(e) => setTitle(e.target.value)} required />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <textarea className="w-full h-full outline-none p-11 text-lg"
                                                    placeholder="내용을 입력해주세요."
                                                    value={text} onChange={(e) => setText(e.target.value)} required />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>

            ) : (
                <>
                    <div className='boardList'>
                        <h1 className='h1'>1:1 문의 게시판</h1>
                        <table className="t1 mb-6">
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>제목</th>
                                    <th>작성자</th>
                                    <th>작성일</th>

                                </tr>
                            </thead>
                            <tbody>
                                {posts && posts.slice(startIndex, endIndex).map((post, index) => {
                                    const date = new Date(post.date).toLocaleDateString();
                                    return (
                                        <tr key={post.id}>
                                            <td><Link to={`/post/${post.id}`}>{index + 1}</Link></td>
                                            <td><Link to={`/post/${post.id}`}>{post.title}</Link></td>
                                            <td><Link to={`/post/${post.id}`}>{post.user.id}</Link></td>
                                            <td><Link to={`/post/${post.id}`}>{date}</Link></td>
                                        </tr>
                                    )
                                })}
                            </tbody>

                        </table>

                        <ul className="pagination">
                            {currentPageGroupIndex > 0 && (
                                <li>
                                    <span onClick={() => handlePageChange((currentPageGroupIndex - 1) * 10 + 1)}>
                                        &lt; 이전
                                    </span>
                                </li>
                            )}
                            {pageGroups[currentPageGroupIndex]?.map((pageNumber) => (
                                <li key={pageNumber}>
                                    <span
                                        onClick={() => handlePageChange(pageNumber + 1)}
                                        className={currentPage === pageNumber + 1 ? "active" : ""}
                                    >
                                        {pageNumber + 1}
                                    </span>
                                </li>
                            ))}
                            {currentPageGroupIndex < pageGroups.length - 1 && (
                                <li>
                                    <span onClick={() => handlePageChange((currentPageGroupIndex + 1) * 10 + 1)}>
                                        다음 &gt;
                                    </span>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="float-right mr-32 mt-10">
                        <button onClick={handleWriteButton}
                            className="mx-14 mt-3 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                            글쓰기
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default HelpDesk;
