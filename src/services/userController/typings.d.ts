declare namespace API {
  type UserVO = {
    id: number;
    email: string;
    username: string;
    avatar: string;
    gender: number;
    activeStatus: number;
    lastOnlineTime: Date;
    createTime: Date;
    updateTime: Date;
  };

  type LoginRequest = {
    email?: string;
    password?: string;
  };

  type RegisterRequest = {
    email?: string;
    username?: string;
    password?: string;
    confirmPwd?: string;
  };
}
