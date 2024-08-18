import { getCurrentUser } from '@/services/userController/UserController';
import { UploadOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Button, message, Upload, UploadFile } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import { useEffect, useState } from 'react';
import styles from './index.less';

export default () => {
  const { setShowInfoCard } = useModel('Home.model');
  const { initialState, setInitialState } = useModel('@@initialState');
  const [flag, setFlag] = useState(false);
  const currentUser = initialState?.currentUser;

  const handleBeforeUpload = (file: File) => {
    const isValid = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isValid) {
      message.error('你只能上传 JPG/PNG 文件!');
    }
    return isValid;
  };

  const handleUploadChange = async (info: UploadChangeParam<UploadFile>) => {
    console.log('info信息，', info);

    if (info.file.status === 'done') {
      // 文件上传成功
      const response = info.file.response;
      if (response && response.code === 20000 && response.data) {
        message.success('头像修改成功!');
        // 这里可以更新用户头像的显示，假设响应数据中包含新的头像URL
        console.log('新的头像URL:', response.data.avatar);
        // 头像更新成功后重新获取用户信息并更新全局状态
        setInitialState((s) => ({
          ...s,
          currentUser: undefined,
        }));
        setFlag(!flag);
        setShowInfoCard(false);
      }
    } else if (info.file.status === 'error') {
      // 文件上传失败
      message.error('头像上传失败，请检查网络或稍后再试！');
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const result = await getCurrentUser();
        return result.data;
      } catch (error) {
        history.push('/');
        message.error('网络繁忙，请稍后重试');
        return undefined;
      }
    };

    // 用户登录，重新获取用户信息
    fetchUserInfo().then((currentUser) => {
      setInitialState((s) => ({
        ...s,
        currentUser: { ...currentUser },
      }));
    });
  }, [flag]);

  return (
    <div className={styles.card}>
      <div
        className={styles.close}
        onClick={() => {
          setShowInfoCard(false);
        }}
      >
        ×
      </div>
      <div className={styles.content}>
        <div className={styles.info}>
          <img
            src={`${currentUser?.avatar}`}
            alt=""
            className={styles.avatar}
          />
          <div className={styles.name}>{currentUser?.username}</div>
        </div>
        <Upload
          action={`/api/user/upload`}
          beforeUpload={handleBeforeUpload}
          onChange={handleUploadChange}
          name="image"
          listType="picture"
          maxCount={1}
        >
          <Button shape="round" icon={<UploadOutlined />}>
            上传头像
          </Button>
        </Upload>
      </div>
    </div>
  );
};
