import { useEffect, useState } from 'react';
import { Data } from '../../main/types';
import SubjectElement from './components/SubjectElement';

function App(): JSX.Element {
  // useState: état, permet de pas reset une variable à chaque fois que qq chose change | recalcule le component en fonction
  // de ce qui a changé. ex: bouton qui incrémente à chaque fois
  // primitive: <Subject[]> utilise une interface pour dire ce que c'est avant
  const [ data, setData ] = useState<Data[]>([]);

  // Actualise à l'ouverture
  useEffect(() => {
    window.electron.ipcRenderer.invoke('dataRequest')
    .then((response) => {
      setData(response);
    })
  }, [])

  return (
    // fragments: grouper les élements entre eux sans faire une autre div
    <>
      {data.map((subject) => 
        <SubjectElement subject={subject}/>,
      )}
    </>
  )
}

export default App
