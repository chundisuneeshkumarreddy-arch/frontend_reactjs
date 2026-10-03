import AppRoutes from './routes';
import LastProjectProvider from './contexts/LastProjectProvider';
import './App.css';
function App() {
  return (
    <LastProjectProvider>
      <AppRoutes />
    </LastProjectProvider>
  );
}

export default App;