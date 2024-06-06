import { Button, Dropdown, MenuProps, notification } from 'antd'
import { SupplierService } from '../services/SupplierService.ts'
import { OnDeletedEvent } from '../events/OnDeletedEvent.ts'
import ModalSup, { ModalSupInterface } from './ModalSup.tsx'
import { useRef } from 'react'

interface Props {
    supplierId: string
}

function ActionButtonSup({ supplierId }: Props) {
    const modalSup = useRef<ModalSupInterface>(null)
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

    const onClick: MenuProps['onClick'] = ({ key }) => {
        if (key === '1') {
            getSupplier()
        } else if (key === '2') {
            console.log('edit ' + supplierId)
        } else {
            deleteSupplier(supplierId)
        }
    }

    const [api, contextHolder] = notification.useNotification()

    const getSupplier = () => {
        SupplierService.findById(supplierId).then((response) => {
            modalSup.current?.showModal(response.data)
        })
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
            <ModalSup title="Fornecedor" ref={modalSup} />
            <Dropdown menu={{ items, onClick }} placement="bottom" arrow>
                <Button>Actions</Button>
            </Dropdown>
        </>
    )
}

export default ActionButtonSup
