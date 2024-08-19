import { PAGE_SIZE } from '@/constants';
import { getMessages } from '@/services/chatRoomController/ChatRoomController';
import { getCurrentUser } from '@/services/userController/UserController';
import isCursorData from '@/utils/isCursorData';
import { UploadOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Button, message, Upload, UploadFile } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import { useEffect, useState } from 'react';
import styles from './index.less';
const uploadAddress =
  process.env.NODE_ENV === 'production'
    ? 'https://api.chat.yeguo.icu/api/user/upload'
    : '/api/user/upload';

export default () => {
  const { setShowInfoCard, globalRoom, setMessageStore } =
    useModel('Home.model');
  const { initialState, setInitialState } = useModel('@@initialState');
  const [flag, setFlag] = useState(false);
  const currentUser = initialState?.currentUser;
  const roomId = globalRoom?.id as number;

  const handleBeforeUpload = (file: File) => {
    const isValid = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isValid) {
      message.error('你只能上传 JPG/PNG 文件!');
    }
    return isValid;
  };

  const handleHistoryMsg = (cursorData: API.CursorResponse) => {
    let historicalMessages: API.MsgInfo[] = [];
    if (isCursorData(cursorData)) {
      // 历史聊天消息
      historicalMessages = cursorData.records.map((record: API.MsgInfo) => ({
        message: record.message,
        userVo: record.userVo,
      }));

      // 历史消息倒序
      const hMReverse: API.MsgInfo[] = historicalMessages.reverse();

      setMessageStore((prevStore) => {
        const lastRoomData = prevStore[cursorData?.roomId] || {
          messages: [],
          historyMessages: [],
          cursorId: 0,
        };

        return {
          ...prevStore,
          [cursorData?.roomId]: {
            ...lastRoomData,
            // 设置游标
            cursorId: cursorData?.cursorId,
            // 更新历史消息
            historyMessages: [...hMReverse],
            messages: [...lastRoomData?.messages],
          },
        };
      });

      return;
    }
  };

  const handleUploadChange = async (info: UploadChangeParam<UploadFile>) => {
    console.log('info信息:', info);

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

        // 重新获取消息，更新头像
        const msg = await getMessages(roomId, PAGE_SIZE, undefined);
        const cursorData: API.CursorResponse = msg.data;
        handleHistoryMsg(cursorData);
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
          action={uploadAddress}
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
