import Title from 'antd/lib/typography/Title'
import { Button } from 'antd'
import ModalSup, { ModalSupInterface } from './ModalSup.tsx'
import SupplierTypeRequest from '../types/SupplierTypeRequest.ts'
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
                onClick={() => modalSup.current?.showModal()}
            >
                Adidionar Fornecedor
            </Button>
            <ModalSup
                title="Adiconar fornecedor"
                ref={modalSup}
                supplier={{} as SupplierTypeRequest}
            />
        </header>
    )
}

export default HeaderSup
