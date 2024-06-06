import { api } from '../libs/Axios.ts'
import SuppliersPageTypeResponse from '../types/SuppliersPageTypeResponse.ts'
import SupplierTypeRequest from '../types/SupplierTypeRequest.ts'

export const SupplierService = {
    async getAll(page: number = 1) {
        return await api.get<SuppliersPageTypeResponse>('', {
            params: {
                page: page,
            },
        })
    },
    async delete(id: string) {
        return await api.delete(id)
    },
    async findById(id: string) {
        return await api.get<SupplierTypeRequest>(id)
    },
    async update(id: string, supplier: SupplierTypeRequest) {
        return await api.put(id, supplier)
    },
}
