"use client"
import Navbar from "../components/Navbar";



interface HomeLayoutProps {
    children: React.ReactNode;
};

const Home = ({ children }: HomeLayoutProps) => {


    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default Home;
