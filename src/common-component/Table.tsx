import { useEffect, useMemo, useState } from 'react'
import type { ChangeEvent, ReactNode } from 'react'

type TableColumn<T> = {
  key: string
  header: string
  width?: string
  align?: 'left' | 'center' | 'right'
  render?: (row: T, rowIndex: number) => ReactNode
  searchable?: boolean
  getSearchValue?: (row: T) => string
}

type TableProps<T> = {
  columns: TableColumn<T>[]
  data: T[]
  pageSizeOptions?: number[]
  defaultPageSize?: number
  showPageSizeSelector?: boolean
  getRowKey?: (row: T, rowIndex: number) => string
  enableGlobalSearch?: boolean
  enableColumnSearch?: boolean
  globalSearchPlaceholder?: string
  columnSearchPlaceholder?: string
}

function Table<T>({
  columns,
  data,
  pageSizeOptions = [5, 10, 20],
  defaultPageSize = 5,
  showPageSizeSelector = true,
  getRowKey,
  enableGlobalSearch = true,
  enableColumnSearch = true,
  globalSearchPlaceholder = 'Search all columns...',
  columnSearchPlaceholder = 'Search',
}: TableProps<T>) {
  const [pageSize, setPageSize] = useState(defaultPageSize)
  const [page, setPage] = useState(1)
  const [globalQuery, setGlobalQuery] = useState('')
  const [columnQueries, setColumnQueries] = useState<Record<string, string>>({})
  const [openColumnSearches, setOpenColumnSearches] = useState<
    Record<string, boolean>
  >({})

  const searchableColumns = useMemo(
    () => columns.filter((column) => column.searchable !== false),
    [columns],
  )

  const getColumnSearchValue = (row: T, column: TableColumn<T>) => {
    if (column.getSearchValue) {
      return column.getSearchValue(row)
    }
    const rowRecord = row as Record<string, unknown>
    const value = rowRecord[column.key]
    if (value === null || value === undefined) {
      return ''
    }
    return String(value)
  }

  const filteredData = useMemo(() => {
    const normalizedGlobal = globalQuery.trim().toLowerCase()
    const normalizedColumnQueries = Object.fromEntries(
      Object.entries(columnQueries)
        .map(([key, value]) => [key, value.trim().toLowerCase()])
        .filter(([, value]) => value.length > 0),
    )

    return data.filter((row) => {
      if (normalizedGlobal) {
        const matchesGlobal = searchableColumns.some((column) =>
          getColumnSearchValue(row, column)
            .toLowerCase()
            .includes(normalizedGlobal),
        )
        if (!matchesGlobal) {
          return false
        }
      }

      for (const [columnKey, query] of Object.entries(
        normalizedColumnQueries,
      )) {
        const column = columns.find((entry) => entry.key === columnKey)
        if (!column) {
          continue
        }
        const value = getColumnSearchValue(row, column)
        if (!value.toLowerCase().includes(query)) {
          return false
        }
      }

      return true
    })
  }, [columns, columnQueries, data, globalQuery, searchableColumns])

  useEffect(() => {
    setPage(1)
  }, [globalQuery, columnQueries, pageSize])

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize))

  const safePage = Math.min(page, totalPages)

  const pageData = useMemo(() => {
    const start = (safePage - 1) * pageSize
    return filteredData.slice(start, start + pageSize)
  }, [filteredData, pageSize, safePage])

  const handlePageChange = (nextPage: number) => {
    setPage(Math.min(Math.max(nextPage, 1), totalPages))
  }

  const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextSize = Number(event.target.value)
    setPageSize(nextSize)
    setPage(1)
  }

  const handleColumnQueryChange = (columnKey: string, value: string) => {
    setColumnQueries((prev) => ({
      ...prev,
      [columnKey]: value,
    }))
    setOpenColumnSearches((prev) => ({
      ...prev,
      [columnKey]: true,
    }))
  }

  const toggleColumnSearch = (columnKey: string) => {
    setOpenColumnSearches((prev) => ({
      ...prev,
      [columnKey]: !prev[columnKey],
    }))
  }

  return (
    <div className="table-component">
      {enableGlobalSearch && (
        <div className="table-toolbar">
          <div className="table-search">
            <span className="table-search-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M11 19a8 8 0 1 1 5.293-14.04A8 8 0 0 1 11 19Zm0-14a6 6 0 1 0 4.06 10.414A6 6 0 0 0 11 5Zm9.707 14.293-4.11-4.11 1.414-1.415 4.11 4.11-1.414 1.415Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <input
              type="search"
              value={globalQuery}
              onChange={(event) => setGlobalQuery(event.target.value)}
              placeholder={globalSearchPlaceholder}
              aria-label="Search table"
            />
          </div>
        </div>
      )}
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
            <div className="table-column-header-content">
              <span>{column.header}</span>
              {enableColumnSearch && column.searchable !== false && (
                <button
                  type="button"
                  className="table-icon-btn"
                  onClick={() => toggleColumnSearch(column.key)}
                  aria-label={`Search ${column.header}`}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M11 19a8 8 0 1 1 5.293-14.04A8 8 0 0 1 11 19Zm0-14a6 6 0 1 0 4.06 10.414A6 6 0 0 0 11 5Zm9.707 14.293-4.11-4.11 1.414-1.415 4.11 4.11-1.414 1.415Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              )}
            </div>
            {enableColumnSearch &&
              column.searchable !== false &&
              (openColumnSearches[column.key] ||
                columnQueries[column.key]) && (
                <div className="table-column-search">
                  <input
                    type="search"
                    value={columnQueries[column.key] ?? ''}
                    onChange={(event) =>
                      handleColumnQueryChange(column.key, event.target.value)
                    }
                    placeholder={columnSearchPlaceholder}
                    aria-label={`Search ${column.header} column`}
                  />
                </div>
              )}
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
            Showing{' '}
            {filteredData.length === 0 ? 0 : (safePage - 1) * pageSize + 1}-
            {Math.min(safePage * pageSize, filteredData.length)} of{' '}
            {filteredData.length}
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
