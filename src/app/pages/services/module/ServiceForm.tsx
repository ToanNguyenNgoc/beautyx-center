import {XButton} from 'app/components'
import TitlePage from 'app/components/TitlePage'
import {useNavigate, useParams} from 'react-router-dom'

export default function ServiceForm() {
  const navigate = useNavigate()
  const param = useParams()
  const {id} = param
  console.log(param[0])
  return (
    <div>
      {/* title */}
      <TitlePage
        title={`${id ? 'Chỉnh sửa dịch vụ' : 'Chi tiết dịch vụ'}`}
        element={
          !id ? (
            <XButton
              title='Chỉnh sửa'
              color='primary'
              onClick={() => navigate(`/pages/service-form/${id}`)}
            />
          ) : (
            <></>
          )
        }
      />
      {/* close title */}
    </div>
  )
}
