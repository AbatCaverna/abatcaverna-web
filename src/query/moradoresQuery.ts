import { useQuery } from 'react-query'

import MoradoresService from 'services/MoradoresService'

function useMoradoresQuery(onSuccess?: any) {
  return useQuery('moradores', MoradoresService.getMoradores, { onSuccess: (data) => onSuccess && onSuccess(data.data.moradores) })
}

export default useMoradoresQuery
