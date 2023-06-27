import axios from 'axios';
import { useEffect, useState } from 'react';

const Comment = ({ id }) => {

    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [editingComment, setEditingComment] = useState(null); 

    const userId = localStorage.getItem('userId');
    const addHit = async (targetComment) => {
        const hitObj = {
            user: { id: localStorage.getItem('userId') },
            comment: { id: targetComment.id },
            board: { id: id },
        };

        try {
            await axios.post('/api/hit/add', hitObj, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setComments(comments.map(comment =>
                comment.id === targetComment.id ? { ...comment, hitCount: comment.hitCount + 1 } : comment
            ));
        } catch (error) {
            console.error(error);
            alert("좋아요는 한 번만 가능합니다.")
        }
    };

    const fetchComments = async () => {
        const response = await axios.get(`/api/comment/get/${id}`, {
            headers: {
                'Content-Type': 'application/json',
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
                user: { id: userId }, 
                board: { id: id }
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            // console.log(response.data);
            setComment("");
            await fetchComments();
        } catch (error) {
            console.log(error);
        }
    };

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

    const deleteComment = async (targetComment) => {
        const commentObj = {
            text: targetComment.text,
            user: { id: userId },
            board: { id: id }
        };

        try {
            await axios.delete(`/api/comment/delete/${targetComment.id}`, {
                data: commentObj,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            await fetchComments();
        }
        catch (error) {
            console.log(error)
            alert("권한이 없습니다.")
        }
    }

    return (
        <div className="bg-gray-100 p-8 flex flex-col justify-items-center items-left rounded-lg">
            <tbody>
                {comments.map((comment, index) => (
                    <div key={index} className="mt-10 border-b-2 border-gray-200">
                        {/* <td> */}
                        <div className="-mt-8 flex flex-row space-x-3 mb-3.5">
                            {/* 작성자 */}
                            <div className="text-black text-base">{comment.user ? comment.user.id : 'Unknown'}</div>
                            {/* 작성일 */}
                            <div className="text-gray-500 text-sm">{new Date(comment.date).toLocaleString()}</div>
                        </div>
                        {/* </td> */}
                        {/* 댓글 */}
                        {/* <td className="ml-24 text-black text-base"> */}
                        <div className="mb-2.5">
                            {comment.text}
                        </div>
                        {/* </td> */}


                        <div className="space-x-3 flex flex-row mb-3">
                            <button onClick={() => addHit(comment)}
                                className="bg-transparent hover:bg-gray-200 text-black py-2 px-4 border border-gray-300 rounded">
                                👍 {comment.hitCount}
                            </button>
                            
                            {userId === comment.user.id &&(
                                <>
                            <button onClick={() => startEditing(comment)}
                                className="bg-transparent hover:bg-gray-200 text-black py-2 px-4 border border-gray-300 rounded">
                                수정
                            </button>
                            <button onClick={() => deleteComment(comment)}
                                className="bg-transparent hover:bg-red-100 text-red-500 py-2 px-4 border border-gray-300 hover:border-red-400 rounded">
                                삭제
                            </button>
                                </>

                            )}
                        </div>
                    </div>
                ))}
            </tbody>
            <form onSubmit={editingComment ? updateComment : addComment}>

                <div className="bg-white border w-full mt-5 flex flex-col rounded-lg">
                    <label className="flex-grow">
                        {/* 댓글작성 */}
                        <textarea
                            className="w-full h-full outline-none p-11 text-lg rounded-lg"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />
                    </label>

                    <button className="mt-3 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded self-end mb-1 mr-1">
                        {editingComment ? "수정" : "등록"}
                    </button>
                </div>


            </form>
        </div>
    );
};

export default Comment;

