import { getMessages } from '@/services/chatRoomController/ChatRoomController';
import { useModel } from '@umijs/max';
import { useEffect, useRef } from 'react';
import Message from '../Message';
import styles from './index.less';

export default function ChatWindow() {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState as {
    currentUser?: API.UserVO;
  };
  const { globalRoom, messages, setMsgInfo, pagination } =
    useModel('common');
  const windowRef = useRef<HTMLDivElement>(null);

  const loadHistoryMessages = async (
    rommId: number,
    currentPage: number,
    pageSize: number,
  ) => {
    // TODO: 加载历史消息
    const result = await getMessages(rommId, currentPage, pageSize);
    console.log(result);
  };

  const handleScroll = () => {
    if (!globalRoom?.id) return;
    if (windowRef.current?.scrollTop === 0) {
      console.log(globalRoom);
      console.log('滑动到顶部，加载下一页历史消息');
      loadHistoryMessages(
        globalRoom?.roomId,
        (pagination?.currentPage ?? 1) + 1,
        20,
      );
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      const latestMessage: API.MsgInfo = messages[messages.length - 1];
      setMsgInfo(latestMessage);

      if (windowRef.current && latestMessage.userVO?.id === currentUser?.id) {
        windowRef.current.scrollTop = windowRef.current.scrollHeight;
      }
    }
  }, [messages.length]);

  useEffect(() => {
    const chatWindow = windowRef.current;
    if (chatWindow) {
      chatWindow.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (chatWindow) {
        chatWindow.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <>
      <div className={styles.header}>{globalRoom?.name}</div>
      <div className={styles.chat_window} ref={windowRef}>
        {messages.map((msg, index) => {
          return <Message key={index} msg={msg} />;
        })}
      </div>
    </>
  );
}
