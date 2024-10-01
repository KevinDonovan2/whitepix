import { Card } from '@/components/ui/card';
import NavBar from '@/layout/NavBar';
import Friend from './Friend';
import SideBarFriend from './SideBarFriend';

export default function FriendPage() {
    return (
        <div className="flex flex-col primary h-screen">
            <div>
                <NavBar />
            </div>
            <div className="rounded-2xl m-4">
                <Card className="w-full flex flex-row gap-4 h-[80vh] overflow-hidden">
                    <SideBarFriend />
                    <div className="w-full h-full overflow-auto bg-gray-300">
                        <Friend />
                    </div>
                </Card>
            </div>
        </div>
    );
}
