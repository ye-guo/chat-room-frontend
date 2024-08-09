import File from '@/assets/file.svg';
import Happy from '@/assets/happy.svg';
import Img from '@/assets/img.svg';
import Send from '@/assets/send.svg';
import { useModel } from '@umijs/max';
import styles from './index.less';

export default function ChatInput() {
  const { isLogin, setShowAuthForms } = useModel('Home.model');

  const emojis = ['😊', '😂', '😍', '😢', '😎', '😡', '😱', '🥳', '🤔', '🤗'];

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
        <div className={styles.textarea} contentEditable="true" />
        <div className={styles.send}>
          <div className={styles.emoji_area}>
            <img src={Happy} alt="emoji" className={styles.emoji_button} />
            <div className={styles.emoji_picker}>
              {emojis.map((emoji, index) => (
                <span key={index} className={styles.emoji}>
                  {emoji}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.img_area}>
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
          </div>
          <img src={Send} alt="send" className={styles.send_button} />
        </div>
      </div>
    </div>
  );
}
