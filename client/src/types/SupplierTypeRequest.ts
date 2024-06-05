interface SupplierTypeRequest {
    id: string
    name: string
    companyName: string
    cnpj: string
    email: string
    address: {
        street: string
        number: number
        additionalInfo: string
        neighborhood: string
        city: string
        state: string
        cep: string
    }
}

export default SupplierTypeRequest
