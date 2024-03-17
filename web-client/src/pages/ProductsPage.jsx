import InNavigation from "../components/content/InNavigation";
import ListingGrid from "../components/content/ListingGrid";

const ProductsPage = () => {
    const imageUrl = "/patterns/44.png";

    const itemsList = [
        {
            categoryName: "FANS",
            items: [
                "Plate Mounted Axial Flow Fan",
                "Low Pressure Cased Axial Fans",
                "Slimline Centrifugal Circular Duct Fans",
                "Contrfoil High-Pressure Axial Fans",
                "Low Energy Circular Duct Fans",
                "Acoustic Extract Box Fans",
                "Acoustic Cabinet Fans",
                "Centrifugal Inline Fans",
                "High-Temperature Centrifugal Box Fans",
                "Acoustic L Flow High-Temperature Fan Box",
                "Acoustic Short Case Side Discharge Fan Box",
                "Acoustic Axial Flow Fan Box",
                "Axial Fans"
            ]
        },
        {
            categoryName: "SPIRAL DUCTING & FITTINGS",
            items: [
                "Bird Beaks",
                "Male Couplers",
                "Female Couplers",
                "Spiral Tube Duct 3m Lengths",
                "90 Degree Bend",
                "45 Degree Bend",
                "Reducer",
                "Pressed Saddle",
                "Flange Spigots",
                "Weather Cowls",
                "Curved Boots",
                "Y Bends",
                "Flat Shoe",
                "Equal Tee Pieces",
                "Dampers - Single Blade",
                "Non-Return Dampers",
                "Mesh End Cap",
                "End Cap"
            ]
        },
        {
            categoryName: "FIXINGS & SUPPORT",
            items: [
                "Rivets Square Head - Self Tapping Screws",
                "Wood Screws",
                "Suspension Ring",
                "Split Ring",
                "Base Plate Anchor",
                "Channel Nuts",
                "Wedge Nut",
                "Plate Washers",
                "Slotted Channels",
                "Cantilever Arms",
                "Clamps",
                "Washers, Bolts & Nuts",
                "Channel End Caps",
                "3M Rods",
                "Cutting Discs",
                "KSE - Anti Vibration Mounts"
            ]
        },
        {
            categoryName: "FLEXIBLE DUCTING",
            items: [
                "Insulated Flexible Ducting",
                "Non-Insulated Flexible Ducting",
                "Combi Flexible Ducting"
            ]
        },
        {
            categoryName: "FILTERS & FILTER BOXES",
            items: [
                "Baffle Filters",
                "Filter Boxes",
                "Pleated Filters"
            ]
        },
        {
            categoryName: "DAMPERS & ACCESS DOORS",
            items: [
                "Square Access Doors",
                "Curved Access Doors",
                "Fire Dampers"
            ]
        },
        {
            categoryName: "GRILLS & LOUVRES",
            items: [
                "Supply Valves",
                "Extract Valves",
                "Round Ceiling Diffusers",
                "Egg Crate Grilles",
                "Square Louvres Diffusers",
                "Circular Weather Louvres",
                "Volume Control Grills"
            ]
        },
        {
            categoryName: "FLASHINGS",
            items: [
                "Rubber Roof Flashing - Black"
            ]
        },
        {
            categoryName: "TAPES, SEALANTS, SPRAYS",
            items: [
                "Doby Gaskets",
                "Bostic Sealant",
                "Aluminium Foil Tapes",
                "Makro Teknik Sealant",
                "Ode Starflex Glasswool"
            ]
        },
        {
            categoryName: "SILENCERS",
            items: [
                "Silencers - 100MM - 710MM"
            ]
        },
        {
            categoryName: "FLANGES",
            items: [
                "Flanges - UK Standard & European Standard"
            ]
        },
    ];

    const productsList = [
        {
            title: "Plate Mounted Axial Flow Fan",
            imageUrl: "/images/fans/plate_mounted_axial_flow_fan.jpg",
            code: "Product code: HXBR/T Series",
            description: "Plate mounted axial flow fans manufactured from high-grade galvanized steel and provided with a Sickle blade impeller, low sound level, protected against corrosion..."
        },
        {
            title: "Low Pressure Cased Axial Fans",
            imageUrl: "/images/fans/low_pressure_cased_axial_fans.jpg",
            code: "Product code: TCBB/T Series",
            description: "Range of cylindrical cased axial flow fans fitted with aluminum impellers and manufactured from high-grade rolled galvanized steel and protected against corrosion..."
        },
        {
            title: "Low Pressure Cased Axial Fans",
            imageUrl: "/images/fans/low_pressure_cased_axial_fans.jpg",
            code: "Product code: TCBB/T Series",
            description: "Range of cylindrical cased axial flow fans fitted with aluminum impellers and manufactured from high-grade rolled galvanized steel and protected against corrosion..."
        },
        {
            title: "Low Pressure Cased Axial Fans",
            imageUrl: "/images/fans/low_pressure_cased_axial_fans.jpg",
            code: "Product code: TCBB/T Series",
            description: "Range of cylindrical cased axial flow fans fitted with aluminum impellers and manufactured from high-grade rolled galvanized steel and protected against corrosion..."
        },
        {
            title: "Low Pressure Cased Axial Fans",
            imageUrl: "/images/fans/low_pressure_cased_axial_fans.jpg",
            code: "Product code: TCBB/T Series",
            description: "Range of cylindrical cased axial flow fans fitted with aluminum impellers and manufactured from high-grade rolled galvanized steel and protected against corrosion..."
        },
    ];


    return (
        <div className="bg-primary"
            style={{
                // backgroundImage: `url(${imageUrl})`,
                // backgroundSize: '7px',
                // backgroundPosition: 'center',
                // backgroundRepeat: 'repeat',
            }} >
            <InNavigation itemsList={itemsList} isSearchActive={true} />
            <div className="w-screen mt-4 pl-[22rem] xl:pr-44 py-[122px]">
                <div className="mx-4">
                    <ListingGrid productsList={productsList} />
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;