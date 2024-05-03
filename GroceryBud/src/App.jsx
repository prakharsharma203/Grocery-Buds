import { GroceryCard } from "./components/grocery"
import { Toaster } from "react-hot-toast";
function App() {


  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
     <GroceryCard/> 
    </>
  )
}

export default App
