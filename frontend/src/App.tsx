import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <div>
      <MainLayout />
      <ToastContainer/>
    </div>

  );
}

export default App;
