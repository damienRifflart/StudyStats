import { useEffect, useState } from 'react';
import { Data } from '../../main/types';
import SubjectElement from './components/SubjectElement';

function App(): JSX.Element {
  // useState: état, permet de pas reset une variable à chaque fois que qq chose change | recalcule le component en fonction
  // de ce qui a changé. ex: bouton qui incrémente à chaque fois
  // primitive: <Subject[]> utilise une interface pour dire ce que c'est avant
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<Data[]>([]);
  const [totalHours, setTotalHours] = useState<string>();
  const [totalDays, setTotalDays] = useState<number>();

  // Actualise à l'ouverture
  useEffect(() => {
    window.electron.ipcRenderer.invoke('dataRequest')
      .then((response) => {
        setLoading(false);
        setData(response.data);
        setTotalHours(response.totalHours);
        setTotalDays(response.totalDays)
      })
  }, []);

  return (
    // fragments: grouper les élements entre eux sans faire une autre div
    <div>
      {loading ? (
        <p className='text-3xl flex justify-center items-center h-screen w-screen'>
          <span className="text-animation">⏳ Chargement ...</span>
        </p>
      ) : (
        <>
          {data.map((subject) => 
            <SubjectElement subject={subject}/>,
          )}
          <p className='text-lg ml-3 mt-3'> <strong>TEMPS TOTAL</strong>: <span className='text-indigo-400'>{totalHours}</span> donc <span className='text-indigo-400'>{totalDays}</span> jours!</p>
        </>
      )}
    </div>
  )
}

export default App
