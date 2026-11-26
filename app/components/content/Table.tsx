
interface TableProps {
  columns: { key: string; label: string }[];
  rows: Record<string, string>[];
  onRowClick?: (row: Record<string, string>) => void;
}

export default function Table({ columns, rows, onRowClick }: TableProps) {
  return (
    <div className='table-card'>
      <table className='table table-hover'>
        <thead>
          <tr>{columns.map((col) => <th className='bg-2 px-5' key={col.key}>{col.label}</th>)}</tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index} onClick={() => onRowClick?.(row)} className={onRowClick ? 'cursor-pointer' : ''} >
            {columns.map((col) => ( <td className='px-5' key={col.key}>{row[col.key]}</td> ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
