import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Comment = ({ id }) => {

    // 현재 작성하는 댓글의 내용과 기존 댓글들을 관리하기 위한 상태 설정
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [editingComment, setEditingComment] = useState(null); // 수정 중인 댓글 상태 관리


    // 로컬 스토리지에서 사용자 ID와 토큰 정보를 가져옴
    const userId = localStorage.getItem('userId');

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

    // 댓글 수정 함수
    const updateComment = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/comment/update/${editingComment.id}`, {
                text: comment,
                date: new Date(),
                user: { id: userId },
                board: { id: id },
   
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // 댓글 수정 후 상태 초기화
            setComment("");
            setEditingComment(null);
            await fetchComments();
        } catch (error) {
            console.error(error);
            alert("권한이 없습니다.")
        }
    };

    const startEditing = (targetComment) => {
        setEditingComment(targetComment);
        setComment(targetComment.text);
    };

    // 댓글 삭제
    const deleteComment = async (targetComment) => {
        //axios.delete 메서드를 사용할 때는 두 번째 매개변수에 데이터 객체를 직접 전달할 수 없음
        // 데이터를 삭제 요청과 함께 보내려면 config 객체의 data 속성을 사용해야 함. 
        //data 속성에 전달하려는 데이터를 넣어주면 됨. 이러한 구조는 axios.delete의 특징임

        // 요청에 필요한 정보 설정
        const commentObj = {
            text: targetComment.text,
            user: { id: userId },
            board: { id: id }
        };

        try {
            // 댓글 삭제 요청을 서버에 전송
            await axios.delete(`/api/comment/delete/${targetComment.id}`, {
                data: commentObj,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            // 댓글들을 다시 가져옴
            await fetchComments();
        }
        catch (error) {
            console.log(error)
            alert("권한이 없습니다.")
        }
    }

    return (
        <>
            <table style={{ width: '100%', marginBottom: '20px' }}>
                <thead>
                    <tr>
                        <th>작성자</th>
                        <th>댓글</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map((comment, index) => (
                        <tr key={index}>
                            <td>{comment.user ? comment.user.id : 'Unknown'}</td>
                            <td>
                                {comment.text}
                            </td>
                            <td>{new Date(comment.date).toLocaleString()}</td>
                            <td>
                                <button onClick={() => addHit(comment)}>좋아요 {comment.hitCount}</button>
                            </td>
                            <td>
                                <button onClick={() => startEditing(comment)}>수정</button>
                                &nbsp;&nbsp;&nbsp;<button onClick={() => deleteComment(comment)}>삭제</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
            <form onSubmit={editingComment ? updateComment : addComment}>
                <label>
                    댓글:
                    <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} required />
                </label>
                <button className='rpbtn' type="submit">{editingComment ? "수정 완료" : "댓글 작성"}</button>
            </form>
        </>
    );
};

export default Comment;

