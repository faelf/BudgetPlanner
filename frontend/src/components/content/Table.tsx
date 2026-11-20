interface TableProps {
  columns: { key: string; label: string }[];
  rows: Record<string, string>[];
}

export default function Table({ columns, rows }: TableProps) {
  return (
    <table className='table table-borderless table-hover'>
      <thead>
        <tr>
          {columns.map((col) => <th key={col.key}>{col.label}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {columns.map((col) => <td key={col.key}>{row[col.key]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}