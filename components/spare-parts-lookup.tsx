"use client";

import type React from "react";

import SparePartsTable from "@/components/spare-parts-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertCircle, Loader2, Search } from "lucide-react";
import { useMemo, useState } from "react";

interface SparePart {
    objectId: string;
    spareId: string;
    spareName: string;
    materialId: string;
    spareMaterialId: string;
    quantity: number;
    unitCode: {
        name: string;
        code: string;
    };
    alternatePart: boolean;
    priority: string | null;
}

export default function SparePartsLookup() {
    const [modelNumber, setModelNumber] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [spareParts, setSpareParts] = useState<SparePart[]>([]);
    const partsList = useMemo(
        () => [
            ...new Map(
                spareParts.map((item) => [item.spareMaterialId, item])
            ).values(),
        ],
        [spareParts]
    );

    const filteredParts = useMemo(
        () =>
            partsList.filter((part) => {
                const query = searchQuery.toLowerCase();
                return (
                    part.spareId.toLowerCase().includes(query) ||
                    part.spareName.toLowerCase().includes(query)
                );
            }),
        [partsList, searchQuery]
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSpareParts = async () => {
        if (!modelNumber.trim()) {
            setError("Please enter a model number");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `/api/spares/${encodeURIComponent(modelNumber.trim())}`
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to fetch spare parts. Please check the model number."
                );
            }

            const data = await response.json();

            if (Array.isArray(data)) {
                setSpareParts(data);
                if (data.length === 0) {
                    setError("No spare parts found for this model number");
                }
            } else {
                throw new Error("Unexpected response format");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            setSpareParts([]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            fetchSpareParts();
        }
    };

    return (
        <div className="space-y-6">
            {/* Model Number Input Section */}
            <Card className="p-6 bg-card border-border">
                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="model-number"
                            className="block text-sm font-medium text-foreground mb-2"
                        >
                            Model Number
                        </label>
                        <div className="flex gap-3">
                            <Input
                                id="model-number"
                                type="text"
                                placeholder="e.g., RKL50UV16VAF"
                                value={modelNumber}
                                onChange={(e) => setModelNumber(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="flex-1 bg-background border-input text-foreground placeholder:text-muted-foreground"
                                disabled={loading}
                            />
                            <Button
                                onClick={fetchSpareParts}
                                disabled={loading || !modelNumber.trim()}
                                className="bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Loading
                                    </>
                                ) : (
                                    <>
                                        <Search className="mr-2 h-4 w-4" />
                                        Search
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 text-destructive text-sm">
                            <AlertCircle className="h-4 w-4" />
                            <span>{error}</span>
                        </div>
                    )}
                </div>
            </Card>

            {/* Search and Results Section */}
            {spareParts.length > 0 && (
                <Card className="p-6 bg-card border-border">
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="search-parts"
                                className="block text-sm font-medium text-foreground mb-2"
                            >
                                Search Spare Parts
                            </label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="search-parts"
                                    type="text"
                                    placeholder="Search by Spare ID or Spare Name..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="pl-10 bg-background border-input text-foreground placeholder:text-muted-foreground"
                                />
                            </div>
                        </div>

                        <div className="text-sm text-muted-foreground">
                            Showing {filteredParts.length} of {partsList.length}{" "}
                            spare parts
                        </div>

                        <SparePartsTable parts={filteredParts} />
                    </div>
                </Card>
            )}
        </div>
    );
}
