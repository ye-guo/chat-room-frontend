import ChatInput from '../ChatInput';
import ChatWindow from '../ChatWindow';
import styles from './index.less';

export default function Chat() {
  return (
    <div className={styles.chat}>
      <ChatWindow />
      <ChatInput />
    </div>
  );
}
