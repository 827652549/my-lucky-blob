import React, {Component} from 'react';
import {Table, Rate, Layout, Popconfirm, message, Button, Row, Col, Modal, Input,Form} from 'antd';
import {List} from "immutable";

const {Header, Content} = Layout;

const data = [
    {
        key: 1,
        id: 1,
        title: 'canvas性能优化',
        link: 'http://www.baidu.com',
        type: 'Web',
        study: 5,
        time: Date(Date.now()),
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
    },
    {
        key: 2,
        id: 2,
        title: '进阶阿里巴巴之路',
        link: 'http://www.baidu.com',
        type: '生活',
        study: 3,
        time: Date(Date.now()),
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 3,
        id: 3,
        title: 'canvas教程',
        link: 'http://www.baidu.com',
        type: '算法',
        study: 1,
        time: Date(Date.now()),
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    }
];

class PageCollection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: data,
            visible: false
        };


        this.handleRatechange = this.handleRatechange.bind(this);
        this.cancel = this.cancel.bind(this);
        this.confirm = this.confirm.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleModalCancel = this.handleModalCancel.bind(this);
    }

    render() {
        const layout = {
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 12,
            },
        };
        const tailLayout = {
            wrapperCol: {
                offset: 4,
                span: 12,
            },
        };

            const onFinish = values => {
                message.success('添加「'+values.title+'」成功！');
                const obj = [{
                    key: values.link,
                    id: 4,
                    title: values.title,
                    link: values.link,
                    type: values.type,
                    study: values.study,
                    time: Date(Date.now()),
                    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
                }];
                this.setState({data:this.state.data.concat(obj)})
            };

            const onFinishFailed = errorInfo => {
                message.error('添加失败');
            };
            const columns = [
                {title: 'Id', dataIndex: 'id', key: 'id', sorter: (a, b) => a.id - b.id},
                {title: '标题', dataIndex: 'title', key: 'title'},
                {title: '链接', dataIndex: 'link', key: 'link'},
                {
                    title: '类型', dataIndex: 'type', key: 'type', sorter: (a, b) => a.type.length - b.type.length,
                    filters: [
                        {
                            text: 'Web',
                            value: 'Web',
                        },
                        {
                            text: '网络',
                            value: '网络',
                        },
                        {
                            text: '算法',
                            value: '算法',
                        },
                        {
                            text: '生活',
                            value: '生活',
                        },

                    ],
                    filterMultiple: true,
                    onFilter: (value, record) => record.type.indexOf(value) === 0,
                },
                {
                    title: '掌握',
                    dataIndex: 'study',
                    key: 'study',
                    render: (text, record) => <Rate value={text}
                                                    onChange={(value) => this.handleRatechange(value, record.id)}/>,
                    sorter: (a, b) => a.study - b.study
                },
                {title: '时间', dataIndex: 'time', key: 'time', sorter: (a, b) => a.time - b.time},
                {
                    title: '操作',
                    dataIndex: '',
                    key: 'x',
                    render: () => <Popconfirm
                        title="你确定要删除这条收藏？"
                        onConfirm={this.confirm}
                        onCancel={this.cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a href="#">删除</a>
                    </Popconfirm>,
                },
            ];


            return (
                <Layout>
                    <Header style={{backgroundColor: 'lightgray'}}>
                        <Row>
                            <Col span={12}>
                                <Button type="primary" onClick={this.showModal}>添加</Button>
                            </Col>
                            <Col span={10}/>
                            <Col span={2}>
                                <Button>日志</Button>
                            </Col>
                        </Row>
                    </Header>
                    <Content>
                        <Table
                            columns={columns}
                            expandable={{
                                expandedRowRender: record => <p style={{margin: 0}}>{record.description}</p>,
                                rowExpandable: record => record.name !== 'Not Expandable',
                            }}
                            dataSource={this.state.data}
                        />
                    </Content>

                    {/*<Footer>Footer</Footer>*/}
                    <Modal
                        title="添加新收藏"
                        visible={this.state.visible}
                        footer={null}
                        onCancel={this.handleModalCancel}
                    >
                        <Form
                            {...layout}
                            name="basic"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="标题"
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入标题！',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                label="网址"
                                name="link"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入网址！',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                label="类型"
                                name="type"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入类型！',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                label="掌握"
                                name="study"
                                rules={[
                                    {
                                        required: true,
                                        message: '掌握程度！？！',
                                    },
                                ]}
                            >
                                {/*<Input/>*/}
                                <Rate/>
                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                    添加
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </Layout>

            )
        }

        handleRatechange = (value, id) => {
            const newState = this.state;
            const arr = List(newState.data).setIn([id - 1, 'study'], value).toArray();
            this.setState({data: arr});
        };

        confirm = (e) => {
            console.log(e);
            message.success('Click on Yes');
        };

        cancel = (e) => {
            console.log(e);
            message.error('Click on No');
        };

        showModal = () => {
            this.setState({
                visible: true,
            });
        };

        handleModalCancel = e => {
            console.log(e);
            this.setState({
                visible: false,
            });
        };
    }


    export
    default
    PageCollection;
