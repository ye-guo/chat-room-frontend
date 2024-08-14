
export default function isPaginationData(data: API.PaginationData): boolean {
  return (
    typeof data === 'object' &&
    data !== null &&
    'totalPages' in data &&
    'currentPage' in data &&
    'totalRecords' in data &&
    'size' in data &&
    'records' in data
  )
}