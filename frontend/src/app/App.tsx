import Header from "../components/Header";
import Sidenav from "../components/Sidenav"
import Dashboard from "../pages/Dashboard";

function App() {
  return (
    <>
    <Header />
    <Sidenav />
    <main className="main-content">
      <Dashboard />
    </main>
    </>
    
  )
}

export default App
