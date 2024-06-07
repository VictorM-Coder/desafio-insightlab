import { SUPPLIERS_API } from '../libs/Axios.ts'
import SuppliersPageTypeResponse from '../types/SuppliersPageTypeResponse.ts'
import SupplierTypeRequest from '../types/SupplierTypeRequest.ts'
import SupplierTypeResponse from '../types/SupplierTypeResponse.ts'

export const SupplierService = {
    async getAll(page: number = 1) {
        return await SUPPLIERS_API.get<SuppliersPageTypeResponse>('', {
            params: {
                page: page,
            },
        })
    },
    async delete(id: string) {
        return await SUPPLIERS_API.delete(id)
    },
    async findById(id: string) {
        return await SUPPLIERS_API.get<SupplierTypeRequest>(id)
    },
    async update(id: string, supplier: SupplierTypeRequest) {
        return await SUPPLIERS_API.put(id, supplier)
    },
    async create(supplier: SupplierTypeRequest) {
        return await SUPPLIERS_API.post<SupplierTypeResponse>('', supplier)
    },
}
