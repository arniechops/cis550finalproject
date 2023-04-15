import {useEffect} from 'react'
import Login from './pages/Login';

function App() {
    useEffect(() => {
      fetch('/login')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
  }, [])
  
  return (
    <Login/>
  );
}

export default App;
