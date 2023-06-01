import axios from 'axios';
import React, { useState } from 'react';

const Comment = ({ comments: initialComments }) => {
    const [comments, setComments] = useState(initialComments);
    const token = localStorage.getItem('jwt');

    const addHit = async (commentId) => {
        const commentIndex = comments.findIndex((c) => c.id === commentId);
        const comment = comments[commentIndex];

        const hitObj = {
            user: { id: localStorage.getItem('userId') },
            comment: { id: comment.id },
            board: { id: comment.board.id },
        };

        try {
            await axios.post('/api/hit/add', hitObj, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            // Copy the comments array and update the comment with new hitCount.
            const updatedComments = [...comments];
            updatedComments[commentIndex] = {
                ...comment,
                hitCount: comment.hitCount + 1,
            };

            setComments(updatedComments);
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
                            <button onClick={() => addHit(comment.id)}>좋아요 {comment.hitCount}</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Comment;

