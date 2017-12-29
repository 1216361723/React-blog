/* Markdown 格式文本 */
import React, {Component} from 'react';
import { MarkdownPreview } from 'react-marked-markdown';
import LiveMarkdownTextarea from "./LiveMarkdownTextarea.jsx";
import Details from "./Details.jsx";

class Markdown extends Component{

	constructor(props) {
		super(props);
		this.state = {
			visible: false
		};
	}

	handleClick() {

		this.setState({
			visible: !this.state.visible
		})
	}

	hideModel() {
		this.setState({
			visible: false
		})
	}

	render() {
		let content = "I am using __markdown__. html js java \n\n ```js \n var a = 1;\n var b = 2; \n var c = 3; ``` \n 21312312 \n ### 123 \n\n asdasd a__12312__";
		return (
		  <div className="box box-row markdown-box">

            <div className="row wrapper page-heading" style={{marginLeft: 0, marginRight: 0 }}>
                <div className="col-lg-10">
                    <h2>Markdown</h2>
                    <ol className="breadcrumb">
                        <li>
                            <a href="#">Home</a>
                        </li>
                        <li className="active">
                            <strong>Markdown</strong>
                        </li>
                    
                    </ol>
                </div>
                <div className="col-lg-2">

                </div>
            </div>
		  	<hr />

            <div className="ibox padding-20">
		  	<a className="hahah" href="javascript:;" onClick={ this.handleClick.bind(this) }>Markdown 使用说明</a>

            { this.state.visible ? <Details /> : "" }
			  {/* markedown 输入框编辑器 */}
			  	<hr />
			  	<h3> markdown 编辑器 </h3>
	    		<LiveMarkdownTextarea
				  placeholder="输入您想输入的内容..."
				  className="md-editor row"
				  inputClassName="markdown col-md-6"
				  previewClassName="markdown-view col-md-6"
				/>
            </div>
	
		  </div>
		);
	}
}

export default Markdown;