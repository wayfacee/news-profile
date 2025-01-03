import { Outlet } from "react-router-dom";
import { useInitProfile } from "@/entities/profile";

const App = () => {
  const { isLoading } = useInitProfile();

  if (isLoading) return "Fetching profile...";

  return <Outlet />;
};

export default App;