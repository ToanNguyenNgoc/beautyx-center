import tipAPI from 'app/api/tipApi'
import FormTip from 'app/pages/tips/module/form'
import { QR_KEY } from 'common'
import TitlePage from 'components/TitlePage'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
export default function TipsForm() {
  const params: any = useParams()
  let isForm = 'ADD'
  if (params && params.id) {
    isForm = 'EDIT'
  }
  const {data} = useQuery({
    queryKey: [QR_KEY.TIP_PAGE, params.id],
    queryFn: () => tipAPI.getById(parseInt(params.id)),
  })
  const tip = data?.context
  return (
    <>
      <TitlePage title={params?.id ? 'Chỉnh sửa thông tin Tip' : 'Tạo mới Tip'} />
      {(isForm === 'ADD' || tip) &&
        <FormTip tipId={parseInt(params.id)}  tip={tip} isForm={isForm} />
      }
    </>
  )
}