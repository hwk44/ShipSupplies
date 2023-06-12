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

    // 최대 페이지 버튼 수
    const maxPageButtons = 5;

    const fetchData = async (page, size) => {
        const response = await axios.get(`/api/board/view?page=${page}&size=${size}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        setPosts(response.data.content); // 'content'는 페이지에 대한 데이터를 담고있는 속성
    }

    // 페이지 버튼 클릭 이벤트 핸들러
    const pageClick = (pageNumber) => {
        setPage(pageNumber);
    }

    // 이전 버튼 클릭
    const prevClick = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    }

    // 다음 버튼 클릭
    const nextClick = () => {
        const totalPages = 100;
        if (page < totalPages - 1) {
            setPage(page + 1);
        }

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
                <form className='wrtTable' onSubmit={addBoard}>
                    <table>
                        <tbody>
                            <tr>
                                <th>제목</th>
                                <td>
                                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                                </td>
                            </tr>
                            <tr>
                                <th>본문</th>
                                <td>
                                    <textarea value={text} onChange={(e) => setText(e.target.value)} required />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button className='wrtBtn' type="submit">제출</button>
                </form>

            ) : (
                <div className='boardList'>
                    <h1 className='h1'>1:1 문의 게시판</h1>
                    <button className='writebtn' onClick={handleWriteButton}>글쓰기</button>
                    <table>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>작성자</th>
                                <th>작성일</th>

                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post, index) => {
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
                    <div>
                        <button onClick={prevClick}>[이전] &nbsp; </button>
                        {[...Array(maxPageButtons).keys()].map((i) =>
                            <button key={i} onClick={() => pageClick(i)}>{i + 1} &nbsp;</button>
                        )}
                        <button onClick={nextClick}>[다음]</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default HelpDesk;
