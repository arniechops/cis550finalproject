import {useEffect} from 'react'

function App() {
    useEffect(() => {
      fetch('/login')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
  }, [])
  
  return (
    <div className="text-3xl">
      Flights and Hotels
      
    </div>
  );
}

export default App;
