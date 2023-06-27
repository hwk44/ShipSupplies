import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Comment from '../components/helpdesk/Comment';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [editing, setEditing] = useState(false);  
    const [updatedTitle, setUpdatedTitle] = useState('');  
    const [updatedText, setUpdatedText] = useState('');  

    const navigate = useNavigate();

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchPost = async () => {
            const response = await axios.get(`/api/board/view/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setPost(response.data);
            setUpdatedTitle(response.data.title);
            setUpdatedText(response.data.text);
        };
        fetchPost();
    }, [id]);

    const updateBoard = async () => {
        try {
            const updatedPost = {
                title: updatedTitle,
                text: updatedText,
                user: { id: userId }
            };
            await axios.put(`/api/board/update/${id}`, updatedPost, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setEditing(false);
            const response = await axios.get(`/api/board/view/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setPost(response.data);
        }
        catch (error) {
            console.log(error)
            alert("권한이 없습니다.")
        }
    };

    const deleteBoard = async () => {

        const data = {
            user: { id: userId }
        }
        try {
            await axios.delete(`/api/board/delete/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: data
            });
            navigate('/helpdesk');
        } catch (error) {
            console.log(error);
            alert("권한이 없습니다.")
        }
    };

    return (
        <div className='writingDetail'>
            {post && (
                <div className='border p-6'>
                    {!editing ? (
                        userId === post.user.id && (
                            <div className='space-x-3 w-full border-b-2 flex justify-end'>
                                <button onClick={() => setEditing(true)}
                                    className="bg-transparent hover:bg-gray-100 text-black py-2 px-4 border border-gray-300 rounded mb-3">
                                    수정
                                </button>
                                <button onClick={deleteBoard}
                                    className="bg-transparent hover:bg-red-100 text-red-500 py-2 px-4 border border-gray-300 hover:border-red-400 rounded mb-3">
                                    삭제 
                                </button>
                            </div>
                        ) 
                    ) : (
                        <div className='space-x-3 w-full border-b-2 flex justify-end'>
                            <button onClick={updateBoard}
                                className="bg-transparent hover:bg-blue-100 text-blue-500 py-2 px-4 border border-gray-300 hover:border-blue-400 rounded mb-3">
                                제출
                            </button>
                            <button onClick={() => setEditing(false)}
                                className="bg-transparent hover:bg-gray-100 text-black py-2 px-4 border border-gray-300 rounded mb-3">
                                취소
                            </button>
                        </div>
                    )}

                    <table className="h-96 clear-both" >
                        <tbody>
                            <tr>
                                {/* 제목 */}
                                <td>
                                    {editing ? <input type="text"
                                        className="block w-full h-full border-0 outline-none px-11 py-3 text-2xl"
                                        value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} required /> :
                                        <input type='text'
                                            className="block w-full h-full border-0 outline-none px-11 py-3 text-2xl"
                                            value={post.title}
                                            readOnly />}
                                </td>
                            </tr>
                            <div className="text-sm -mt-8 ml-10 text-gray-500">
                                {/* 작성자 */}
                                <td>{post.user.id}</td>
                                {/* 작성일 */}
                                <td>{new Date(post.date).toLocaleString('ko-KR')}</td>
                            </div>

                            <tr>
                                {/* 본문 */}
                                <td>
                                    {editing ?
                                        <textarea className="w-full h-full outline-none p-11 text-lg"
                                            value={updatedText} onChange={(e) => setUpdatedText(e.target.value)} required /> :
                                        <textarea className="w-full h-full outline-none p-11 text-lg"
                                            value={post.text} readOnly />}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Comment id={id} />
                </div>
            )}
        </div>
    );
};

export default PostDetail;
