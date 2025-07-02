import TitlePage from "app/components/TitlePage";
import { FC, Fragment } from "react";

const ChatPage: FC = () => {
  return (
    <Fragment>
      <TitlePage title="Chat" />
      <div className="card p-4">
        OK
      </div>
    </Fragment>
  )
}

export default ChatPage