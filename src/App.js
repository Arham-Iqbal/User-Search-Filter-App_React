import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);  
  const [searchQuery, setSearchQuery] = useState("");  

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=50")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.results); 
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredUsers = users.filter((user) =>
    `${user.name.first} ${user.name.last}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>User List</h1>


      <input
        type="text"
        placeholder="Search users by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}  
      />

      <ul>
        {filteredUsers.map((user) => (
          <li>
            {user.name.first} {user.name.last} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
