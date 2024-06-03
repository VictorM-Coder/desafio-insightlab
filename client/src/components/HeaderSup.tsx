import Title from "antd/lib/typography/Title";
import {Button} from "antd";

function HeaderSup() {
    return (
        <header>
            <Title>Suppliers</Title>
            <Button type="primary" size="large">
                Add Supplier
            </Button>
        </header>
    );
}

export default HeaderSup