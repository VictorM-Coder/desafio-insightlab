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
            updateSupplier(event.detail.supplierUpdated)
            openNotification('Fornecedor atualizado com sucesso', '', 'success')
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

    const setPage = (page: number) => {
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
    }

    const removeSupplier = (supplierId: string) => {
        setSuppliers((prevSuppliers) =>
            prevSuppliers.filter((supplier) => supplier.id !== supplierId),
        )
    }

    const createSupplier = (supplierTypeResponse: SupplierTypeResponse) => {
        setSuppliers((prevSuppliers) => {
            const newSupplers = [...prevSuppliers]
            newSupplers.push(supplierTypeResponse)
            return newSupplers
        })
    }

    const updateSupplier = (supplierTypeRequest: SupplierTypeRequest) => {
        const supplierTypeResponse =
            mapSupplierTypeRequestToResponse(supplierTypeRequest)
        const index = suppliers.findIndex(
            (supplier) => supplier.id === supplierTypeResponse.id,
        )

        setSuppliers((prevSuppliers) => {
            const newSuppliers = [...prevSuppliers]
            newSuppliers[index] = supplierTypeResponse
            return newSuppliers
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
                pagination={{
                    defaultCurrent: 1,
                    current: actualPage,
                    pageSize: pageSize,
                    total: totalElements,
                    //todo pegar o total da API e mapear nas requisições
                    onChange: (newPage) => setPage(newPage),
                }}
            ></Table>
        </>
    )
}

export default TableSup
