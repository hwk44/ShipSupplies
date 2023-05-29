import React from "react";
import { NavLink, Link } from "react-router-dom";


function Sidebar() {
  const menus = [
      { name: "정보수정", path: "/userupdate" },
      { name: "비밀번호 변경", path: "/userpwdupdate" },
      { name: "회원탈퇴", path: "/userdelete" },
  ];
  return (
    <div className="side">
      <div className="menu">
        <h2>MyPage</h2>
        {menus.map((menu, index) => {
          return (
            <div>
                <Link className="link"
                to={menu.path}
                key={index}
                >
                {menu.name}
                </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;