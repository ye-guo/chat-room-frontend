import AuthForms from '@/components/AuthForms';
import Chat from '@/components/Chat';
import SessionList from '@/components/SessionList';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import UserList from '@/components/UserList';
import { useModel } from '@umijs/max';
import styles from './index.less';

export default function HomePage() {
  // const { initialState } = useModel('@@initialState');
  const { showAuthForms } = useModel('Home.model');

  const handleContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.preventDefault(); // 禁止默认右键菜单
  };

  return (
    <div className={styles.home}>
      <div className={styles.container} onContextMenu={handleContextMenu}>
        {showAuthForms ? <AuthForms /> : ''}
        <TopBar />
        <Sidebar />
        <SessionList />
        <Chat />
        <UserList />
      </div>
    </div>
  );
}
