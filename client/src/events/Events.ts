import supplierTypeRequest from '../types/SupplierTypeRequest.ts'

export interface OnDeletedEvent {
    supplierId: string
}

export interface OnUpdatedEvent {
    supplierUpdated: supplierTypeRequest
}