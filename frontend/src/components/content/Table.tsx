import './Table.css';

interface TableHead {
  user: string;
  email: string;
}

interface TableBody {
  user: string;
  email: string;
}

interface TableContent {
  head: TableHead[];
  body: TableBody[];
}

interface TableProps {
  content: TableContent;
}

export default function Table({ content }: TableProps) {
  return (
    <table>
      <thead>
        {content.head.map((head, index) => (
          <tr key={index}>
            <th>{head.user}</th>
            <th>{head.email}</th>
          </tr>
        ))}
      </thead>
      <tbody>
        {content.body.map((row, index) => (
          <tr key={index}>
            <td>{row.user}</td>
            <td>{row.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}