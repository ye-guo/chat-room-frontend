import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Button, Form, Input, Tabs } from 'antd';
import React from 'react';
import styles from './index.less';

// 定义 LoginForm 组件
const LoginForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Login values:', values);
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
        rules={[{ required: true, message: '请输入邮箱!' }]}
      >
        <Input prefix={<MailOutlined />} placeholder="邮箱" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
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
  const onFinish = (values: any) => {
    console.log('Register values:', values);
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
        rules={[{ required: true, message: '请输入邮箱!' }]}
      >
        <Input prefix={<MailOutlined />} type="password" placeholder="邮箱" />
      </Form.Item>
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名，用户名唯一!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码!' }]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
      </Form.Item>
      <Form.Item
        name="confirm"
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
              return Promise.reject(
                new Error('The two passwords that you entered do not match!'),
              );
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
  const { setShowAuthForms } = useModel('Home.model');

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
      <Tabs defaultActiveKey="1" centered items={tabItems} />
    </div>
  );
};

export default AuthForms;
