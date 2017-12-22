//app.js
import React, {Component} from 'react';
//import Content from './content/index.jsx';    // Content
import Nav from '../common/Nav.jsx';    // nav
import Footer from '../common/footer.jsx';    // Footer
import Search from '../common/Search.jsx';    // Footer

class App extends Component{

    constructor(props) {
        super(props);
        this.state = { 
            router: '',    // 路由
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
                // $("body").toggleClass("mini-navbar");    // 改变路由 隐藏导航条
                me.setState({
                    router: router,
                    content: router
                });
            });
        }
    }

    // 返回顶部
    handleClick() {
        $("html,body").animate({scrollTop:0},1000);
    }

    render() {
        let state = this.state;
        return (
            <div className="Hollis Blog">
                <Nav router={ state.router } />
                <div id="page-wrapper" className="gray-bg" style={{ paddingBottom: 100}}>
                    <Search />

                    <Content key={ state.router } routerURL={ state.content } />
                        <div id="small-chat">

{/*                            <span className="badge badge-warning pull-right">5</span>
*/}
                            <a className="open-small-chat" href="javascript:;" onClick={ this.handleClick.bind(this) } >
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