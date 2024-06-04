import Title from "antd/lib/typography/Title";
import {Button} from "antd";
import ModalSup, {ModalSupInterface} from "./ModalSup.tsx";
import SupplierTypeRequest from "../types/SupplierTypeRequest.ts";
import {useRef} from "react";

function HeaderSup() {
    const modalSup = useRef<ModalSupInterface>(null)
    return (
        <header>
            <Title>Suppliers</Title>
            <Button type="primary" size="large" onClick={() => modalSup.current?.showModal()}>
                Add Supplier
            </Button>
            <ModalSup title="Adiconar fornecedor" ref={modalSup} supplier={{} as SupplierTypeRequest} />
        </header>
    );
}

export default HeaderSup