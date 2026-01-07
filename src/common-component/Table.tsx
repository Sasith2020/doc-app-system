import { useMemo, useState } from 'react'
import type { ChangeEvent, ReactNode } from 'react'

type SortDirection = 'asc' | 'desc'

type ColumnType = 'string' | 'number' | 'date'

type FilterType = 'text' | 'numberRange' | 'dateRange'

type TableColumn<T> = {
  key: string
  header: string
  width?: string
  align?: 'left' | 'center' | 'right'
  render?: (row: T, rowIndex: number) => ReactNode
  accessor?: (row: T, rowIndex: number) => unknown
  dataKey?: keyof T
  type?: ColumnType
  sortable?: boolean
  filter?: FilterType
  searchable?: boolean
}

type TableProps<T> = {
  columns: TableColumn<T>[]
  data: T[]
  pageSizeOptions?: number[]
  defaultPageSize?: number
  showPageSizeSelector?: boolean
  getRowKey?: (row: T, rowIndex: number) => string
  enableSearch?: boolean
  searchPlaceholder?: string
  enableFilters?: boolean
  enableSorting?: boolean
  enableReset?: boolean
  defaultSort?: {
    key: string
    direction: SortDirection
  }
}

function Table<T>({
  columns,
  data,
  pageSizeOptions = [5, 10, 20],
  defaultPageSize = 5,
  showPageSizeSelector = true,
  getRowKey,
  enableSearch = false,
  searchPlaceholder = 'Search all columns',
  enableFilters = false,
  enableSorting = false,
  enableReset = true,
  defaultSort,
}: TableProps<T>) {
  const [pageSize, setPageSize] = useState(defaultPageSize)
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<Record<string, Record<string, string>>>(
    {},
  )
  const [sortState, setSortState] = useState<{
    key: string
    direction: SortDirection
  } | null>(defaultSort ?? null)

  const getColumnValue = (row: T, column: TableColumn<T>, rowIndex: number) => {
    if (column.accessor) {
      return column.accessor(row, rowIndex)
    }
    if (column.dataKey) {
      return row[column.dataKey]
    }
    if (column.key in (row as Record<string, unknown>)) {
      return (row as Record<string, unknown>)[column.key]
    }
    return undefined
  }

  const normalizeText = (value: unknown) => {
    if (value === null || value === undefined) {
      return ''
    }
    if (value instanceof Date) {
      return value.toISOString()
    }
    return String(value)
  }

  const toNumber = (value: unknown) => {
    const parsed = Number(value)
    return Number.isNaN(parsed) ? null : parsed
  }

  const toDateMs = (value: unknown) => {
    if (value instanceof Date) {
      return value.getTime()
    }
    if (typeof value === 'number') {
      return value
    }
    const parsed = Date.parse(String(value))
    return Number.isNaN(parsed) ? null : parsed
  }

  const processedData = useMemo(() => {
    let rows = [...data]

    if (enableSearch && searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase()
      rows = rows.filter((row, rowIndex) =>
        columns.some((column) => {
          if (column.searchable === false) {
            return false
          }
          const value = normalizeText(getColumnValue(row, column, rowIndex))
          return value.toLowerCase().includes(term)
        }),
      )
    }

    if (enableFilters) {
      rows = rows.filter((row, rowIndex) =>
        columns.every((column) => {
          if (!column.filter) {
            return true
          }
          const filterState = filters[column.key]
          if (!filterState) {
            return true
          }
          const rawValue = getColumnValue(row, column, rowIndex)
          if (column.filter === 'text') {
            const target = (filterState.value ?? '').trim()
            if (!target) {
              return true
            }
            return normalizeText(rawValue)
              .toLowerCase()
              .includes(target.toLowerCase())
          }
          if (column.filter === 'numberRange') {
            const minValue = filterState.min ? Number(filterState.min) : null
            const maxValue = filterState.max ? Number(filterState.max) : null
            if (minValue === null && maxValue === null) {
              return true
            }
            const current = toNumber(rawValue)
            if (current === null) {
              return false
            }
            if (minValue !== null && current < minValue) {
              return false
            }
            if (maxValue !== null && current > maxValue) {
              return false
            }
            return true
          }
          if (column.filter === 'dateRange') {
            const startValue = filterState.start
              ? Date.parse(filterState.start)
              : null
            const endValue = filterState.end
              ? Date.parse(filterState.end)
              : null
            if (startValue === null && endValue === null) {
              return true
            }
            const current = toDateMs(rawValue)
            if (current === null) {
              return false
            }
            if (startValue !== null && current < startValue) {
              return false
            }
            if (endValue !== null && current > endValue) {
              return false
            }
            return true
          }
          return true
        }),
      )
    }

    if (enableSorting && sortState) {
      const column = columns.find((item) => item.key === sortState.key)
      if (column) {
        const directionFactor = sortState.direction === 'asc' ? 1 : -1
        rows.sort((left, right) => {
          const leftValue = getColumnValue(left, column, 0)
          const rightValue = getColumnValue(right, column, 0)

          if (leftValue === null || leftValue === undefined) {
            return rightValue === null || rightValue === undefined ? 0 : 1
          }
          if (rightValue === null || rightValue === undefined) {
            return -1
          }

          if (column.type === 'number') {
            const leftNumber = toNumber(leftValue)
            const rightNumber = toNumber(rightValue)
            if (leftNumber === null || rightNumber === null) {
              return (
                normalizeText(leftValue).localeCompare(
                  normalizeText(rightValue),
                  undefined,
                  { sensitivity: 'base' },
                ) * directionFactor
              )
            }
            return (leftNumber - rightNumber) * directionFactor
          }

          if (column.type === 'date') {
            const leftDate = toDateMs(leftValue)
            const rightDate = toDateMs(rightValue)
            if (leftDate === null || rightDate === null) {
              return (
                normalizeText(leftValue).localeCompare(
                  normalizeText(rightValue),
                  undefined,
                  { sensitivity: 'base' },
                ) * directionFactor
              )
            }
            return (leftDate - rightDate) * directionFactor
          }

          return (
            normalizeText(leftValue).localeCompare(
              normalizeText(rightValue),
              undefined,
              { sensitivity: 'base' },
            ) * directionFactor
          )
        })
      }
    }

    return rows
  }, [
    columns,
    data,
    enableFilters,
    enableSearch,
    enableSorting,
    filters,
    searchTerm,
    sortState,
  ])

  const totalPages = Math.max(1, Math.ceil(processedData.length / pageSize))

  const safePage = Math.min(page, totalPages)

  const pageData = useMemo(() => {
    const start = (safePage - 1) * pageSize
    return processedData.slice(start, start + pageSize)
  }, [pageSize, processedData, safePage])

  const handlePageChange = (nextPage: number) => {
    setPage(Math.min(Math.max(nextPage, 1), totalPages))
  }

  const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextSize = Number(event.target.value)
    setPageSize(nextSize)
    setPage(1)
  }

  const handleSortToggle = (column: TableColumn<T>) => {
    if (!enableSorting || !column.sortable) {
      return
    }
    setSortState((current) => {
      if (!current || current.key !== column.key) {
        return { key: column.key, direction: 'asc' }
      }
      if (current.direction === 'asc') {
        return { key: column.key, direction: 'desc' }
      }
      return null
    })
    setPage(1)
  }

  const handleReset = () => {
    setSearchTerm('')
    setFilters({})
    setSortState(defaultSort ?? null)
    setPage(1)
  }

  const isResetEnabled =
    enableReset &&
    (searchTerm.trim() !== '' ||
      Object.values(filters).some((filterState) =>
        Object.values(filterState).some((value) => value),
      ) ||
      sortState !== null)

  const filterableColumns = columns.filter((column) => column.filter)

  return (
    <div className="table-component">
      {(enableSearch || enableFilters || (enableSorting && enableReset)) && (
        <div className="table-controls">
          <div className="table-controls-top">
            {enableSearch && (
              <label className="table-search">
                Search
                <input
                  type="search"
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={(event) => {
                    setSearchTerm(event.target.value)
                    setPage(1)
                  }}
                />
              </label>
            )}
            {enableReset && (
              <button
                type="button"
                className="ghost-btn"
                onClick={handleReset}
                disabled={!isResetEnabled}
              >
                Reset
              </button>
            )}
          </div>
          {enableFilters && filterableColumns.length > 0 && (
            <div className="table-filters">
              {filterableColumns.map((column) => {
                const filterState = filters[column.key] ?? {}
                if (column.filter === 'numberRange') {
                  return (
                    <label className="table-filter-field" key={column.key}>
                      {column.header}
                      <span className="table-filter-inputs">
                        <input
                          type="number"
                          placeholder="Min"
                          value={filterState.min ?? ''}
                          onChange={(event) => {
                            setFilters((previous) => ({
                              ...previous,
                              [column.key]: {
                                ...filterState,
                                min: event.target.value,
                              },
                            }))
                            setPage(1)
                          }}
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          value={filterState.max ?? ''}
                          onChange={(event) => {
                            setFilters((previous) => ({
                              ...previous,
                              [column.key]: {
                                ...filterState,
                                max: event.target.value,
                              },
                            }))
                            setPage(1)
                          }}
                        />
                      </span>
                    </label>
                  )
                }
                if (column.filter === 'dateRange') {
                  return (
                    <label className="table-filter-field" key={column.key}>
                      {column.header}
                      <span className="table-filter-inputs">
                        <input
                          type="date"
                          value={filterState.start ?? ''}
                          onChange={(event) => {
                            setFilters((previous) => ({
                              ...previous,
                              [column.key]: {
                                ...filterState,
                                start: event.target.value,
                              },
                            }))
                            setPage(1)
                          }}
                        />
                        <input
                          type="date"
                          value={filterState.end ?? ''}
                          onChange={(event) => {
                            setFilters((previous) => ({
                              ...previous,
                              [column.key]: {
                                ...filterState,
                                end: event.target.value,
                              },
                            }))
                            setPage(1)
                          }}
                        />
                      </span>
                    </label>
                  )
                }
                return (
                  <label className="table-filter-field" key={column.key}>
                    {column.header}
                    <span className="table-filter-inputs single">
                      <input
                        type="text"
                        placeholder={`Filter ${column.header}`}
                        value={filterState.value ?? ''}
                        onChange={(event) => {
                          setFilters((previous) => ({
                            ...previous,
                            [column.key]: {
                              ...filterState,
                              value: event.target.value,
                            },
                          }))
                          setPage(1)
                        }}
                      />
                    </span>
                  </label>
                )
              })}
            </div>
          )}
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
            {enableSorting && column.sortable ? (
              <button
                type="button"
                className={`table-sort-btn${
                  sortState?.key === column.key ? ' active' : ''
                }`}
                onClick={() => handleSortToggle(column)}
              >
                {column.header}
                <span className="table-sort-indicator">
                  {sortState?.key === column.key
                    ? sortState.direction === 'asc'
                      ? '▲'
                      : '▼'
                    : '↕'}
                </span>
              </button>
            ) : (
              column.header
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
            {processedData.length === 0 ? 0 : (safePage - 1) * pageSize + 1}-
            {Math.min(safePage * pageSize, processedData.length)} of{' '}
            {processedData.length}
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
