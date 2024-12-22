import { AppRouter } from "./providers/router";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <AppRouter />
      </div>
    </div>
  );
};

export default App;
