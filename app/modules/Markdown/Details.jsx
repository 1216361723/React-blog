
import React, {Component} from 'react';

class Details extends Component{

	constructor(props) {
		super(props);
		this.state = {

		};

	}

	render() {

		return (
			<div className="well">
                <h3 className="m-t-lg">Markdown 介绍</h3>

                <div className="row diff-wrapper">
                    <div className="col-md-4">
                        <h4>什么是 Markdown </h4>

                        <div className="original">
                        	<p>
                        		Markdown是一种可以使用普通文本编辑器编写的标记语言，通过简单的标记语法，它可以使普通文本内容具有一定的格式。
                        	</p>
                        	<p>
                        		Markdown具有一系列衍生版本，用于扩展Markdown的功能（如表格、脚注、内嵌HTML等等），
                        		这些功能原初的Markdown尚不具备，它们能让Markdown转换成更多的格式，例如LaTeX，Docbook。
                        		Markdown增强版中比较有名的有Markdown Extra、MultiMarkdown、 Maruku等。这些衍生版本要么
                        		基于工具，如Pandoc；要么基于网站，如GitHub和Wikipedia，在语法上基本兼容，但在一些语法和
                        		渲染效果上有改动。
                        	</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h4>Markdown 的语法 </h4>

                        <div className="changed">
                        	<p>
                        		<a href="https://www.zybuluo.com/mdeditor#fn:latex" target="_bank">Markdown 简明语法手册1</a>
                        	</p>
                        	<p>
                        		<a href="https://www.zybuluo.com/mdeditor#fn:latex" target="_bank">Markdown 简明语法手册2</a>
                        	</p>
                        	<p>
                        		<a href="https://www.zybuluo.com/mdeditor#fn:latex" target="_bank">Markdown 简明语法手册3</a>
                        	</p>
                        </div>
                    </div>
                </div>
            </div>
		)
	}
}

export default Details;