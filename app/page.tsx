import SparePartsLookup from "@/components/spare-parts-lookup";
import Image from "next/image";

export default function Home() {
    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="mb-8 flex flex-col justify-center items-center md:justify-between md:flex-row">
                    <div>
                        <Image
                            src={"/daikin-logo.jpg"}
                            alt="daikin-logo"
                            width={200}
                            height={10}
                        />
                    </div>

                    <div className="text-center md:text-right">
                        <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2 text-balance">
                            Daikin Spare Lookup
                        </h1>
                    </div>
                </div>
                <SparePartsLookup />
            </div>
        </main>
    );
}
