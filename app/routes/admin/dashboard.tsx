import { Header, StatsCard, TripCard } from "components";

const Dashboard = () => {
  const user = { name: "Rubin" };
  const dashboardStats = {
    totalTrips: 3210,
    totalUsers: 12450,
    usersJoined: { currentMonth: 218, lastMonth: 176 },
    tripsCreated: { currentMonth: 150, lastMonth: 250 },
    userRole: { total: 62, currentMonth: 25, lastMonth: 15 },
  };

  const { totalTrips, totalUsers, usersJoined, tripsCreated, userRole } =
    dashboardStats;

  return (
    <main className="dashboard wrapper">
      <Header
        title={`Welcome ${user?.name ?? "Guest"} 👋`}
        description="Track your travels and popular destinations in real time"
      />

      <section className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-col-3 gap-6 w-full">
          <StatsCard
            headerTitle="Total Users"
            total={totalUsers}
            currentMonthCount={usersJoined?.currentMonth}
            lastMonthCount={usersJoined?.lastMonth}
          />
          <StatsCard
            headerTitle="Total Trips"
            total={totalTrips}
            currentMonthCount={tripsCreated?.currentMonth}
            lastMonthCount={tripsCreated?.lastMonth}
          />
          <StatsCard
            headerTitle="Active Users"
            total={userRole?.total}
            currentMonthCount={userRole?.currentMonth}
            lastMonthCount={userRole?.lastMonth}
          />
        </div>
      </section>
      <TripCard />
    </main>
  );
};

export default Dashboard;
