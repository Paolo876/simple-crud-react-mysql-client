import PrivateChatRoom from './PrivateChatRoom/PrivateChatRoom';
import "./ChatMembers.scss";
export default function ChatMembers({members}) {
  return (
    <div className='chat-members'>
        {members.length === 2 && <PrivateChatRoom members={members}/>}
    </div>
  )
}
