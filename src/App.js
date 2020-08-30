/*global chrome*/
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

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            teamcityUrl: null,
            teamcityToken: null,
            teamcityBuildTypeId: null,
            matchPattern: null,
        };
    }

    componentDidMount() {
        const self = this;
        if(!!chrome && !!chrome.storage) {
            console.log('Running in a Chrome Extension environment');
            chrome.storage.sync.get(['teamcityUrl', 'teamcityToken', 'teamcityBuildTypeId', 'matchPattern'], function(data) {
                console.log(data);
                self.setState(data);

                chrome.runtime.sendMessage({action: "getMatchedTab"}, function(response) {
                    if( response !== null && response !== undefined ) {
                        const urls = response.urls;
                        console.log(urls);
                        const pattern = data.matchPattern;
                        let re = new RegExp(pattern);
                        const filteredUrls = urls.filter(url => re.test(url))

                        console.log('setState():filteredUrls: ', filteredUrls);

                        let i = 1;
                        const tableData = filteredUrls.map(url => {
                            return {
                                key: '' + (i++),
                                url,
                                title: '',
                            };
                        });

                        console.log('setState():tableData: ', tableData);


                        self.setState({
                            tableData: tableData
                        })
                    }
                });
            });

        } else {
            console.warn('Not running in a Chrome Extension environment');
        }
    }

    componentWillUnmount() {
    }

    render() {


        const {
            tableData,
            teamcityUrl,
            teamcityToken,
            teamcityBuildTypeId,
            matchPattern,
        } = this.state;

        console.log('render(): ', tableData);
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
                                dataSource={tableData}
                                size="small"
                            />
                        </div>
                    </TabPane>
                    <TabPane tab="Options" key="options">
                        <Form {...layout}>
                            <Form.Item label="TeamCity Url">
                                <Input placeholder="http://teamcity.example.com" value={teamcityUrl}/>
                            </Form.Item>
                            <Form.Item label="TeamCity Token">
                                <Input placeholder="" value={teamcityToken}/>
                            </Form.Item>
                            <Form.Item label="TeamCity Build Type Id">
                                <Input placeholder="" value={teamcityBuildTypeId}/>
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

}

export default App;
