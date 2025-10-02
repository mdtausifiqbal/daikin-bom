import SparePartsLookup from "@/components/spare-parts-lookup"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Daikin Spare Parts Lookup</h1>
          <p className="text-muted-foreground text-lg">Search for spare parts by model number</p>
        </div>
        <SparePartsLookup />
      </div>
    </main>
  )
}
