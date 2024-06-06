import SupplierTypeResponse from './SupplierTypeResponse.ts'

interface SuppliersPageTypeResponse {
    suppliers: SupplierTypeResponse[]
    actualPage: number
    totalElements: number
    pageSize: number
}

export default SuppliersPageTypeResponse
