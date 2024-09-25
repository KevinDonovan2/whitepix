import NavBar from "@/layout/NavBar";
import ChatTest from "./ChatTest";

export default function ChatPage() {
    return (
        <div className="flex flex-col primary h-screen">
            <div>
                <NavBar />
            </div>
            <div className="rounded-2xl m-4 ">
                <ChatTest/>
            </div>
        </div>
    );
}
