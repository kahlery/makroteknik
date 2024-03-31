import FirstBanner from "../components/content/FirstBanner";
import InNavigation from "../components/content/InNavigation";

const AboutPage = () => {
    const aboutItemsList = [
        {
            categoryName: "About Us",
            items: ["Our Story", "Our Team", "Our Mission", "Our Vision"]
        },
        {
            categoryName: "Contact Us",
            items: ["Email", "Phone", "Address", "Social Media"]
        },
        {
            categoryName: "Legal",
            items: ["Privacy Policy", "Terms of Service", "Refund Policy", "Cookie Policy"]
        }
    ];

    return (
        <div className="bg-white">
            <InNavigation itemsList={aboutItemsList} isSearchActive={false} />
            <div className="container h-screen mx-auto">
            </div>
        </div>
    );
};

export default AboutPage;