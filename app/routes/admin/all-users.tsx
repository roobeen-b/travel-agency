import { Header } from "components";

const AllUsers = () => {
  const user = { name: "Rubin" };

  return (
    <main className="dashboard wrapper">
      <Header
        title={`Trips Page`}
        description="Checkout our current users in real time"
      />
      All user page contents
    </main>
  );
};

export default AllUsers;
