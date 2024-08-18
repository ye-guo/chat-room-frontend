import { getGroupUsers } from '@/services/chatRoomController/ChatRoomController';
import { useModel } from '@umijs/max';
import { useEffect, useState } from 'react';
import UserItem from '../UserItem';
import styles from './index.less';

export default function UserList() {
  const { globalRoom } = useModel('Home.model');
  const [users, setUsers] = useState<API.UserVo[]>();
  const [count, setCount] = useState(0);
  // todo 暂时使用短轮询
  useEffect(() => {
    if (!globalRoom?.id) return;

    const fetchAndSetUsers = async (roomId: number) => {
      try {
        const res = await getGroupUsers(roomId);
        const userList = res.data;

        userList.sort((a: API.UserVo, b: API.UserVo) => {
          if (a.activeStatus !== b.activeStatus) {
            return b.activeStatus - a.activeStatus;
          }
          if (a.lastOnlineTime === null && b.lastOnlineTime === null) return 0;
          if (a.lastOnlineTime === null) return 1;
          if (b.lastOnlineTime === null) return -1;
          return (
            new Date(b.lastOnlineTime).getTime() -
            new Date(a.lastOnlineTime).getTime()
          );
        });

        setCount(
          userList.filter((item: API.UserVo) => item.activeStatus === 1).length,
        );
        setUsers(userList);
      } catch (err) {
        console.log('获取群成员失败', err);
      }
    };
    fetchAndSetUsers(globalRoom.id);

    const intervalId = setInterval(() => {
      fetchAndSetUsers(globalRoom.id);
    }, 5000); // 每5秒钟查询一次

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        在线人数：
        <span>{count}</span>
      </div>
      <div className={styles.user_list}>
        {users?.map((item: API.UserVo) => (
          <UserItem key={item.id} user={item} />
        ))}
      </div>
    </div>
  );
}
