import { useState } from "react";
import Header from "../components/Header";
import Sidenav from "../components/Sidenav"
import Dashboard from "../pages/Dashboard";

function App() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Header openSidebar={() => setExpanded(true)} />

      <Sidenav closeSidebar={() => setExpanded(false)} expanded={expanded} />

      <main className="main-content">
        <Dashboard />
      </main>
    </>
  );
}

export default App
