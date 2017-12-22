"use strict";
import React, {Component} from 'react';

class Nav extends Component{

	constructor(props) {
		super(props);
		this.state = {
			nav: [],    // 导航条
			text: '',    // 路由
			user:{}    // 用户

		};
	}
    componentWillReceiveProps(nextProps,nextState) {
        this.setState({
        	text: nextProps.router
        })
    }
    // 真实的DOM被渲染出来后调用，在该方法中可通过this.getDOMNode()访问到真实的DOM元素、
    // 此时已经可以使用其他类库来操作这个DOM。
    // 在服务端中，该方法不会被调用。
    componentDidMount() {
        this.setState({
        	user: localStorage.userInfo ? JSON.parse(localStorage.userInfo) : {}
        });
        this.fetch();
    }

    // 导航接口
	fetch() {
		let URL = '';
		let userInfo = localStorage.userInfo ? JSON.parse(localStorage.userInfo) : {};
		if(userInfo.login){
			if(userInfo.userName =='Hollis')
				URL = 'nav.json';
			else if(userInfo.userName)
				URL = 'user1.json';
			else 
				URL = 'user0.json';	
		}else {
			URL = 'user0.json';
		}
		Utils.ajaxData({
			url: baseURL + URL,
			method: 'get',
			dataType: 'json',
			callback: (result) => {
				if(result.code === 200){
					this.setState({nav: result.data});
				}
			}
		});
	}


	// 菜单栏点击事件
	handleNavChange () {
		$("body").removeClass("mini-navbar");
	}

	// 菜单栏点击事件
	handleUrl (data) {
		$('.Nav-'+data.id).toggleClass('active').siblings().removeClass('active');
		$('.Nav-'+data.id).find('.nav-second-level').toggleClass('in');
		$('.Nav-'+data.id).siblings().find('.nav-second-level').removeClass('in');
	}

	// 导航条循环
	navMap(data, type) {
		let me = this;
		let list = [];
		data.map((item) => {
			list.push(
				(item.list && item.list[0]) ?
				  <li className={ me.activeSHow(item, "") + " Nav-" + item.id } key={item.id} onClick={ this.handleUrl.bind(this,item) }>
                    <a href={item.routerName}>
                    	<i className={ item.icon}></i> 
                    	<span className="nav-label">{ item.name }</span> 
                    	<span className="fa arrow"></span>
                	</a>
                    <ul className={ (me.activeSHow(item, "") == "active" ? "in": "") + " nav nav-second-level collapse"} name={ item.name }>
                    	{me.navMap(item.list, 2)}
                    </ul>
                </li>
                :
                <li className={ me.activeSHow(item.routerName) ? "active": "" } key={item.id} onClick={me.handleNavChange.bind(this, item.routerName ) }>
                    {
                    	type ? <a className="nav-second-level-a" href={item.routerName} onClick={ me.handleNavChange.bind(this) }>{ item.name }</a>
                    	:
                    	<a href={item.routerName}>
	                    	<i className={ item.icon}></i> 
	                    	<span className="nav-label">{ item.name }</span>
            			</a>
                    }
                    
                </li>
			)
		});
		return list;
	}

	// 添加active给当前页面1
	activeSHow(data,type) {
		let URL = this.state.text;
		if( URL === "" && data === "#" ){
			return "active";
		}else if(typeof(data) != "string") {
			data.list.map( ( item ) => {
				if(item.routerName === "#" + URL){
					type = "active"; 
				}
			})
			return type;
		}else if( URL != "" && data.indexOf(URL) >=0 ) {
			return "active";
		}else {
			return "";
		}
	}

	// 添加active给第二类列表；
	activeSHow2(data) {
		let type = false;
		let URL = this.state.text;
		data.list.map( ( item ) => {
			if(item.routerName === "#" + URL){
				return type = true; 
			}
		})
		console.log(type)
		return type;
	}

	// 退出登录
	handleLogOut() {
		Utils.ajaxData({
			url: baseURL + 'logOut.json',
			method: 'get',
			dataType: 'json',
			callback: (result) => {
				layer.msg(result.msg)
				let oldUser = this.state.user;
				oldUser.login = false;
            	oldUser.userHead = "http://img.yangser.cn/kawayi.gif";    // 默认头像
                localStorage.setItem('userInfo', JSON.stringify(oldUser));    // 本地缓存数据
				location.href = "index.html";

			}
		});
	}

	render() {
		let state = this.state;
		let me = this;
		return (
			<nav className="navbar-default navbar-static-side" role="navigation">
		        <div className="sidebar-collapse">
		            <ul className="nav metismenu" id="side-menu">
		                <li className="nav-header">
		                    <div className="dropdown profile-element"> <span>
					        	 	<img width={ 48 } className="img-circle" height={ 48 } src={ state.user.userHead } title={ state.user.userName } alt={ state.user.userName }/>
		                             </span>
		                        <a data-toggle="dropdown" className="dropdown-toggle" href="javascript:;">
		                            <span className="clear"> <span className="block m-t-xs"> <strong className="font-bold">Hollis</strong>
		                             </span> <span className="text-muted text-xs block">个人中心 <b className="caret"></b></span> </span> </a>
		                        <ul className="dropdown-menu animated fadeInRight m-t-xs">
		                            <li><a href="#Myself">项目</a></li>
		                            <li><a href="javascript:;">我的收藏链接</a></li>
		                            <li><a href="javascript:;">联系方式</a></li>
		                            <li className="divider"></li>
		                            <li><a href="javascript:;" onClick={this.handleLogOut.bind(this)}> 退 出 </a></li>
		                        </ul>
		                    </div>
		                    <div className="logo-element">
		                        Hollis blog
		                    </div>
		                </li>
			        	{state.nav[0] ? 
		        			this.navMap(state.nav)
		    			: ''}
		            </ul>
		        </div>
	    	</nav>
		);
	}
}

export default Nav;