import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      url: "https://github.com/guiljs",
      title: `Desafio ReactJS ${Date.now()}`,
      techs: ["React", "Node.js"],
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const deleteResponse = await api.delete(`repositories/${id}`);
    if (deleteResponse.status === 204) {
      // const response = await api.get("repositories"); //No test o get repositories está mockado para sempre trazer sempre um id 123!
      // console.log(response.data);
      
      setRepositories(repositories.filter(rep=>rep.id!== id)); //No test o get repositories está mockado para sempre trazer um id 123 então aqui setei para filtrar por diferente de id;
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
