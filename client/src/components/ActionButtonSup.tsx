import { Button, Dropdown, MenuProps, notification } from 'antd'
import { SupplierService } from '../services/SupplierService.ts'
import { OnDeletedEvent } from '../events/OnDeletedEvent.ts'

interface Props {
    supplierId: string
}

function ActionButtonSup({ supplierId }: Props) {
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
            console.log('more info ' + supplierId)
        } else if (key === '2') {
            console.log('edit ' + supplierId)
        } else {
            deleteSupplier(supplierId)
        }
    }

    const [api, contextHolder] = notification.useNotification()

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
            <Dropdown menu={{ items, onClick }} placement="bottom" arrow>
                <Button>Actions</Button>
            </Dropdown>
        </>
    )
}

export default ActionButtonSup
