import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io5";

export const SidebarData = [
    // {
    //     title : 'Home',
    //     path :'/',
    //     icon : <AiIcons.AiOutlineHome />,
    //     cName : 'nav-text' 
    // },
    {
        title : '정보수정',
        path :'/userupdate',
        icon : <AiIcons.AiOutlineInfoCircle />,
        cName : 'nav-text' 
    },
    {
        title : '비밀번호 변경',
        path :'/userpwdupdate',
        icon : <IoIcons.IoKeyOutline />,
        cName : 'nav-text' 
    },
    {
        title : '회원탈퇴',
        path :'/userdelete',
        icon : <AiIcons.AiOutlineCloseCircle />,
        cName : 'nav-text' 
    },
]