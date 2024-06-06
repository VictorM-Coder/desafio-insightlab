import supplierTypeRequest from '../types/SupplierTypeRequest.ts'
import SupplierTypeResponse from '../types/SupplierTypeResponse.ts'

export interface OnDeletedEvent {
    supplierId: string
}

export interface OnUpdatedEvent {
    supplierUpdated: supplierTypeRequest
}

export interface OnCreatedEvent {
    supplierCreated: SupplierTypeResponse
}
