import React, { useEffect, useState } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import Comment from './Comment';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [editing, setEditing] = useState(false);  // 수정 모드 상태값
    const [updatedTitle, setUpdatedTitle] = useState('');  // 수정된 제목 상태값
    const [updatedText, setUpdatedText] = useState('');  // 수정된 본문 상태값
    
    const navigate = useNavigate();

    const token = localStorage.getItem('jwt');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchPost = async () => {
            const response = await axios.get(`/api/board/view/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            setPost(response.data);
            setUpdatedTitle(response.data.title);
            setUpdatedText(response.data.text);
        };
        fetchPost();
    }, [id]);

    const updateBoard = async () => {
        const updatedPost = {
            title: updatedTitle,
            text: updatedText,
            user: {id: userId}
        };
        await axios.put(`/api/board/update/${id}`, updatedPost, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        setEditing(false);
        const response = await axios.get(`/api/board/view/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        setPost(response.data);
    };

    const deleteBoard = async () => {

        const data = {
            user: {id: userId}
        }

        await axios.delete(`/api/board/delete/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data : data
        });
        navigate('/helpdesk');
    };

    return (
        <div className='writingDetail'>
            {post && (
                <div>
                    <h1 className='postDetail'>글 상세보기</h1>
                    {!editing ? (
                        <>
                            <button onClick={() => setEditing(true)} className='updateBtn'>수정</button>
                            <button onClick={deleteBoard} className='deleteBtn'>삭제</button>
                        </>
                    ) : (
                        <>
                            <button onClick={updateBoard} className='updateBtnSubmit'>제출</button>
                            <button onClick={() => setEditing(false)} className='cancelBtn'>취소</button>
                        </>
                    )}
                    
                    <table>
                        <tbody>
                            <tr><td>글 번호</td><td>{post.id}</td></tr>
                            <tr><td>제목</td><td>{editing ? <input type="text" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} required /> : post.title}</td></tr>
                            <tr><td>작성일</td><td>{new Date(post.date).toLocaleString('ko-KR')}</td></tr>
                            <tr><td>작성자</td><td>{post.user.id}</td></tr>
                            <tr><td>본문</td><td>{editing ? <textarea value={updatedText} onChange={(e) => setUpdatedText(e.target.value)} required /> : post.text}</td></tr>
                        </tbody>
                    </table>
                    <br></br>
                    <h1 className='postDetail'>댓글 모음</h1>
                    <Comment id = {id}/>
                </div>
            )}
        </div>
    );
};

export default PostDetail;
