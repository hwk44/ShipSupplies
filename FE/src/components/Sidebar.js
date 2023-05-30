import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";


const Sidebar = () => {

  const pathName = useLocation().pathname;

  const menus = [
      { name: "정보수정", path: "/userupdate" },
      { name: "비밀번호 변경", path: "/userpwdupdate" },
      { name: "회원탈퇴", path: "/userdelete" },
  ];
  return (
    <div className="sidebar">
        <h2>마이페이지</h2>
        {menus.map((menu, index) => {
          return (
            <div>
                <Link to={menu.path} key={index}>
                  <SidebarItem 
                    menu={menu} 
                    isActive={pathName === menu.path ? true : false} // 현재 URL pathname과 객체에 담긴 path값 일치 여부 확인
                    />
                </Link>
            </div>
          );
        })}
    </div>
  );
}

export default Sidebar;