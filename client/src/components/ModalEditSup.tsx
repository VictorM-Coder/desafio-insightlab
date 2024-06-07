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
    notification,
    Row,
    Space, Spin,
} from 'antd'
import SupplierTypeRequest from '../types/SupplierTypeRequest.ts'
import { SupplierService } from '../services/SupplierService.ts'
import { OnCreatedEvent, OnUpdatedEvent } from '../events/Events.ts'
import SupplierTypeResponse from '../types/SupplierTypeResponse.ts'

interface Props {
    isEdit: boolean
    title: string
}

export interface ModalSupInterface {
    showModal: (supplierRequest: SupplierTypeRequest | null) => void
}

const ModalEditSup = forwardRef(({ isEdit, title }: Props, ref) => {
    const [api, contextHolder] = notification.useNotification()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [supplier, setSupplier] = useState({} as SupplierTypeRequest)
    const [loading, isLoading] = useState(false)

    useImperativeHandle(ref, () => ({
        showModal(supplierRequest: SupplierTypeRequest) {
            if (supplierRequest) {
                setSupplier(supplierRequest)
            }
            setIsModalOpen(true)
        },
        hideModal() {
            setIsModalOpen(false)
        },
    }))

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const onFinish: FormProps<SupplierTypeRequest>['onFinish'] = (values) => {
        isLoading(true)
        if (isEdit) {
            updateSupplier(values)
        } else {
            createSupplier(values)
        }
    }

    const onFinishFailed: FormProps<SupplierTypeRequest>['onFinishFailed'] = (
        errorInfo,
    ) => {
        console.error('Failed:', errorInfo)
    }

    const createSupplier = (values: SupplierTypeRequest) => {
        SupplierService.create(values)
            .then((supplierCreated) => {
                setIsModalOpen(false)
                throwCreateEvent(supplierCreated.data)
            })
            .catch((error) => {
                api.open({
                    message: 'Falha ao criar o fornecedor',
                    type: 'error',
                })
                console.error(error)
            })
            .finally(() => isLoading(false))
    }

    const updateSupplier = (values: SupplierTypeRequest) => {
        SupplierService.update(supplier.id, values)
            .then(() => {
                values.id = supplier.id
                throwUpdateEvent(values)
                setIsModalOpen(false)
            })
            .catch((error) => {
                api.open({
                    message: 'Falha ao atualizar o fornecedor',
                    type: 'error',
                })
                console.error(error)
            })
            .finally(() => isLoading(false))
    }

    const throwCreateEvent = (supplierCreated: SupplierTypeResponse) => {
        const event = new CustomEvent<OnCreatedEvent>('onCreatedSupplier', {
            bubbles: true,
            detail: {
                supplierCreated: supplierCreated,
            },
        })
        document.dispatchEvent(event)
    }

    const throwUpdateEvent = (supplierUpdated: SupplierTypeRequest) => {
        const event = new CustomEvent<OnUpdatedEvent>('onUpdatedSupplier', {
            bubbles: true,
            detail: {
                supplierUpdated: supplierUpdated,
            },
        })
        document.dispatchEvent(event)
    }

    return (
        <>
            {contextHolder}
            <Spin spinning={loading} fullscreen />
            <Modal
                width="800px"
                style={{ top: 20 }}
                title={title}
                open={isModalOpen}
                footer={null}
                onCancel={handleCancel}
                destroyOnClose
            >
                <Form
                    name="basic"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    initialValues={supplier}
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
                                        {isEdit
                                            ? 'Atualizar Fornecedor'
                                            : 'Adicionar Fornecedor'}
                                    </Button>
                                </Form.Item>
                            </Space>
                        </Row>
                    </Space>
                </Form>
            </Modal>
        </>
    )
})

export default ModalEditSup
