declare namespace API {
  type Result = {
    code: number;
    data: T;
    message: string;
  };

  type MsgInfo = {
    message?: API.Message;
    userVO?: API.UserVO;
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
  }

  type PaginationData = {
    totalPages: number;
    currentPage: number;
    totalRecords: number;
    size: number;
    records: MsgInfo[];
  };

  type Pagination = {
    totalPages?: number;
    currentPage: number;
    totalRecords?: number;
    size: number;
  }
}
