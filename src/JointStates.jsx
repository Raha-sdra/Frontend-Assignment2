
import { useState } from "react";


export default function App() {

  const [state, setState] = useState({
    randomName: getARandomName(),
    counter: 1
  });

  const set = (key, value) => setState({...state, [key]: value});

  function getARandomName() {
    let names = ['Fido', 'Garfield', 'Lassie', 'Rudolph'];
    return names[Math.floor(Math.random() * names.length)];
  }
  return <>
          <h1>Hello {state.randomName}!</h1><button onClick={ () => set('randomName', getARandomName()) }>Get a new name</button>
          <h1>Hello {state.counter}</h1><button onClick={ () => set('counter', state.counter + 1)}>Count</button>
    </>;
}

// <> </> is called fragment