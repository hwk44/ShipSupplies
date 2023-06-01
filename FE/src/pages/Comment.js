import axios from 'axios';
import { useState } from 'react';

const Comment = ({ comments }) => {
    const [hit, setHit] = useState(comments.hitCount || 0);
    const token = localStorage.getItem('jwt');
    const userId = localStorage.getItem('userId');

    const addHit = async () => {
        const hitObj = {
            user: { id: userId },
            comment: { id: comments.id },
            board: { id: comments.board.id },
        };

        try {
            await axios.post('/api/hit/add', hitObj, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            setHit(hit + 1);
        } catch (error) {
            console.error(error);
        }
    };

    return (
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
                        <td>{comment.text}</td>
                        <td>{new Date(comment.date).toLocaleString()}</td>
                        <td>
                            <button onClick={addHit}>좋아요 {hit}</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Comment;
