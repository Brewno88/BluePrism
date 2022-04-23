// Component
import Header from './components/Header';
import ScheduleCards from './components/ScheduleCards';
import ScheduleLog from './components/ScheduleLog';
import { AppContextProvider } from './store/AppContext';
// Styles
import './assets/styles/App.css';

function App() {
  return (
    <div className="px-4 sm:px-8">
      <Header />
      {/* Provide context only to main to avoid to re-render entire App */}
      <AppContextProvider>
        <main className="flex">
          <ScheduleCards />
          <ScheduleLog />
        </main>
      </AppContextProvider>
    </div>
  );
}

export default App;
