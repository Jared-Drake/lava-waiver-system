function Tabs({ activePage, setActivePage }) {
  return (
    <div className="tabs">
      <button
        className={activePage === "waiver" ? "tab active-tab" : "tab"}
        onClick={() => setActivePage("waiver")}
      >
        Guest Waiver
      </button>

      <button
        className={activePage === "lookup" ? "tab active-tab" : "tab"}
        onClick={() => setActivePage("lookup")}
      >
        Staff Lookup
      </button>
    </div>
  );
}

export default Tabs;