import SideBar from './components/SideBar';
import DashBar from './components/DashBar';
import { DrawerProvider } from '../../context/DrawerContext'; // Import DrawerProvider

function Dashboard() {
    return (
        <DrawerProvider>
            <DashBar />
            <div className="flex flex-row bg-gray-100 h-screen">
                <SideBar />
                <div className="ml-[50%] mt-[150px]">
                    hello word 
                </div>
            </div>
        </DrawerProvider> // Closing tag for DrawerProvider
    );
}

export default Dashboard;
