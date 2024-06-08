import { Button, Dropdown, MenuProps, notification, Spin } from 'antd'
import { SupplierService } from '../services/SupplierService.ts'
import { OnDeletedEvent } from '../events/Events.ts'
import ModalEditSup, { ModalSupInterface } from './ModalEditSup.tsx'
import { useRef, useState } from 'react'
import ModalShowSup from './ModalShowSup.tsx'

interface Props {
    supplierId: string
}

function ActionButtonSup({ supplierId }: Props) {
    const [api, contextHolder] = notification.useNotification()
    const modalSup = useRef<ModalSupInterface>(null)
    const modalShow = useRef<ModalSupInterface>(null)
    const [loading, isLoading] = useState(false)

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: 'Ver detalhes',
        },
        {
            key: '2',
            label: 'Editar',
        },
        {
            key: '3',
            danger: true,
            label: 'Deletar',
        },
    ]

    const onClick: MenuProps['onClick'] = ({ key }) => {
        isLoading(true)
        if (key === '1') {
            getSupplier()
        } else if (key === '2') {
            editSupplier()
        } else {
            deleteSupplier(supplierId)
        }
    }

    const getSupplier = () => {
        SupplierService.findById(supplierId)
            .then((response) => {
                modalShow.current?.showModal(response.data)
            })
            .catch((error) => {
                api.open({
                    message: 'Erro',
                    description: 'Não foi possível encontrar o fornecedor',
                    type: 'error',
                })
                console.error(error)
            })
            .finally(() => isLoading(false))
    }

    const editSupplier = () => {
        SupplierService.findById(supplierId)
            .then((response) => {
                modalSup.current?.showModal(response.data)
            })
            .catch((error) => {
                api.open({
                    message: 'Erro',
                    description: 'Não foi possível editar o fornecedor',
                    type: 'error',
                })
                console.error(error)
            })
            .finally(() => isLoading(false))
    }

    const deleteSupplier = (id: string) => {
        SupplierService.delete(id)
            .then(() => {
                throwDeleteEvent()
            })
            .catch((error) => {
                api.open({
                    message: 'Erro',
                    description: 'Não foi possível apagar o fornecedor',
                    type: 'error',
                })
                console.error(error)
            })
            .finally(() => isLoading(false))
    }

    const throwDeleteEvent = () => {
        const event = new CustomEvent<OnDeletedEvent>('onDeletedSupplier', {
            bubbles: true,
            detail: {
                supplierId: supplierId,
            },
        })
        document.dispatchEvent(event)
    }

    return (
        <>
            {contextHolder}
            <Spin spinning={loading} fullscreen />
            <ModalEditSup isEdit title="Fornecedor" ref={modalSup} />
            <ModalShowSup ref={modalShow} />
            <Dropdown menu={{ items, onClick }} placement="bottom" arrow>
                <Button>Ações</Button>
            </Dropdown>
        </>
    )
}

export default ActionButtonSup
