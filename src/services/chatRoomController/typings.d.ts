declare namespace API {
  type GroupRoom = {
    id: number;
    roomId: number;
    name: string;
    isGlobalGroup: number;
    avatar: string;
    createTime: Date;
    updateTime: Date;
    isDeleted: number;
  };

  type SingleRoom = {
    id: number;
    roomId: number;
    uid1: number;
    uid2: number;
    createTime: Date;
    updateTime: Date;
    isDeleted: number;
  };
}
