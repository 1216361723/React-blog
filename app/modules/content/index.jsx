/* 内容主页面 */
import React, {Component} from 'react';
import Frame from '../frame/stores/route.jsx';

class Content extends Component{

	constructor(props) {
		super(props);
		this.state = { 
			data: {} ,
			content: '',
			Link: ''
		};
	}

	componentDidMount() {
		if(this.props.routerURL){
	    	this.fetch(this.props.routerURL);
		}
	}

    // 服务器端和客户端都只调用一次，在初始化渲染执行之前立刻调用。如果在这个方法内调用setState，
    // render() 将会感知到更新后的 state，将会执行仅一次，尽管 state 改变了。
    componentWillReceiveProps(nextProps,nextState) {
    	if(this.props.routerURL)
        	this.fetch(nextProps.routerURL);
    }

	fetch(router) {
    	let routerData = Frame[router];
		this.setState({
    		content: routerData,
    		Link: router
    	});
	}

	render() {
		let state = this.state;
		let Content = state.content;
		let AboutMe = Frame["AboutMe"];
		return (
			<div className="wrapper wrapper-content animated fadeInRight">
				{ 
					Content ? <Content routers={ this.props.routerURL } 
						ref={ state.router } searchData={ this.props.searchData } /> : <AboutMe routers={ this.props.routerURL } ref="AboutMe" searchData={ this.props.searchData } />
				}
			</div>

		);
	}
}

export default Content;