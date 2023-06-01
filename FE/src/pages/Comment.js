import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Comment = ({ id }) => {

    // 현재 작성하는 댓글의 내용과 기존 댓글들을 관리하기 위한 상태 설정
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    // 로컬 스토리지에서 사용자 ID와 토큰 정보를 가져옴
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('jwt');

     // 좋아요를 추가하는 함수
    const addHit = async (targetComment) => {
        // 요청에 필요한 정보 설정
        const hitObj = {
            user: { id: localStorage.getItem('userId') },
            comment: { id: targetComment.id },
            board: { id: id },
        };
    
        try {
            // 좋아요 추가 요청을 서버에 전송
            await axios.post('/api/hit/add', hitObj, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            // 해당 댓글의 좋아요 수를 1 증가시키고, 그 결과를 상태에 반영
            setComments(comments.map(comment =>
                comment.id === targetComment.id ? { ...comment, hitCount: comment.hitCount + 1 } : comment
            ));
        } catch (error) {
            console.error(error);
        }
    };
    

    // 댓글들을 가져오는 함수
    const fetchComments = async () => {
        // 댓글들을 가져오는 요청을 서버에 전송
        const response = await axios.get(`/api/comment/get/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        // 응답으로 받은 댓글들을 상태에 반영
        setComments(response.data);
    };

    // 컴포넌트가 마운트될 때 댓글들을 가져오는 함수를 실행
    useEffect(() => {
        fetchComments();
    }, []);

    // 댓글을 추가하는 함수
    const addComment = async (e) => {
        // 새로고침 방지
        e.preventDefault();
        try {
            // 댓글 추가 요청을 서버에 전송
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
            // 현재 작성하는 댓글의 내용을 초기화하고, 
            setComment("");
            // 댓글들을 다시 가져옴
            await fetchComments();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <table style={{ width: '100%', marginBottom: '20px' }}>
                <thead>
                    <tr>
                        <th>작성자</th>
                        <th>댓글</th>
                        <th>작성일</th>
                        <th>
                            <button className='cmtUpdateBtn'>수정</button>
                            <button className='cmtDeleteBtn'>삭제</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map((comment, index) => (
                        <tr key={index}>
                            <td>{comment.user ? comment.user.id : 'Unknown'}</td>
                            <td>{comment.text}</td>
                            <td>{new Date(comment.date).toLocaleString()}</td>
                            <td>
                                <button onClick={() => addHit(comment)}>좋아요 {comment.hitCount}</button>
                                
                            </td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
            <form onSubmit={addComment}>
                <label>
                    댓글:
                    <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} required />
                </label>
                <button className='rpbtn' type="submit">댓글 작성</button>
            </form>
        </>
    );
};

export default Comment;

