import React from "react"

const AboutContainer = () => {
    return (
        <main className="rounded-lg mt-12 md:mt-24 mb-8 md:px-[16rem] 2xl:px-[25rem] w-screen p-8 text-start flex flex-col gap-12">
            <div className="leading-relaxed text-opacity-70 text-black text-[0.8rem]">
                <h1 className="text-lg font-bold text-start mb-4">About Us:</h1>
                <div>
                    Makroteknik is a company founded in the year 1998, built
                    upon an 18-year-long tradition in application, which
                    produces HVAC components. Our company is equipped with a
                    customer-centered corporate understanding and has its
                    principles arranged according to this.
                    <br />
                    <hr className="border-black border-opacity-20 my-2" />
                    Our company began producing channel flanges and equipment,
                    which are air duct connection elements, at the end of 1998.
                    By adding carrying profiles, clips, and different assembly
                    supplies to the product range, the broadening activities of
                    the product range have become continuous.
                    <br />
                    <hr className="border-black border-opacity-20 my-2" />
                    Our quality, after one year of training and reconstruction,
                    has been ISO 9001 certified in March 2003, and our company
                    has begun its institutionalization process. With time, it
                    has formed its quality parameters and worked to organize its
                    departments accordingly, but without sacrificing its
                    principles and sectoral identity.
                    <br />
                    <hr className="border-black border-opacity-20 my-2" />
                    Our company aims to improve its production type and
                    technique, increase its product diversity, and achieve the
                    most economical costs and customer satisfaction. Some of the
                    realities of our quality policy are that employees, working
                    in all departments and at all levels, are getting their
                    needed training, so the overall efficiency is increased and
                    human resources are used efficiently.
                    <br />
                    <hr className="border-black border-opacity-20 my-2" />
                    Our company started its production activities on a 250 m²
                    area, and in the second half of 2003, it transferred its
                    productions to larger sites. It organizes its management,
                    production, delivery, and shipping activities on a total of
                    approximately 5000 m² of closed areas with its head office
                    and warehouse in Istanbul Anatolian side, and warehouses in
                    Antalya and Izmir. Our company performs its shipping,
                    warehousing, and administrative functions in Istanbul
                    Anatolian side and realizes shipping and delivery on a total
                    of 15000 m² of closed areas with ‘Makro Express’, the
                    numbers of which increase each passing day in Anatolia.
                    <br />
                    <hr className="border-black border-opacity-20 my-2" />
                    From our founding, in every product we begin to produce, in
                    every investment we make, and in every project we start, we
                    draw the needed energy from the satisfaction of our
                    customers.
                </div>
            </div>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.8949248855433!2d-0.07130325069532596!3d51.606546596438946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761fd4262f50d3%3A0xc4e9ed421c7d91d6!2sMakro%20Tech%20Ltd!5e0!3m2!1sen!2str!4v1724669133510!5m2!1sen!2str"
                width=""
                height="450"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <address className="leading-relaxed border-l-4 border-secondary pl-4 text-[0.8rem]">
                <strong>Makro Tech</strong>
                <br />
                Unit 32, Nesta Works, Peacock Industrial Estates,
                <br />
                White Hart Lane, London. N17 8DT / UK
                <br />
                T: 0208 885 3494
                <br />
                F: 0208 808 7008
            </address>
        </main>
    )
}

export default AboutContainer
