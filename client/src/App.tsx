import './App.css'
import HeaderSup from './components/HeaderSup.tsx'
import TableSup from './components/TableSup.tsx'
import { Flex, Space } from 'antd'

function App() {
    return (
        <div className="App">
            <Flex justify="center">
                <Space size={40} direction="vertical" className="w-100">
                    <HeaderSup />
                    <TableSup />
                </Space>
            </Flex>
        </div>
    )
}

export default App
