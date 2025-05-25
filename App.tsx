import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';
import MaintenanceLog from './components/MaintenanceLog';
import './global.css';


export default function App() {
  return (
    <>
      <MaintenanceLog />
      <ScreenContent title="Home" path="App.tsx"></ScreenContent>
      <StatusBar style="auto" />
    </>
  );
}