import { Routes, Route } from "react-router-dom";
import CreateTodo from "./pages/CreateTodo";
import Home from "./pages/Home";
import UpdateTodo from "./pages/UpdateTodo";
import ShowTodo from "./pages/ShowTodo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateTodo />} />
      <Route path="/update/:id" element={<UpdateTodo />} />
      <Route path="/todo/:id" element={<ShowTodo />} />
    </Routes>
  );
}

export default App;
