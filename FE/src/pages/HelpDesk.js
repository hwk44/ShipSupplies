import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../styles/HelpDesk.css';

const HelpDesk = () => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [id, setId] = useState(""); // 사용자 ID를 입력받기 위한 state
    const [isWriting, setIsWriting] = useState(false); // 글 작성 중인지 상태를 관리하는 state
    const [posts, setPosts] = useState([]);

    const token = localStorage.getItem('jwt');
    const userId = localStorage.getItem('userId');
    console.log('token', token);

    const fetchData = async () => {
        const response = await axios.get('/api/board/view', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        setPosts(response.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleWriteButton = () => {
        setIsWriting(true); // 글 작성 시작
    };

    const addBoard = async (e) => {
        e.preventDefault(); // form이 새로고침을 유발하는 것을 방지

        try {
            const response = await axios.post('/api/board/add', { title, text, user: { id:userId } },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(response.data);

            setTitle("");
            setText("");
            setId("");
            setIsWriting(false);
            await fetchData(); // 게시글을 추가한 후 게시글 목록을 다시 불러옴

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            {isWriting ? (
                <form onSubmit={addBoard}>
                    <label>
                        제목:
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </label>
                    <label>
                        본문:
                        <textarea value={text} onChange={(e) => setText(e.target.value)} required />
                    </label>
                    <button type="submit">제출</button>
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
                </div>
            )}
        </div>
    )
}

export default HelpDesk;
