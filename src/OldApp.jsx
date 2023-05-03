import { useState } from "react";


export default function App() {

  const [randomName, setRandomName] = useState(getARandomName());
  const [counter, setCounter] = useState(1);

  function getARandomName() {
    let names = ['Fido', 'Garfield', 'Lassie', 'Rudolph'];
    return names[Math.floor(Math.random() * names.length)];
  }
  return <>
  <h1>Hello {randomName}!</h1><button onClick={ ()=> setRandomName(getARandomName()) }>Get a new name</button>
  <h1>Hello {counter}</h1><button onClick={() => setCounter(counter + 1)}>Count</button>
  </>;
}

// <> </> is called fragment