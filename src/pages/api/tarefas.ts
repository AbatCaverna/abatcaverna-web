import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === 'GET') {
    const session = await getSession({ req })

    if (!session) res.status(403).send("User not authenticated")
  
    if ((session as any)?.role !== "cavernoso") res.status(403).send("User not allowed")

    const response = await axios.get('https://sheets.googleapis.com/v4/spreadsheets/1eniERI_dsWKZRbEDgz-ag3QeybOZ-QAQPePGamoWy6o/values/Tarefas!A16:B22?key=AIzaSyBB-jM92j_bQ0llcA3nUv6nlPdtIQLTlKI')
    
    const tarefas: Array<{ name: string, task: string }> = response.data.values.map((val: string[]) => {
      const data = {
        name: val[0],
        task: val[1]
      }

      return data
    })
    return res.status(200).send(tarefas)
  }
}