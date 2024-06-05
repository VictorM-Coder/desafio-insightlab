import { forwardRef, useImperativeHandle, useState } from 'react'
import {
    Button,
    Col,
    Divider,
    Form,
    FormProps,
    Input,
    InputNumber,
    Modal,
    Row,
    Space,
} from 'antd'
import SupplierTypeRequest from '../types/SupplierTypeRequest.ts'

interface Props {
    title: string
    supplier: SupplierTypeRequest
}

export interface ModalSupInterface {
    showModal: () => void
}

const ModalSup = forwardRef(({ title, supplier }: Props, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    useImperativeHandle(ref, () => ({
        showModal() {
            setIsModalOpen(true)
        },
        hideModal() {
            setIsModalOpen(false)
        },
    }))

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const onFinish: FormProps<SupplierTypeRequest>['onFinish'] = (values) => {
        console.log('Success:', values)
    }

    const onFinishFailed: FormProps<SupplierTypeRequest>['onFinishFailed'] = (
        errorInfo,
    ) => {
        console.log('Failed:', errorInfo)
    }

    return (
        <Modal
            width="800px"
            style={{ top: 20 }}
            title={title}
            open={isModalOpen}
            footer={null}
            onCancel={handleCancel}
        >
            <Form
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Space direction="vertical">
                    <Row gutter={40}>
                        <Col span={24} md={12}>
                            <Form.Item<SupplierTypeRequest>
                                label="Nome"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Por favor, preencha o campo de nome',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item<SupplierTypeRequest>
                                label="Nome Fantasia"
                                name="companyName"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Por favor, preencha o campo de nome fantasia',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item<SupplierTypeRequest>
                                label="CNPJ"
                                name="cnpj"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Por favor, preencha o campo de CNPJ',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item<SupplierTypeRequest>
                                label="E-Mail"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Por favor, preencha o campo de E-Mail',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={12}>
                            <Form.Item<SupplierTypeRequest>
                                label="CEP"
                                name={['address', 'cep']}
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Por favor, preencha o campo de CEP',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Row gutter={20}>
                                <Col span={12}>
                                    <Form.Item<SupplierTypeRequest>
                                        label="Estado"
                                        name={['address', 'state']}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Por favor, preencha o campo de estado',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item<SupplierTypeRequest>
                                        label="Cidade"
                                        name={['address', 'city']}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Por favor, preencha o campo de cidade',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item<SupplierTypeRequest>
                                label="Rua"
                                name={['address', 'street']}
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Por favor, preencha o campo da rua',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Row gutter={20}>
                                <Col span={12}>
                                    <Form.Item<SupplierTypeRequest>
                                        label="Bairro"
                                        name={['address', 'neighborhood']}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Por favor, preencha o campo de bairro',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item<SupplierTypeRequest>
                                        label="Número"
                                        name={['address', 'number']}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Por favor, preencha o campo de número',
                                            },
                                        ]}
                                    >
                                        <InputNumber />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item<SupplierTypeRequest>
                                label="Informação Adicional"
                                name={['address', 'additionalInfo']}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider />
                    <Row justify="end">
                        <Space size={40}>
                            <Form.Item>
                                <Button
                                    type="default"
                                    onClick={handleCancel}
                                    size={'large'}
                                >
                                    Cancelar
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    id="tetse"
                                    type="primary"
                                    htmlType="submit"
                                    size={'large'}
                                >
                                    Adicionar Fornecedor
                                </Button>
                            </Form.Item>
                        </Space>
                    </Row>
                </Space>
            </Form>
        </Modal>
    )
})

export default ModalSup
