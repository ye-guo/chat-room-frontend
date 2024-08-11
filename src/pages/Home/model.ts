// 全局共享数据示例
import { useState } from 'react';

export default () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [showAuthForms, setShowAuthForms] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<string>('1');

  return {
    isLogin,
    setIsLogin,
    showAuthForms,
    setShowAuthForms,
    activeKey,
    setActiveKey,
  };
};
