import { PermissionLayout } from "components";
import TitlePage from "components/TitlePage";
import { Link } from "react-router-dom";

function PushNotification() {
  return (
    <PermissionLayout permissions={['v1.beautyx.notification.sendNotification']} showEmpty>
      <TitlePage
        element={
          // METHOD?.includes("POST") &&
          <Link
            to={{ pathname: "/pages/push-notifications-form" }}
            className="btn btn-sm btn-primary"
          >
            Tạo mới thông báo
          </Link>
        }
        title="Danh sách thông báo"
      />
    </PermissionLayout>
  );
}

export default PushNotification;