//app.js
import React, {Component} from 'react';
import frame from "./frame/stores/router3.jsx";    // 公告组件栏
import Content from './content/index.jsx';    // 内容盒子
const Nav = frame["Nav"],    // 导航
      Footer = frame["Footer"],    // 尾部
      ChatBox = frame["ChatBox"],    // 对话框
      Search = frame["Search"];    // 搜索框

class App extends Component{

    constructor(props) {
        super(props);
        this.state = { 
            router: '',    // 路由
            searchData: "",     // 搜索框传值
            routerTab: false,    // 路由切换控制器
            content: null    // 内容
         };
    }

    // 服务器端和客户端都只调用一次，在初始化渲染执行之前立刻调用。如果在这个方法内调用setState，
    // render() 将会感知到更新后的 state，将会执行仅一次，尽管 state 改变了。
    componentWillReceiveProps(nextProps,nextState) {
        // console.log('App componentWillReceiveProps');

    }

    // 真实的DOM被渲染出来后调用，在该方法中可通过this.getDOMNode()访问到真实的DOM元素、
    // 此时已经可以使用其他类库来操作这个DOM。
    // 在服务端中，该方法不会被调用。
    componentDidMount() {
        this.popstates();
        // console.log('App componentDidMount');
    }

    // 页面默认加载
    fetch() {
        let router = this.URLChange();
       this.setState({
            router: router,
            routerTab: true,
            content: router
        });
    }

    // 当前切换路由的转化
    URLChange() {
        let router = '';
        if(location.href.indexOf('#') > -1)
            router = location.href.split('#')[1];
            if(router.indexOf('?') > -1)
                router = router.split('?')[0];
        return router;    
    }

    // popstate 监听浏览器前进返回按钮
    popstates() {
        let me = this;
        if (window.history && window.history.pushState) {
            if(!me.state.routerTab)
                me.fetch();
            $(window).on('popstate', function () {
                let router = me.URLChange();
                me.setState({
                    router: router,
                    content: router
                });
            });
        }
    }

    // 搜索传参
    startSearch(data) {
        this.setState({
            searchData: data
        })
    }

    render() {
        let state = this.state;
        return (
            <div className="Hollis Blog">
                <Nav router={ state.router } />
                <div id="page-wrapper" className="gray-bg" style={{ paddingBottom: 100}}>
                    <Search startSearch={ this.startSearch.bind(this) }/>

                    <Content key={ state.router } routerURL={ state.content }  searchData={ state.searchData }/>

                    <ChatBox />
                    <div id="small-chat">

{/*                            <span className="badge badge-warning pull-right">5</span>
*/}
                        <a className="open-small-chat scroll-top" href="javascript:;">
                            <i className="fa fa-arrow-circle-up"></i>

                        </a>
                    </div>
                    <Footer />
                    
                </div>


            </div>

        );
    }
}
export default App;