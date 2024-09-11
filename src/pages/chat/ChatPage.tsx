import { Chat } from '@/components/chat/Chat';
import { userData } from '@/components/chat/data';
import { Sidebar } from '@/components/sidebar';

export default function ChatPage() {
    const selectedUser = userData[0];
    const messages = selectedUser.messages || [];
    const isMobile = false;
    const isCollapsed = false;

    // Mapping user data and ensuring the correct variant type
    const links = userData.map((user) => ({
        name: user.name,
        messages: user.messages || [],
        avatar: user.avatar,
        variant: 'ghost' as const // Explicitly type the variant as one of the allowed values
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
