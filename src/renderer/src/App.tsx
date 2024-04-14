import { useEffect, useState } from 'react';

// Définis un object qui n'existe pas encore
interface Subject {
  title: string,
  periods: any,
  hours: string
}

function App(): JSX.Element {
  // useState: état, permet de pas reset une variable à chaque fois que qq chose change | recalcule le component en fonction
  // de ce qui a changé. ex: bouton qui incrémente à chaque fois
  // primitive: <Subject[]> utilise une interface pour dire ce que c'est avant
  const [ data, setData ] = useState<Subject[]>([]);

  // Actualise à l'ouverture
  useEffect(() => {
    window.electron.ipcRenderer.invoke('datarequest')
    .then((response) => {
      setData(response);
    })
  }, [])

  return (
    // fragments: grouper les élements entre eux sans faire une autre div
    <>
      {data.map((subject) => 
        <>
        <div>{subject.title}</div>
        <div>{subject.periods}</div>
        </>
      )}
    </>
  )
}

export default App
