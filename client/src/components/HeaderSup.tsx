import ModalEditSup, { ModalSupInterface } from './ModalEditSup.tsx'
import { useRef } from 'react'
import { Button, Col, Row } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import Title from 'antd/lib/typography/Title'

function HeaderSup() {
    const modalSup = useRef<ModalSupInterface>(null)
    return (
        <header>
            <Row align="middle" justify="space-between">
                <Col sm={12} span={24}>
                    <Title>Fornecedores</Title>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        icon={<PlusCircleOutlined />}
                        size="large"
                        onClick={() => modalSup.current?.showModal(null)}
                    >
                        Adicionar Fornecedor
                    </Button>
                </Col>
            </Row>
            <ModalEditSup
                title="Adicionar fornecedor"
                ref={modalSup}
                isEdit={false}
            />
        </header>
    )
}

export default HeaderSup
