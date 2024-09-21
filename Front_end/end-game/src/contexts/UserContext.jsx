import { createContext, useState, useContext } from "react";

// Tạo context
const UserContext = createContext();

// Tạo Provider component
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);

  const login = (id) => {
    setUserId(id);
    console.log("Đã đăng nhập ", id);
  };

  const logout = () => {
    console.log("Đã đăng xuất ");
    setUserId(null);
  };

  return (
    <UserContext.Provider value={{ userId, login, logout, role, setRole }}>
      {children}
    </UserContext.Provider>
  );
};

// Tạo custom hook để dễ dàng sử dụng context
export const useUser = () => {
  return useContext(UserContext);
};
