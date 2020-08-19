/** Order Statuses constants */
const status = {
    DRAFT: 'Draft',
    APPROVED: 'Approved', // Payment received, pending packaging
    READY_TO_SHIP: 'Ready to ship', // Packed
    PENDING_PAYMENT: 'Pending payment',
    SHIPPED: 'Shipped',
    ON_HOLD: 'On hold',
    FAILED: 'Failed', // Error while treating order
    REFUND: 'Refund', // Client was refunded
    CANCELLED: 'Cancelled',
    COMPLETED: 'Completed' // Package received by client
}
export default status;