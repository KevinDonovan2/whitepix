import CreatePublication from '@/features/landingPage/CreatePublication';
import Publication from '@/features/landingPage/Publication';
import NavBar from '@/layout/NavBar';
function HomePage() {
    return (
        <div className="bg-[rgb(39,39,65)]">
            <NavBar />
            <CreatePublication/>
            <Publication />
        </div>
    );
}

export default HomePage;
