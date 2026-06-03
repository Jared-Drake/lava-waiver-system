import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Tabs from "./components/Tabs";
import WaiverForm from "./components/WaiverForm";
import StaffLookup from "./components/StaffLookup";

function App() {
  const [activePage, setActivePage] = useState("waiver");

  return (
    <main className="page">
      <section className="card">
        <Header />
        <Tabs activePage={activePage} setActivePage={setActivePage} />

        {activePage === "waiver" ? <WaiverForm /> : <StaffLookup />}
      </section>
    </main>
  );
}

export default App;