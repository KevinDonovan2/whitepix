import { Chat } from '@/components/chat';
import { userData } from '@/components/chat/data';
import { Sidebar } from '@/components/sidebar';

export default function ChatPage() {
    const selectedUser = userData[0];
    const messages = selectedUser.messages;
    const isMobile = false;
    const isCollapsed = false;

    // Example links data, replace with actual data
    const links = userData.map((user) => ({
        name: user.name,
        messages: user.messages,
        avatar: user.avatar,
        variant: 'ghost' // or 'grey' based on your requirement
    }));

    return (
        <div className="flex flex-row">
            <Sidebar
                links={links}
                isCollapsed={isCollapsed}
                isMobile={isMobile}
            />
            <Chat
                messages={messages}
                selectedUser={selectedUser}
                isMobile={isMobile}
            />
        </div>
    );
}
