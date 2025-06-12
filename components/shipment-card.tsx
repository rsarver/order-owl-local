import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Package, AlertTriangle, Clock } from "lucide-react"
import { format } from "date-fns"

type StatusMilestone =
  | "pending"
  | "info_received"
  | "in_transit"
  | "out_for_delivery"
  | "failed_attempt"
  | "available_for_pickup"
  | "delivered"
  | "exception"

interface Shipment {
  id: string
  trackingNumber: string
  carrier: string
  statusMilestone: StatusMilestone
  statusCategory: string
  statusCode: string
  rawStatus: string
  deliveryAddress: string
  estimatedDelivery?: Date
  actualDelivery?: Date
  failedDeliveryAttempts?: number
  pickupLocation?: string
  productName?: string
  senderDomain: string
  lastUpdated: Date
}

interface ShipmentCardProps {
  shipment: Shipment
}

const statusConfig = {
  pending: {
    label: "Pending",
    color: "bg-gray-100 text-gray-800 border-gray-200",
    icon: Clock,
  },
  info_received: {
    label: "Info Received",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: Package,
  },
  in_transit: {
    label: "In Transit",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: Package,
  },
  out_for_delivery: {
    label: "Out for Delivery",
    color: "bg-orange-100 text-orange-800 border-orange-200",
    icon: Package,
  },
  failed_attempt: {
    label: "Delivery Failed",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: AlertTriangle,
  },
  available_for_pickup: {
    label: "Ready for Pickup",
    color: "bg-purple-100 text-purple-800 border-purple-200",
    icon: MapPin,
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: Package,
  },
  exception: {
    label: "Exception",
    color: "bg-red-100 text-red-800 border-red-200",
    icon: AlertTriangle,
  },
}

export function ShipmentCard({ shipment }: ShipmentCardProps) {
  const config = statusConfig[shipment.statusMilestone]
  const StatusIcon = config.icon
  const isDelivered = shipment.statusMilestone === "delivered"

  return (
    <Card className={`transition-all hover:shadow-md ${isDelivered ? "opacity-75" : ""}`}>
      <CardHeader className="pb-2 pt-3 px-3">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-xs text-gray-900 uppercase tracking-wide">{shipment.carrier}</div>
          <Badge variant="outline" className={`${config.color} flex items-center space-x-1 text-xs px-2 py-0.5`}>
            <StatusIcon className="h-3 w-3" />
            <span className="hidden sm:inline">{config.label}</span>
          </Badge>
        </div>

        {shipment.productName && (
          <div className="font-medium text-sm text-gray-900 truncate leading-tight">{shipment.productName}</div>
        )}
        <div className="font-mono text-xs text-gray-500">#{shipment.trackingNumber}</div>
      </CardHeader>

      <CardContent className="px-3 pb-3 space-y-2">
        <div className="flex items-center space-x-2 text-xs">
          <MapPin className="h-3 w-3 text-gray-400 flex-shrink-0" />
          <span className="text-gray-600 truncate">{shipment.deliveryAddress}</span>
        </div>

        {shipment.pickupLocation && (
          <div className="flex items-center space-x-2 text-xs">
            <Package className="h-3 w-3 text-purple-500 flex-shrink-0" />
            <span className="text-gray-600 truncate">{shipment.pickupLocation}</span>
          </div>
        )}

        {shipment.failedDeliveryAttempts && shipment.failedDeliveryAttempts > 0 && (
          <div className="flex items-center space-x-2 text-xs">
            <AlertTriangle className="h-3 w-3 text-yellow-500 flex-shrink-0" />
            <span className="text-gray-600">
              {shipment.failedDeliveryAttempts} failed attempt{shipment.failedDeliveryAttempts > 1 ? "s" : ""}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-100">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3 text-gray-400" />
            <span className="text-gray-600">
              {shipment.actualDelivery
                ? format(shipment.actualDelivery, "MMM d")
                : shipment.estimatedDelivery
                  ? format(shipment.estimatedDelivery, "MMM d")
                  : "TBD"}
            </span>
          </div>
          <span className="text-gray-500 truncate max-w-[100px]">{shipment.senderDomain}</span>
        </div>
      </CardContent>
    </Card>
  )
}
