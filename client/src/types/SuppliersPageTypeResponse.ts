import SupplierTypeResponse from './SupplierTypeResponse.ts'

interface SuppliersPageTypeResponse {
    suppliers: SupplierTypeResponse[]
    actualPage: number
    totalPages: number
    pageSize: number
}

export default SuppliersPageTypeResponse
