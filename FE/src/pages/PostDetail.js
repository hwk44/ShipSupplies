import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Comment from './Comment';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);


    // localStorage에 저장된 사용자 ID 가져오기
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('jwt');


    useEffect(() => {
        const fetchPost = async () => {
            const response = await axios.get(`/api/board/view/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            setPost(response.data);
        };
        fetchPost();
    }, [id]);

    const fetchComments = async () => {
        const response = await axios.get(`/api/comment/get/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        setComments(response.data);
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const addComment = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/comment/add', {
                text: comment,
                date: new Date(),
                user: { id: userId }, // 로컬 스토리지에서 가져온 ID 사용
                board: { id: id }
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
            console.log(response.data);
            setComment("");
            await fetchComments();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='writingDetail'>
            {post && (
                <div>
                    <h1 className='postDetail'>글 상세보기</h1>
                    <table>
                        <tbody>
                            <tr><td>글 번호</td><td>{post.id}</td></tr>
                            <tr><td>제목</td><td>{post.title}</td></tr>
                            <tr><td>작성일</td><td>{new Date(post.date).toLocaleString('ko-KR')}</td></tr>
                            <tr><td>작성자</td><td>{post.user.id}</td></tr>
                            <tr><td>본문</td><td>{post.text}</td></tr>
                        </tbody>
                    </table>
                    <br></br>
                    <h1 className='postDetail'>댓글 모음</h1>
                    <Comment comments={comments} />



                    <form onSubmit={addComment}>
                        <label>
                            댓글:
                            <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} required />
                        </label>
                        <button className='rpbtn' type="submit">댓글 작성</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default PostDetail;
