export const LOAD_NEXT_PAGE = 'load_next_page';
export const PAGE_SIZE = 15;
export const WS =
  process.env.NODE_ENV === 'production'
    ? 'wss://chat.yeguo.icu/api/ws/chat'
    : 'ws://localhost:8080/api/ws/chat';
