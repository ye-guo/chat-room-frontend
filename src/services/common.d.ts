declare namespace API {
  type Result = {
    code: number;
    data: T;
    message: string;
  };

  type MsgInfo = {
    message?: API.Message;
    userVo?: API.UserVo;
  };

  type Message = {
    id: number;
    roomId: number;
    fromUid: number;
    content: string;
    isRead: number;
    createTime: Date;
    updateTime: Date;
    isDeleted: number;
  };

  type CursorResponse = {
    roomId: number;
    pageSize: number;
    cursorId: number;
    records: MsgInfo[];
  };
}
