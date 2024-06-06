import Title from 'antd/lib/typography/Title'
import { Button } from 'antd'
import ModalEditSup, { ModalSupInterface } from './ModalEditSup.tsx'
import { useRef } from 'react'
import { PlusCircleOutlined } from '@ant-design/icons'

function HeaderSup() {
    const modalSup = useRef<ModalSupInterface>(null)
    return (
        <header>
            <Title>Fornecedores</Title>
            <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                size="large"
                onClick={() => modalSup.current?.showModal(null)}
            >
                Adidionar Fornecedor
            </Button>
            <ModalEditSup title="Adiconar fornecedor" ref={modalSup} />
        </header>
    )
}

export default HeaderSup
