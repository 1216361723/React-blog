
//Greeter,js
import React, {Component} from 'react';
import  '../css/footer.css';


class Footer extends Component{

	constructor(props) {
		super(props);
		this.state = { data: {} };
	}

	
    // 真实的DOM被渲染出来后调用，在该方法中可通过this.getDOMNode()访问到真实的DOM元素、
    // 此时已经可以使用其他类库来操作这个DOM。
    // 在服务端中，该方法不会被调用。
    componentDidMount() {

        this.fetch();
    }
	
	fetch () {
			Utils.ajaxData({
			url: baseURL + 'footer.json',
			method: 'get',
			dataType: 'json',
			callback: (result) => {
				if(result.code === 200){
					this.setState({
						data: result.data,
						version: result.data.version,
						describeUrl: result.data.describeUrl,
						describe: result.data.describe,
					});
				}
			}
		});
	}

	render() {
		let state = this.state;

		return (
			<footer className="bs-docs-footer">
				<div className="container">
					<ul className="bs-docs-footer-links">
					  <li><a target="_blank" href="https://github.com/1216361723">GitHub 仓库</a></li>
					  <li><a href=".#">实例</a></li>
					  <li><a href="#">联系博主</a></li>
					  <li><a href="#">关于</a></li>
					</ul>
					<p><a rel="license" href={state.describeUrl} target="_blank">{state.describe}</a></p>
					<p><a href="http://www.miibeian.gov.cn">{state.version}</a></p>
				</div>
			</footer>
		);
	}
}

export default Footer;