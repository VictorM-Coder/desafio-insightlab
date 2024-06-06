import { api } from '../libs/Axios.ts'
import SuppliersPageTypeResponse from '../types/SuppliersPageTypeResponse.ts'
import SupplierTypeRequest from '../types/SupplierTypeRequest.ts'
import SupplierTypeResponse from '../types/SupplierTypeResponse.ts'

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
    async create(supplier: SupplierTypeRequest) {
        return await api.post<SupplierTypeResponse>('', supplier)
    },
}
