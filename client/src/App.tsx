import { ToastContainer } from "react-toastify";
import { AppRoutes } from "./routes/AppRoutes";
import { AuthContextProvider } from "./shared/contexts/AuthContext";
import 'react-toastify/ReactToastify.min.css'

function App() {

  return (
    <div>
      <main>
        <AuthContextProvider>
          <AppRoutes />;
        </AuthContextProvider>
      </main>
      <ToastContainer />
    </div>
  )
}

export default App
