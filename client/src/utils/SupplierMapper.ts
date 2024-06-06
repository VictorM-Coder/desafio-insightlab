import SupplierTypeRequest from '../types/SupplierTypeRequest.ts'
import SupplierTypeResponse from '../types/SupplierTypeResponse.ts'

export function mapSupplierTypeRequestToResponse(
    supplier: SupplierTypeRequest,
): SupplierTypeResponse {
    const { id, name, companyName, cnpj, email, address } = supplier
    let fullAddress = `${address.street}, ${address.number}`

    if (address.additionalInfo) {
        fullAddress += `, ${address.additionalInfo}`
    }

    fullAddress += `, ${address.neighborhood}, ${address.city}, ${address.state}, ${address.cep}`

    return {
        id,
        name,
        companyName,
        cnpj,
        email,
        address: fullAddress,
    }
}
