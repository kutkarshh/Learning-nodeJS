import { gql, useQuery } from '@apollo/client';
import './App.css';

const query = gql`
  query GetTodosWithUser{
    getTodos {
        id
        title
        completed
        user {
        name
        email
      }
    }
}`;

function App() {

  const { data, loading } = useQuery(query);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="App">
      <table border="1" cellSpacing="0" cellPadding="5" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Completed</th>
            <th>User</th>
            <th>User Email</th>
          </tr>
        </thead>
        <tbody>
          {data && data?.getTodos?.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.completed ? 'Yes' : 'No'}</td>
              <td>{todo.user.name}</td>
              <td>{todo.user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App;
