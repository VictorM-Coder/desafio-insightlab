import {Button, Dropdown, MenuProps, Table, TableProps} from "antd";
import SupplierTypeResponse from "../types/SupplierTypeResponse.ts";

function TableSup() {
    const tableDate: SupplierTypeResponse[] = [
        {
            "id": "1a2b3c4d-5e6f-7g8h-9i10-j11k12l13m14",
            "name": "Alice Johnson",
            "companyName": "Alice's Supplies Inc.",
            "cnpj": "12.345.678/0001-90",
            "email": "alice.johnson@supplies.com",
            "address": "123 Elm Street, Suite 200, Springfield, IL, 62701"
        },
        {
            "id": "2b3c4d5e-6f7g-8h9i-10j11-k12l13m14n15",
            "name": "Bob Smith",
            "companyName": "Bob's Tools Ltd.",
            "cnpj": "98.765.432/0001-01",
            "email": "bob.smith@toolsltd.com",
            "address": "456 Oak Avenue, Floor 3, Chicago, IL, 60601"
        },
        {
            "id": "3c4d5e6f-7g8h-9i10-11j12-k13l14m15n16",
            "name": "Carol White",
            "companyName": "Carol's Office Supplies",
            "cnpj": "11.223.344/0001-55",
            "email": "carol.white@officesupplies.com",
            "address": "789 Pine Road, Apt 4B, New York, NY, 10001"
        },
        {
            "id": "4d5e6f7g-8h9i-10j11-12k13-l14m15n16o17",
            "name": "David Brown",
            "companyName": "David's Construction Materials",
            "cnpj": "22.334.455/0001-66",
            "email": "david.brown@construction.com",
            "address": "321 Birch Boulevard, Unit 5A, Los Angeles, CA, 90001"
        },
        {
            "id": "5e6f7g8h-9i10-11j12-13k14-l15m16n17o18",
            "name": "Eva Green",
            "companyName": "Green's Electronics",
            "cnpj": "33.445.566/0001-77",
            "email": "eva.green@electronics.com",
            "address": "654 Maple Street, Office 300, San Francisco, CA, 94101"
        }
    ]

    const columns: TableProps<SupplierTypeResponse>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Company',
            dataIndex: 'companyName',
            key: 'companyName',
            responsive: ["sm"]
        },
        {
            title: 'CNPJ',
            dataIndex: 'cnpj',
            key: 'cnpj',
        },
        {
            title: 'E-Mail',
            dataIndex: 'email',
            key: 'email',
            responsive: ["md"]
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            responsive: ["xl"]
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: () => {
                return <Dropdown menu={{items}} placement="bottom" arrow>
                    <Button>Actions</Button>
                </Dropdown>;
            }
        }
    ]


    const items: MenuProps['items'] = [
        {
            key: '1',
            label: "Show Details"
        },
        {
            key: '2',
            label: "Edit"
        },
        {
            key: '3',
            danger: true,
            label: "Delete",
        },
    ];

    return (
        <Table bordered={true} dataSource={tableDate} columns={columns}></Table>
    );
}

export default TableSup