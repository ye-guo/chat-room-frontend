import AuthForms from '@/components/AuthForms';
import Chat from '@/components/Chat';
import SessionList from '@/components/SessionList';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import { useModel } from '@umijs/max';
import styles from './index.less';

export default function HomePage() {
  // const [showAuthForms, setShowAuthForms] = useState<boolean>(false);
  const { showAuthForms } = useModel('Home.model');

  return (
    <div className={styles.home}>
      <div className={styles.container}>
        {showAuthForms ? (
          <AuthForms />
        ) : (
          ''
        )}
        <TopBar />
        <Sidebar />
        <SessionList />
        <Chat />
      </div>
    </div>
  );
}
