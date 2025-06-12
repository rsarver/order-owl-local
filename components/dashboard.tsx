"use client"

import { ShipmentCard } from "@/components/shipment-card"
import { EmptyState } from "@/components/empty-state"

// Mock data based on the PRD schema
const mockShipments = [
  {
    id: "1",
    trackingNumber: "1234567890123",
    carrier: "DHL",
    statusMilestone: "out_for_delivery" as const,
    statusCategory: "delivery" as const,
    statusCode: "delivery_out_for_delivery",
    rawStatus: "Out for delivery",
    deliveryAddress: "Amsterdam, Netherlands",
    estimatedDelivery: new Date("2024-12-13"),
    productName: 'MacBook Pro 14"',
    senderDomain: "apple.com",
    lastUpdated: new Date("2024-12-12T14:30:00"),
  },
  {
    id: "2",
    trackingNumber: "9876543210987",
    carrier: "PostNL",
    statusMilestone: "in_transit" as const,
    statusCategory: "transit" as const,
    statusCode: "transit_handover",
    rawStatus: "In transit",
    deliveryAddress: "Rotterdam, Netherlands",
    estimatedDelivery: new Date("2024-12-14"),
    productName: "Wireless Headphones",
    senderDomain: "coolblue.nl",
    lastUpdated: new Date("2024-12-12T10:15:00"),
  },
  {
    id: "3",
    trackingNumber: "5555666677778",
    carrier: "DHL",
    statusMilestone: "delivered" as const,
    statusCategory: "delivery" as const,
    statusCode: "delivery_delivered",
    rawStatus: "Delivered",
    deliveryAddress: "Utrecht, Netherlands",
    actualDelivery: new Date("2024-12-10"),
    productName: "Running Shoes",
    senderDomain: "nike.com",
    lastUpdated: new Date("2024-12-10T16:45:00"),
  },
  {
    id: "4",
    trackingNumber: "1111222233334",
    carrier: "PostNL",
    statusMilestone: "available_for_pickup" as const,
    statusCategory: "delivery" as const,
    statusCode: "delivery_available_for_pickup",
    rawStatus: "Ready for pickup",
    deliveryAddress: "The Hague, Netherlands",
    pickupLocation: "PostNL Point - Albert Heijn",
    estimatedDelivery: new Date("2024-12-13"),
    productName: "Coffee Machine",
    senderDomain: "bol.com",
    lastUpdated: new Date("2024-12-12T09:20:00"),
  },
  {
    id: "5",
    trackingNumber: "9999888877776",
    carrier: "DHL",
    statusMilestone: "exception" as const,
    statusCategory: "exception" as const,
    statusCode: "exception_delivery_failed",
    rawStatus: "Delivery failed - recipient not available",
    deliveryAddress: "Eindhoven, Netherlands",
    failedDeliveryAttempts: 2,
    estimatedDelivery: new Date("2024-12-13"),
    productName: "Gaming Monitor",
    senderDomain: "amazon.nl",
    lastUpdated: new Date("2024-12-12T11:30:00"),
  },
]

export function Dashboard() {
  // Sort shipments: active first (by status priority), then delivered, then by last updated
  const sortedShipments = [...mockShipments].sort((a, b) => {
    const statusPriority = {
      exception: 0,
      out_for_delivery: 1,
      available_for_pickup: 2,
      failed_attempt: 3,
      in_transit: 4,
      info_received: 5,
      pending: 6,
      delivered: 7,
    }

    const aPriority = statusPriority[a.statusMilestone]
    const bPriority = statusPriority[b.statusMilestone]

    if (aPriority !== bPriority) {
      return aPriority - bPriority
    }

    return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
  })

  if (sortedShipments.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Shipments</h2>
          <p className="text-gray-600">
            {sortedShipments.filter((s) => s.statusMilestone !== "delivered").length} active shipments
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedShipments.map((shipment) => (
          <ShipmentCard key={shipment.id} shipment={shipment} />
        ))}
      </div>
    </div>
  )
}
