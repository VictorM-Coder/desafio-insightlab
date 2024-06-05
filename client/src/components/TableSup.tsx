import {
    Button,
    Dropdown,
    MenuProps,
    notification,
    Table,
    TableProps,
} from 'antd'
import SupplierTypeResponse from '../types/SupplierTypeResponse.ts'
import { useEffect, useState } from 'react'
import { SupplierService } from '../services/SupplierService.ts'
import { IconType } from 'antd/es/notification/interface'

function TableSup() {
    useEffect(() => {
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
    }, [])

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
            dataIndex: 'actions',
            key: 'actions',
            render: () => {
                return (
                    <Dropdown menu={{ items }} placement="bottom" arrow>
                        <Button>Actions</Button>
                    </Dropdown>
                )
            },
        },
    ]

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: 'Show Details',
        },
        {
            key: '2',
            label: 'Edit',
        },
        {
            key: '3',
            danger: true,
            label: 'Delete',
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
