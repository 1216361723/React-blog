// 搜索页面，消息页面
"use strict";
import React, {Component} from 'react';
import Msg from './Message.jsx';    // 信息弹框
import Infor from './Information.jsx';    // 消息弹框


class Search extends Component{

	constructor(props) {
		super(props);
		this.state = {
			message: '',    // message 
			information: '',    // information 
			user:{}    // 用户

		};
	}

    // 导航点击事件
    handleClick() {
        //$('body').toggleClass('mini-navbar');
    }

    // 消息/信息的条数获取
    getLength(data) {
    	this.setState(data);
    }

	render() {
		let state = this.state;
		let me = this;
		return (
		 <nav className="navbar navbar-static-top" role="navigation" style={{ marginBottom: 0 }}>
                <div className="navbar-header">
                    <a className="navbar-minimalize minimalize-styl-2 btn btn-primary " href="javascript:;" onClick={ this.handleClick.bind(this) }>
                    <i className="fa fa-bars"></i> 
                    </a>
                    <form role="search" className="navbar-form-custom" action="search_results.html">
                        <div className="form-group">
                            <input type="text" placeholder="Search for something..." className="form-control" name="top-search" id="top-search" />
                        </div>
                    </form>
                </div>
                <ul className="nav navbar-top-links navbar-right">
                    <li>
                        <span className="m-r-sm text-muted welcome-message">Welcome to Hollis bolg.</span>
                    </li>
                    <li className="dropdown">
                        <a className="dropdown-toggle count-info" data-toggle="dropdown" href="javascript:;">
                            <i className="fa fa-envelope"></i>  <span className="label label-warning">{ state.message }</span>
                        </a>
                        <Msg getMessage={ me.getLength.bind(this) } />
                    </li>
                    <li className="dropdown">
                        <a className="dropdown-toggle count-info" data-toggle="dropdown" href="javascript:;">
                            <i className="fa fa-bell"></i>  <span className="label label-primary">{ state.information }</span>
                        </a>
                        <Infor getInfor={ me.getLength.bind(this) } />
                    </li>
                    <li>
                        <a href="login.html">
                            <i className="fa fa-sign-out"></i> 退 出
                        </a>
                    </li>
                </ul>
            </nav>
		);
	}
}

export default Search;