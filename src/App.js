import "./App.css";
import FilterTodos from "./components/FilterTodos";
import TodosContainer from "./components/TodosContainer";

function App() {
  return (
    <div className="App">
      <FilterTodos />
      <TodosContainer />
    </div>
  );
}

export default App;
