import { login, register } from '@/services/userController/UserController';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Button, Form, Input, message, Tabs } from 'antd';
import React from 'react';
import styles from './index.less';

// 定义 LoginForm 组件
const LoginForm: React.FC = () => {
  const { setIsLogin, setShowAuthForms } = useModel('common');

  const onFinish = async (values: API.LoginRequest) => {
    console.log('Login values:', values);
    const result: API.Result = await login(values);
    // 失败
    if (!result.data) {
      message.error(result.message);
      return;
    }
    // 成功
    message.success('登录' + result.message);
    setIsLogin(true);
    setShowAuthForms(false);
  };

  return (
    <Form
      name="login"
      initialValues={{ remember: true }}
      style={{ maxWidth: 360 }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: '邮箱是必填项！',
          },
          {
            pattern:
              /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: '邮箱格式错误！',
          },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="邮箱" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '密码是必填项！',
          },
          {
            min: 8,
            message: '长度不小于8！',
          },
        ]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
      </Form.Item>
      <Form.Item>
        <Button block type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

// 定义 RegisterForm 组件
const RegisterForm: React.FC = () => {
  const { setActiveKey } = useModel('common');

  const onFinish = async (values: API.RegisterRequest) => {
    console.log('Register values:', values);
    const result: API.Result = await register(values);
    // 失败
    if (!result.data) {
      message.error(result.message);
      return;
    }
    // 成功
    message.success('注册' + result.message);
    setActiveKey('1');
  };

  return (
    <Form
      name="register"
      initialValues={{ remember: true }}
      style={{ maxWidth: 360 }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: '邮箱是必填项！',
          },
          {
            pattern:
              /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: '邮箱格式错误！',
          },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="邮箱" />
      </Form.Item>
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名，用户名唯一!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '确认密码是必填项！',
          },
          {
            min: 8,
            message: '长度不小于8！',
          },
        ]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
      </Form.Item>
      <Form.Item
        name="confirmPwd"
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: '请输入确认密码!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次密码不同！'));
            },
          }),
        ]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="确认密码"
        />
      </Form.Item>
      <Form.Item>
        <Button block type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

// AuthForms 组件
const AuthForms: React.FC = () => {
  const { setShowAuthForms, activeKey, setActiveKey } = useModel('common');

  const tabItems = [
    {
      label: '登录',
      key: '1',
      children: <LoginForm />,
    },
    {
      label: '注册',
      key: '2',
      children: <RegisterForm />,
    },
  ];

  return (
    <div className={styles.auth_forms}>
      <div
        className={styles.close_button}
        onClick={() => setShowAuthForms(false)}
      >
        ✖
      </div>
      <Tabs
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
        centered
        items={tabItems}
      />
    </div>
  );
};

export default AuthForms;
