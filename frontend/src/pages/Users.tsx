import Table from '../components/content/Table.tsx';

const tableContent = {
  head: [{ user: "User", email: "Email Address" }],
  body: [
    { user: "Rafa", email: "example@email.com" },
    { user: "Ana", email: "example@email.com" },
  ],
};

export default function Profile() {
  return (
    <div>
      <h2>Users</h2>
      <Table content={tableContent} />
    </div>
  )
}