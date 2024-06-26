import { notification, Table, TableProps } from 'antd'
import SupplierTypeResponse from '../types/SupplierTypeResponse.ts'
import { useEffect, useState } from 'react'
import { SupplierService } from '../services/SupplierService.ts'
import { IconType } from 'antd/es/notification/interface'
import ActionButtonSup from './ActionButtonSup.tsx'
import {
    OnCreatedEvent,
    OnDeletedEvent,
    OnUpdatedEvent,
} from '../events/Events.ts'
import SupplierTypeRequest from '../types/SupplierTypeRequest.ts'
import { mapSupplierTypeRequestToResponse } from '../utils/SupplierMapper.ts'

function TableSup() {
    //onMount
    useEffect(() => {
        const handleDeleteSupplierEvent = (
            event: CustomEvent<OnDeletedEvent>,
        ) => {
            removeSupplier(event.detail.supplierId)
            openNotification('Fornecedor apagado com sucesso', '', 'success')
        }

        const handleUpdateSupplierEvent = (
            event: CustomEvent<OnUpdatedEvent>,
        ) => {
            openNotification('Fornecedor atualizado com sucesso', '', 'success')
            updateSupplier(event.detail.supplierUpdated)
        }

        const handleCreateSupplierEvent = (
            event: CustomEvent<OnCreatedEvent>,
        ) => {
            createSupplier(event.detail.supplierCreated)
            openNotification('Fornecedor criado com sucesso', '', 'success')
        }

        document.addEventListener(
            'onDeletedSupplier',
            handleDeleteSupplierEvent as EventListener,
        )

        document.addEventListener(
            'onUpdatedSupplier',
            handleUpdateSupplierEvent as EventListener,
        )

        document.addEventListener(
            'onCreatedSupplier',
            handleCreateSupplierEvent as EventListener,
        )

        setPage(1)

        return () => {
            document.removeEventListener(
                'onDeletedSupplier',
                handleDeleteSupplierEvent as EventListener,
            )
            document.removeEventListener(
                'onUpdatedSupplier',
                handleUpdateSupplierEvent as EventListener,
            )
            document.removeEventListener(
                'onCreatedSupplier',
                handleCreateSupplierEvent as EventListener,
            )
        }
    }, [])

    const [api, contextHolder] = notification.useNotification()
    const [suppliers, setSuppliers] = useState<SupplierTypeResponse[]>([])
    const [totalElements, setTotalElements] = useState<number>()
    const [actualPage, setActualPage] = useState<number>()
    const [pageSize, setPageSize] = useState<number>()
    const [loading, isLoading] = useState(true)

    const setPage = (page: number) => {
        isLoading(true)
        SupplierService.getAll(page)
            .then((response) => {
                setSuppliers(response.data.suppliers)
                setActualPage(response.data.actualPage)
                setTotalElements(response.data.totalElements)
                setPageSize(response.data.pageSize)
            })
            .catch((reason) => {
                openNotification(
                    'Erro na busca',
                    'Não foi possível carregar os fornecedores',
                    'error',
                )
                console.error(reason)
            })
            .finally(() => isLoading(false))
    }

    const removeSupplier = (supplierId: string) => {
        setSuppliers((prevSuppliers) =>
            prevSuppliers.filter((supplier) => supplier.id !== supplierId),
        )
    }

    const createSupplier = (supplierTypeResponse: SupplierTypeResponse) => {
        setSuppliers((prevSuppliers) => {
            const newSupplers = [...prevSuppliers]
            newSupplers.pop()
            newSupplers.unshift(supplierTypeResponse)
            return newSupplers
        })
    }

    const updateSupplier = (supplierTypeRequest: SupplierTypeRequest) => {
        const supplierTypeResponse =
            mapSupplierTypeRequestToResponse(supplierTypeRequest)
        setSuppliers((prevSuppliers) => {
            const index = prevSuppliers.findIndex(
                (supplier) => supplier.id === supplierTypeResponse.id,
            )
            if (index > -1) {
                const newSuppliers = [...prevSuppliers]
                newSuppliers[index] = supplierTypeResponse
                return newSuppliers
            }
            return prevSuppliers
        })
    }

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

    const columns: TableProps<SupplierTypeResponse>['columns'] = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Nome fantasia',
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
            title: 'Endereço',
            dataIndex: 'address',
            key: 'address',
            responsive: ['xl'],
        },
        {
            title: 'Ações',
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
                loading={loading}
                rowKey={(record) => record.id}
                dataSource={suppliers}
                columns={columns}
                pagination={{
                    defaultCurrent: 1,
                    current: actualPage,
                    pageSize: pageSize,
                    total: totalElements,
                    onChange: (newPage) => setPage(newPage),
                }}
            ></Table>
        </>
    )
}

export default TableSup
