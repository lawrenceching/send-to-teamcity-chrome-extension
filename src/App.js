/*global chrome*/
import React, {useState} from 'react';
import {Button, Divider, Form, Input, Row, Col, Table, Tabs, message} from 'antd';
import './App.css';

const {TabPane} = Tabs;

function callback(key) {
    console.log(key);
}

function saveToStorage(key, value) {
    chrome.storage.sync.set({key}, function() {
        console.log(`Saved configuration: ${key} -> ${value}`);
    })
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

async function submitUrls(urls) {
    console.log('Submitting urls: ', urls);

    return await (new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({
            action: "submitAll",
            urls
        }, function (response) {
            console.log('Received response from background: ', response);
            resolve(response.urls);
        });
    }));

}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            urls: [],
            teamcityUrl: null,
            teamcityToken: null,
            teamcityBuildTypeId: null,
            matchPattern: '123',
        };
    }

    onTeamCityUrlInputChange(event) {
        this.setState({teamcityUrl: event.target.value});
    }

    onTeamcityTokenInputChange(event) {
        this.setState({teamcityToken: event.target.value});
    }

    onTeamcityBuildTypeIdInputChange(event) {
        this.setState({teamcityBuildTypeId: event.target.value});
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
                        self.setState({
                            urls: urls
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

    async onSubmitButtonClick(urls) {
        console.log('onSubmitButtonClick');
        const submittedUrls = await submitUrls(urls);
        message.info(`${submittedUrls.length} pages are submitted to TeamCity!`);
    }

    onFilterButtonClick(event) {
        console.log('onFilterButtonClick');
        const pattern = this.state.matchPattern;
        saveToStorage('matchPattern', pattern)
    }

    onMatchPatternValueChange(event) {
        this.setState({matchPattern: event.target.value});
    }

    onOptionsTabSubmitButtonClick(event) {
        const {
            teamcityUrl,
            teamcityToken,
            teamcityBuildTypeId,
        } = this.state;
        saveToStorage('teamcityUrl', teamcityUrl);
        saveToStorage('teamcityToken', teamcityToken);
        saveToStorage('teamcityBuildTypeId', teamcityBuildTypeId);
    }

    render() {
        const {
            urls,
            teamcityUrl,
            teamcityToken,
            teamcityBuildTypeId,
            matchPattern,
        } = this.state;

        let re = new RegExp(matchPattern);
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

        console.log('render(): ', tableData);
        return (
            <div className="App">

                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="Batch Submission" key="batch-submission">

                        <Row style={
                            {margin: '10px'}
                        }>
                            <Col span={8}>
                                <Input placeholder="" value={matchPattern} onChange={e =>  this.onMatchPatternValueChange(e)}/>
                            </Col>
                            <Col span={2}><Button type="primary" onClick={(e) => this.onFilterButtonClick(e)}>Filter</Button></Col>
                            <Col span={12}></Col>
                            <Col span={2}><Button type="primary" onClick={() => this.onSubmitButtonClick(filteredUrls)}>Submit</Button></Col>
                        </Row>
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
                                <Input placeholder="http://teamcity.example.com" value={teamcityUrl} onChange={e => this.onTeamCityUrlInputChange(e)}/>
                            </Form.Item>
                            <Form.Item label="TeamCity Token">
                                <Input placeholder="" value={teamcityToken} onChange={e => this.onTeamcityTokenInputChange(e)}/>
                            </Form.Item>
                            <Form.Item label="TeamCity Build Type Id">
                                <Input placeholder="" value={teamcityBuildTypeId} onChange={e => this.onTeamcityBuildTypeIdInputChange(e)}/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" onClick={e => this.onOptionsTabSubmitButtonClick(e)}>Submit</Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                </Tabs>
            </div>
        );
    }

}

export default App;
