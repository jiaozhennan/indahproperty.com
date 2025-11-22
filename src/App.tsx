import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import { AuthContext } from '@/contexts/authContext';
import NewsDetail from "@/pages/NewsDetail";
import Projects from "@/pages/Projects";
import Type8 from "@/pages/Type8";
import Type6 from "@/pages/Type6";
import Type5 from "@/pages/Type5";
import NewsList from "@/pages/NewsList";

// 优化性能：使用React.memo包装App组件，避免不必要的重渲染
const App = React.memo(() => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 认证相关方法
  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
       <Routes>
         {/* 主页面路由 */}
         <Route path="/" element={<Home />} />
         
         {/* 新闻相关路由 */}
         <Route path="/news" element={<NewsList />} />
         <Route path="/news/:id" element={<NewsDetail />} />
         
         {/* 房产项目相关路由 */}
         <Route path="/projects" element={<Projects />} />
         <Route path="/type8" element={<Type8 />} />
         <Route path="/type6" element={<Type6 />} />
         <Route path="/type5" element={<Type5 />} />
         
         {/* 其他页面路由 */}
         <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
         
         {/* 404重定向 */}
         <Route path="*" element={<Navigate to="/" replace />} />
       </Routes>
    </AuthContext.Provider>
  );
});

export default App;
