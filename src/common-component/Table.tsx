import { useMemo, useState } from 'react'
import type { ChangeEvent, ReactNode } from 'react'

type TableColumn<T> = {
  key: string
  header: string
  width?: string
  align?: 'left' | 'center' | 'right'
  render?: (row: T, rowIndex: number) => ReactNode
}

type TableProps<T> = {
  columns: TableColumn<T>[]
  data: T[]
  pageSizeOptions?: number[]
  defaultPageSize?: number
  showPageSizeSelector?: boolean
  getRowKey?: (row: T, rowIndex: number) => string
}

function Table<T>({
  columns,
  data,
  pageSizeOptions = [5, 10, 20],
  defaultPageSize = 5,
  showPageSizeSelector = true,
  getRowKey,
}: TableProps<T>) {
  const [pageSize, setPageSize] = useState(defaultPageSize)
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize))

  const safePage = Math.min(page, totalPages)

  const pageData = useMemo(() => {
    const start = (safePage - 1) * pageSize
    return data.slice(start, start + pageSize)
  }, [data, pageSize, safePage])

  const handlePageChange = (nextPage: number) => {
    setPage(Math.min(Math.max(nextPage, 1), totalPages))
  }

  const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextSize = Number(event.target.value)
    setPageSize(nextSize)
    setPage(1)
  }

  return (
    <div className="table-component">
      <div className="table-grid table-column-header">
        {columns.map((column) => (
          <div
            key={column.key}
            className="table-cell"
            style={{
              width: column.width,
              textAlign: column.align ?? 'left',
            }}
          >
            {column.header}
          </div>
        ))}
      </div>

      <div className="table-body">
        {pageData.map((row, rowIndex) => (
          <div
            className="table-grid table-row"
            key={getRowKey?.(row, rowIndex) ?? `${rowIndex}-${safePage}`}
          >
            {columns.map((column) => (
              <div
                key={column.key}
                className="table-cell"
                style={{
                  width: column.width,
                  textAlign: column.align ?? 'left',
                }}
              >
                {column.render ? column.render(row, rowIndex) : null}
              </div>
            ))}
          </div>
        ))}
        {pageData.length === 0 && (
          <div className="table-empty">No records to display.</div>
        )}
      </div>

      <div className="table-footer">
        <div className="table-footer-left">
          <span>
            Showing {(safePage - 1) * pageSize + 1}-
            {Math.min(safePage * pageSize, data.length)} of {data.length}
          </span>
          {showPageSizeSelector && (
            <label className="table-page-size">
              Records
              <select value={pageSize} onChange={handlePageSizeChange}>
                {pageSizeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option} / page
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
        <div className="table-pagination">
          <button
            type="button"
            className="ghost-btn"
            onClick={() => handlePageChange(safePage - 1)}
            disabled={safePage === 1}
          >
            Prev
          </button>
          <span>
            Page {safePage} of {totalPages}
          </span>
          <button
            type="button"
            className="ghost-btn"
            onClick={() => handlePageChange(safePage + 1)}
            disabled={safePage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Table
