"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface SparePart {
  objectId: string
  spareId: string
  spareName: string
  materialId: string
  spareMaterialId: string
  quantity: number
  unitCode: {
    name: string
    code: string
  }
  alternatePart: boolean
  priority: string | null
}

interface SparePartsTableProps {
  parts: SparePart[]
}

export default function SparePartsTable({ parts }: SparePartsTableProps) {
  if (parts.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">No spare parts found matching your search criteria</div>
    )
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-semibold text-foreground">Spare ID</TableHead>
              <TableHead className="font-semibold text-foreground">Spare Name</TableHead>
              <TableHead className="font-semibold text-foreground text-right">Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parts.map((part) => (
              <TableRow key={part.objectId} className="hover:bg-muted/30">
                <TableCell className="font-mono text-sm text-foreground">{part.spareId}</TableCell>
                <TableCell className="text-foreground">{part.spareName}</TableCell>
                <TableCell className="text-right text-foreground">{part.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
