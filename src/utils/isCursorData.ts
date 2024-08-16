export default function isCursorData(data: API.CursorResponse): boolean {
  return (
    typeof data === 'object' &&
    data !== null &&
    'pageSize' in data &&
    'cursorId' in data &&
    'records' in data
  );
}
