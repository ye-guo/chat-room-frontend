import Happy from '@/assets/happy.svg';
import Send from '@/assets/send.svg';
import { useWebSocket } from '@/hooks/useWebSocket';
import emojis from '@/utils/emojis';
import { useModel } from '@umijs/max';
import { message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import styles from './index.less';

export default function ChatInput() {
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser as API.UserVo;
  const { isLogin, setShowAuthForms, globalRoom } = useModel('Home.model');
  const inputRef = useRef<HTMLDivElement>(null);
  const [isEmojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const ws = useWebSocket();
  const sendMessage = () => {
    if (!ws || !inputRef.current) {
      message.error('WebSocket 连接失败');
      return;
    }

    // 检查 WebSocket 的 readyState
    if (
      ws.readyState === WebSocket.CLOSING ||
      ws.readyState === WebSocket.CLOSED
    ) {
      message.error('与服务器断开连接，请刷新页面以尝试连接');
      return;
    }

    const msg = inputRef.current.innerText.trim();
    if (msg === '') {
      console.log('消息为空');
      return;
    }

    const msgData = {
      fromUid: currentUser?.id,
      content: msg,
      roomId: globalRoom?.roomId,
    };
    console.log('发送消息', msgData);
    if (ws) {
      try {
        ws.send(JSON.stringify(msgData));
      } catch (error) {
        message.error('WebSocket 发送失败');
      }
    }
    // 清空输入框
    inputRef.current.innerText = '';
  };

  // enter发送 shift+enter 换行
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        // Shift + Enter 换行
        const selection = window.getSelection();
        if (!selection?.rangeCount) return;
        const range = selection.getRangeAt(0);
        range.deleteContents();

        // 插入换行符
        const br = document.createElement('br');
        range.insertNode(br);

        // 移动光标到换行符之后
        range.setStartAfter(br);
        range.setEndAfter(br);
        selection.removeAllRanges();
        selection.addRange(range);

        event.preventDefault(); // 阻止默认行为
      } else {
        // 只有 Enter 发送消息
        event.preventDefault(); // 防止在按下回车时插入新行
        sendMessage();
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setEmojiPickerVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.chat_input_container}>
      {!isLogin ? (
        <div className={styles.lock} onClick={() => setShowAuthForms(true)}>
          🔒 点我
          <span style={{ color: 'blue' }}>登录</span>
          之后发言
        </div>
      ) : null}
      <div className={styles.chat_input}>
        <div
          className={styles.textarea}
          contentEditable="true"
          ref={inputRef}
          onKeyDown={handleKeyDown}
        />
        <div className={styles.send}>
          <div className={styles.emoji_area}>
            <img
              src={Happy}
              alt="emoji"
              className={styles.emoji_button}
              onClick={() => setEmojiPickerVisible(!isEmojiPickerVisible)}
            />
            {isEmojiPickerVisible && (
              <div className={styles.emoji_picker} ref={emojiPickerRef}>
                {emojis.map((emoji, index) => (
                  <span
                    key={index}
                    className={styles.emoji}
                    onClick={() => {
                      if (inputRef.current) {
                        inputRef.current.innerText += emoji;
                        setEmojiPickerVisible(false); // 点击 emoji 后隐藏表情选择器
                        // 重新设置焦点到输入框
                        inputRef.current.focus();
                        // 将光标移动到内容的末尾
                        const range = document.createRange();
                        const selection = window.getSelection();
                        range.selectNodeContents(inputRef.current);
                        range.collapse(false);
                        selection?.removeAllRanges();
                        selection?.addRange(range);
                      }
                    }}
                  >
                    {emoji}
                  </span>
                ))}
              </div>
            )}
          </div>
          {/* <div className={styles.img_area}>
            <input type="file" id={styles.img} />
            <label htmlFor={styles.img}>
              <img src={Img} alt="img" id={styles.img_icon} />
            </label>
          </div>
          <div className={styles.file_area}>
            <input type="file" id={styles.file} />
            <label htmlFor={styles.file}>
              <img src={File} alt="file" id={styles.file_icon} />
            </label>
          </div> */}
          <img
            src={Send}
            alt="send"
            className={styles.send_button}
            onClick={sendMessage}
          />
        </div>
      </div>
    </div>
  );
}
