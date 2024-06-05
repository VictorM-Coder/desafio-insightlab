import { notification, Table, TableProps } from 'antd'
import SupplierTypeResponse from '../types/SupplierTypeResponse.ts'
import { useEffect, useState } from 'react'
import { SupplierService } from '../services/SupplierService.ts'
import { IconType } from 'antd/es/notification/interface'
import ActionButtonSup from './ActionButtonSup.tsx'
import { OnDeletedEvent } from '../events/OnDeletedEvent.ts'

function TableSup() {
    //onMount
    useEffect(() => {
        const handleDeleteSupplierEvent = (
            event: CustomEvent<OnDeletedEvent>,
        ) => {
            removeSupplier(event.detail.supplierId)
            openNotification('Fornecedor apagado com sucesso', '', 'success')
        }

        document.addEventListener(
            'onDeletedSupplier',
            handleDeleteSupplierEvent as EventListener,
        )

        const getAll = async () => {
            await SupplierService.getAll()
                .then((response) => {
                    setSuppliers(response.data.suppliers)
                })
                .catch((reason) => {
                    openNotification(
                        'Erro na busca',
                        'Não foi possível carregar os fornecedores',
                        'error',
                    )
                    console.error(reason)
                })
        }
        getAll()

        return () => {
            document.removeEventListener(
                'onDeletedSupplier',
                handleDeleteSupplierEvent as EventListener,
            )
        }
    }, [])

    const removeSupplier = (supplierId: string) => {
        setSuppliers((prevSuppliers) =>
            prevSuppliers.filter((supplier) => supplier.id !== supplierId),
        )
    }

    const [api, contextHolder] = notification.useNotification()

    const openNotification = (
        message: string,
        description: string,
        type: IconType,
    ) => {
        api.open({
            message: message,
            description: description,
            type: type,
        })
    }

    const [suppliers, setSuppliers] = useState<SupplierTypeResponse[]>([])

    const columns: TableProps<SupplierTypeResponse>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Company',
            dataIndex: 'companyName',
            key: 'companyName',
            responsive: ['sm'],
        },
        {
            title: 'CNPJ',
            dataIndex: 'cnpj',
            key: 'cnpj',
        },
        {
            title: 'E-Mail',
            dataIndex: 'email',
            key: 'email',
            responsive: ['md'],
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            responsive: ['xl'],
        },
        {
            title: 'Actions',
            key: 'actions',
            dataIndex: 'actions',
            render: (_, { id }) => {
                return <ActionButtonSup supplierId={id} />
            },
        },
    ]

    return (
        <>
            {contextHolder}
            <Table
                bordered={true}
                rowKey={(record) => record.id}
                dataSource={suppliers}
                columns={columns}
            ></Table>
        </>
    )
}

export default TableSup
