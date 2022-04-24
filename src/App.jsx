// Component
import Header from './components/Header';
import ScheduleCards from './components/ScheduleCards';
import ScheduleLog from './components/ScheduleLog';
import { AppContextProvider } from './store/AppContext';
// Styles
import './assets/styles/App.css';

function App() {
  return (
    <div className="flex flex-col px-4 m-auto md:h-screen sm:px-8 max-w-7xl">
      <Header />
      {/* Provide context only to main to avoid to re-render entire App */}
      <AppContextProvider>
        <main className="flex flex-col overflow-auto md:overflow-hidden md:flex-row">
          <ScheduleCards />
          <ScheduleLog />
        </main>
      </AppContextProvider>
    </div>
  );
}

export default App;
