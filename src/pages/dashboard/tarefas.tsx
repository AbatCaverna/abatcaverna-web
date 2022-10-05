import { useEffect, useState } from "react";

import { DashboardLayout } from "components/Dashboard/SharedComponents";
import { TarefasService } from "services";
import { Tarefas } from "services/TarefasService";

export default function TarefasPage() {
  const service = new TarefasService()
  const [data, setData] = useState<Tarefas[]>()

  useEffect(() => {
    async function getAll() {
      const response = await service.getTarefas()
      setData(response.data)
    }

    getAll()
  }, [])

  return (
    <DashboardLayout>
      <h1>Tarefas</h1>
      {data && (
        <ul>
        {data.map(task => (
          <li key={task.name}>{task.name} - {task.task}</li> 
        ))}
        </ul>
      )}
    </DashboardLayout>
  )
}