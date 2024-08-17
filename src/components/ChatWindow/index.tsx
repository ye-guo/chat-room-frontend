import { PAGE_SIZE } from '@/constants';
import { getMessages } from '@/services/chatRoomController/ChatRoomController';
import { useModel } from '@umijs/max';
import { message, Spin } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import Message from '../Message';
import styles from './index.less';

export default function ChatWindow() {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState as {
    currentUser?: API.UserVo;
  };
  const windowRef = useRef<HTMLDivElement>(null);
  const { globalRoom, setMsgInfo, messageStore, setMessageStore } =
    useModel('Home.model');
  const [loading, setLoading] = useState(false); // 添加加载状态
  const [isAtBottom, setIsAtBottom] = useState(true); // 是否在底部状态，用来处理对方消息的自动滚动
  const roomId = globalRoom?.id as number;
  const {
    messages = [],
    historyMessages = [],
    cursorId,
  } = messageStore[roomId] || {};

  const loadHistoryMessages = async (
    roomId: number,
    pageSize: number,
    cursorId: number,
  ) => {
    // 防止重复请求
    if (loading) return; // 如果正在加载，则不执行新的请求
    setLoading(true); // 请求开始时设置加载状态为 true

    const previousScrollHeight = windowRef.current?.scrollHeight || 0;
    // 加载历史消息
    try {
      const result = await getMessages(roomId, pageSize, cursorId);
      const records = result.data.records;
      const data = result.data;
      if (!records) {
        console.log('没有更多消息了');
        message.info('没有更多消息了');
        return;
      }

      console.log('响应信息：', data);

      const hMReverse: API.MsgInfo[] = records.reverse();

      setMessageStore((prevStore) => {
        const lastRoomData = prevStore[data.roomId] || {
          messages: [],
          historyMessages: [],
          cursorId: 0,
        };

        return {
          ...prevStore,
          [data.roomId]: {
            ...lastRoomData,
            cursorId: data.cursorId,
            // 更新历史消息
            historyMessages: [...hMReverse, ...lastRoomData.historyMessages],
            messages: [...lastRoomData.messages],
          },
        };
      });

      // 调整滚动位置
      setTimeout(() => {
        if (windowRef.current) {
          windowRef.current.scrollTop =
            windowRef.current.scrollHeight - previousScrollHeight;
        }
      }, 10);
    } catch (error) {
      message.error('加载历史消息时出错');
      console.log('加载历史消息时出错:', error);
    } finally {
      setLoading(false); // 请求完成后设置加载状态为 false
    }
  };

  // 监听窗口大小变化，滚动到底部
  useEffect(() => {
    const scrollToBottom = () => {
      if (windowRef.current) {
        windowRef.current.scrollTop = windowRef.current.scrollHeight;
      }
    };

    const observer = new ResizeObserver(scrollToBottom);
    if (windowRef.current) {
      observer.observe(windowRef.current);
    }
    // 防止火狐等浏览器不兼容
    setTimeout(scrollToBottom, 100);

    return () => {
      if (windowRef.current) {
        observer.unobserve(windowRef.current);
      }
    };
  }, []);

  // 判断消息是否为当前用户发送
  useEffect(() => {
    if (messages || historyMessages) {
      const latestMessage: API.MsgInfo =
        messages[messages.length - 1] ||
        historyMessages[historyMessages.length - 1];
      setMsgInfo(latestMessage);

      // 非自己消息 若在底部则滚动到底部，否则不滚动
      if (
        messages &&
        windowRef.current &&
        latestMessage?.userVo?.id !== currentUser?.id &&
        isAtBottom
      ) {
        windowRef.current.scrollTop = windowRef.current.scrollHeight;
      }

      if (
        messages &&
        windowRef.current &&
        latestMessage?.userVo?.id === currentUser?.id
      ) {
        windowRef.current.scrollTop = windowRef.current.scrollHeight;
      }
    }
  }, [messages, historyMessages]);

  // 顶部加载历史信息
  const handleScroll = useCallback(() => {
    // 滚动条在底部setIsAtBottom(true)
    if (windowRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = windowRef.current;
      const isBottom = scrollHeight - scrollTop - clientHeight < 5; // 允许5像素的误差范围
      setIsAtBottom(isBottom);
    }
    // 滚动条滑倒顶部加载历史消息
    if (windowRef.current?.scrollTop === 0) {
      console.log('滑到顶部，游标是：' + cursorId);

      loadHistoryMessages(roomId, PAGE_SIZE, cursorId!);
    }
  }, [loadHistoryMessages]);

  // 监听滚动事件，加载历史数据
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
  }, [handleScroll]);

  return (
    <>
      <div className={styles.header}>{globalRoom?.name}</div>
      <div className={styles.chat_window} ref={windowRef}>
        {loading && <Spin />}
        {historyMessages.map((msg: API.MsgInfo, index: number) => {
          return <Message key={index} msg={msg} />;
        })}{' '}
        {messages.map((msg: API.MsgInfo, index: number) => {
          return <Message key={index} msg={msg} />;
        })}
      </div>
    </>
  );
}
