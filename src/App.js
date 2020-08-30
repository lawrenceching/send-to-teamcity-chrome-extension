import React, {useState} from 'react';
import {Button, Divider, Form, Input, Radio, Table, Tabs} from 'antd';
import './App.css';

const {TabPane} = Tabs;

function callback(key) {
    console.log(key);
}

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 16},
};

const columns = [
    {
        title: 'Url',
        dataIndex: 'url',
    },
    {
        title: 'Title',
        dataIndex: 'title',
    }
];
const data = [
    {
        key: '1',
        url: 'John Brown',
        title: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        url: 'Jim Green',
        title: 'London No. 1 Lake Park',
    },
]; // rowSelection object indicates the need for row selection

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
    }),
};

function App() {
    return (
        <div className="App">

            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Batch Submission" key="batch-submission">
                    <div>
                        <Table
                            rowSelection={{
                                type: 'checkbox',
                                ...rowSelection,
                            }}
                            columns={columns}
                            dataSource={data}
                            size="small"
                        />
                    </div>
                </TabPane>
                <TabPane tab="Options" key="options">
                    <Form {...layout}>
                        <Form.Item label="TeamCity Url">
                            <Input placeholder="http://teamcity.example.com"/>
                        </Form.Item>
                        <Form.Item label="TeamCity Token">
                            <Input placeholder=""/>
                        </Form.Item>
                        <Form.Item label="TeamCity Build Type Id">
                            <Input placeholder=""/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary">Submit</Button>
                        </Form.Item>
                    </Form>
                </TabPane>
            </Tabs>
        </div>
    );
}

export default App;
