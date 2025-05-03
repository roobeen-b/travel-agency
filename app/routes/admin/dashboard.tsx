import { Header } from "components";

const Dashboard = () => {
  const user = { name: "Rubin" };

  return (
    <main className="dashboard wrapper">
      <Header
        title={`Welcome ${user?.name ?? "Guest"} 👋`}
        description="Track your travels and popular destinations in real time"
      />
      Dashboard page contents
    </main>
  );
};

export default Dashboard;
