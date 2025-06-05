'use client'
const FloatingGallery = () => {
    // Placeholder images with different aspect ratios to mimic the reference
    const images = [
        { id: 1, src: '/assets/ac/1.jpg', alt: 'AC 1' },
        { id: 2, src: '/assets/ac/2.jpg', alt: 'AC 2' },
        { id: 3, src: '/assets/ac/3.jpg', alt: 'AC 3' },
        { id: 4, src: '/assets/ac/4.jpg', alt: 'AC 4' },
        { id: 5, src: '/assets/ac/5.jpg', alt: 'AC 5' },
        { id: 6, src: '/assets/ac/6.jpg', alt: 'AC 6' },
        { id: 7, src: '/assets/ac/7.jpg', alt: 'AC 7' },
        { id: 8, src: '/assets/ac/8.jpg', alt: 'AC 8' },
        { id: 9, src: '/assets/ac/9.png', alt: 'AC 9' },
        { id: 10, src: '/assets/ac/10.png', alt: 'AC 10' },
        { id: 11, src: '/assets/ac/11.jpg', alt: 'AC 11' },
        { id: 12, src: '/assets/ac/12.png', alt: 'AC 12' },
    ];

    return (
        <section className="bg-[#0e0e0e] text-white py-20 px-6 md:px-12 lg:px-20 w-full min-h-screen">
            <div className="w-full md:w-[90%] lg:[w-80%] mx-auto flex flex-col lg:flex-row items-center gap-3 sm:gap-12">
                {/* Text Content */}
                <div className="flex-1">
                    <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
                        Try <span className="text-[#f5b841]">Helium</span> for <br /> just ₹8,000
                    </h2>
                    <p className="text-white/70 text-lg mb-8 max-w-md">
                        Experience premium, app-first cooling with inbuilt air purification — all for a special introductory price. No compromises, just innovation.
                    </p>
                    <ul className="text-white/60 sm:mb-10 space-y-3 text-base">
                        <li>✓ Smart app-controlled AC</li>
                        <li>✓ Integrated air purifier</li>
                        <li>✓ Futuristic design & silent cooling</li>
                        <li>✓ Free delivery + installation</li>
                    </ul>
                    <button className="bg-[#f5b841] hover:bg-[#f5b830] hidden lg:block text-black font-semibold py-3 px-6 rounded-2xl text-lg transition-all duration-300">
                        Shop Now →
                    </button>
                </div>
                {/* Floating Image Grid Container */}
                <div className="flex-1 w-full flex justify-center">
                    <div className="rounded-3xl px-4 py-8 w-full ">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8 w-full">
                            {images.map((image, index) => (
                                <div
                                    key={image.id}
                                    className={`group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10 relative ${index % 2 === 0 ? 'animate-float-up' : 'animate-float-down'
                                        }`}
                                    style={{
                                        animationDelay: `${index * 0.2}s`,
                                    }}
                                >
                                    <div className="relative !min-h-12 !min-w-32 overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ring-1 ring-gray-600 hover:ring-gray-500">
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110 scale-110 sm:scale-100 "
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* button for mobile */}
                <button className="bg-[#f5b841] block lg:hidden text-[#1e2a28] font-normal sm:font-semibold py-3 px-6 rounded-4xl text-center text-lg transition-all duration-300">
                    Shop Now
                </button>

                <style jsx>{`
            @keyframes float-up {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-10px);
            }
            }

            @keyframes float-down {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(10px);
            }
            }

            .animate-float-up {
            animation: float-up 4s ease-in-out infinite;
            }

            .animate-float-down {
            animation: float-down 4s ease-in-out infinite;
            }

            /* Responsive adjustments */
            @media (max-width: 640px) {
            .animate-float-up {
                animation: float-up 3s ease-in-out infinite;
            }
            .animate-float-down {
                animation: float-down 3s ease-in-out infinite;
            }
            }
        `}</style>
            </div>
        </section>
    );
};

export default FloatingGallery;