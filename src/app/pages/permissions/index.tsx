/* eslint-disable @typescript-eslint/no-explicit-any */
import TitlePage from 'app/components/TitlePage';
import {  useSwr } from 'app/hooks'
import { API_ROUTE } from 'app/api/api-route';
import { useParams } from 'react-router-dom';

function Permissions() {
    const params: any = useParams()
    const id = params.id
    const { response } = useSwr(true, API_ROUTE.ROLES_ID_PERMISSIONS(id))
    console.log(response)
    return (
        <>
            <TitlePage
                title='Phân quyền'
            />
            <div>
                {JSON.stringify(response)}
            </div>
        </>
    );
}

export default Permissions;