import { api } from '../libs/Axios.ts'
import SuppliersPageTypeResponse from '../types/SuppliersPageTypeResponse.ts'

export const SupplierService = {
    async getAll(page: number = 1) {
        return await api.get<SuppliersPageTypeResponse>('', {
            params: {
                page: page,
            },
        })
    },
    async delete(id: string) {
        return await api.delete<SuppliersPageTypeResponse>(id)
    },
}
