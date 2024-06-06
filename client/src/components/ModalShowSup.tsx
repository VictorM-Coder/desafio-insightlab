import { Modal } from 'antd'
import SupplierTypeRequest from '../types/SupplierTypeRequest.ts'
import { forwardRef, useImperativeHandle, useState } from 'react'

const ModalShowSup = forwardRef((_, ref) => {
    const [supplier, setSupplier] = useState<SupplierTypeRequest>()
    const [isModalOpen, setIsModalOpen] = useState(false)

    useImperativeHandle(ref, () => ({
        showModal(supplierRequest: SupplierTypeRequest) {
            setSupplier(supplierRequest)
            setIsModalOpen(true)
        },
        hideModal() {
            setIsModalOpen(false)
        },
    }))

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const showTableIfExists = () => {
        if (supplier) {
            return (
                <table className="table-sup">
                    <thead className="theader-sup">
                        <tr className="header-row">
                            <th className="cell-header">Campo</th>
                            <th className="cell-header">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="row-sup">
                            <td className="cell-attribute">Nome</td>
                            <td className="cell-data">{supplier.name}</td>
                        </tr>
                        <tr className="row-sup">
                            <td className="cell-attribute">CNPJ</td>
                            <td className="cell-data">{supplier.cnpj}</td>
                        </tr>
                        <tr className="row-sup">
                            <td className="cell-attribute">ID</td>
                            <td className="cell-data">{supplier.id}</td>
                        </tr>
                        <tr className="row-sup">
                            <td className="cell-attribute">Nome da Empresa</td>
                            <td className="cell-data">
                                {supplier.companyName}
                            </td>
                        </tr>
                        <tr className="row-sup">
                            <td className="cell-attribute">Email</td>
                            <td className="cell-data">{supplier.email}</td>
                        </tr>
                        <tr className="row-sup">
                            <td className="cell-attribute">Rua</td>
                            <td className="cell-data">
                                {supplier.address.street}
                            </td>
                        </tr>
                        <tr className="row-sup">
                            <td className="cell-attribute">Número</td>
                            <td className="cell-data">
                                {supplier.address.number}
                            </td>
                        </tr>
                        <tr className="row-sup">
                            <td className="cell-attribute">
                                Informação Adicional
                            </td>
                            <td className="cell-data">
                                {supplier.address.additionalInfo}
                            </td>
                        </tr>
                        <tr className="row-sup">
                            <td className="cell-attribute">Bairro</td>
                            <td className="cell-data">
                                {supplier.address.neighborhood}
                            </td>
                        </tr>
                        <tr className="row-sup">
                            <td className="cell-attribute">Cidade</td>
                            <td className="cell-data">
                                {supplier.address.city}
                            </td>
                        </tr>
                        <tr className="row-sup">
                            <td className="cell-attribute">Estado</td>
                            <td className="cell-data">
                                {supplier.address.state}
                            </td>
                        </tr>
                        <tr className="row-sup">
                            <td className="cell-attribute">CEP</td>
                            <td className="cell-data">
                                {supplier.address.cep}
                            </td>
                        </tr>
                    </tbody>
                </table>
            )
        }
    }

    return (
        <Modal
            title="Fornecedor"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
        >
            {showTableIfExists()}
        </Modal>
    )
})

export default ModalShowSup
