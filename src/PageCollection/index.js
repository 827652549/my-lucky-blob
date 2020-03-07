import React, {Component} from 'react';
import {Table, Rate, Layout} from 'antd';
import {List} from "immutable";

const {Header, Footer, Content} = Layout;

const data = [
    {
        key: 1,
        id: 1,
        title: 'canvas性能优化',
        link: 'http://www.baidu.com',
        type: 'Web',
        study: 5,
        time: Date(Date.now()),
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
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
        this.state = {data: data};


        this.handleRatechange = this.handleRatechange.bind(this);
    }

    render() {
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
                render: () => <a>Delete</a>,
            },
        ];


        return (
            <Layout>
                <Header style={{backgroundColor:'lightgray'}}>Header</Header>
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
            </Layout>

        )
    }

    handleRatechange = (value, id) => {
        const newState = this.state;
        const arr = List(newState.data).setIn([id - 1, 'study'], value).toArray();
        this.setState({data: arr});
    };
}


export default PageCollection;
