import Header from "../components/header";

export default function Page() {

    const stars: React.CSSProperties = {
        width: '10px',
        height: '10px',
        background: 'transparent',
        animation: 'animStar 50s linear infinite',
        boxShadow: '50px 50px rgba(255, 255, 255, 0.5)'
    };

    return (
        <>
            <div className="h-screen bg-black">
                <div style={stars}>
                    <Header />
                </div>
            </div>
        </>
    )
}