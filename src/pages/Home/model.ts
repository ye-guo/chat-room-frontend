// 全局共享数据示例
import { useState } from 'react';

export default () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [showAuthForms, setShowAuthForms] = useState<boolean>(false);

  return {
    isLogin,
    setIsLogin,
    showAuthForms,
    setShowAuthForms,
  };
};

