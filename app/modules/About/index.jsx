/* 关于我 */

import React, {Component} from 'react';

class AboutMe extends Component{

	constructor(props) {
	super(props);
	this.state = {  };
	}

	componentDidMount(){
        console.log('AboutMe componentDidMount');
		
	}


  /**
     * @api {GET} /bapi/contactme.json 联系我们
     * @apiGroup  ContactMe
     * @apiVersion 0.0.1
     * @apiDescription 联系我们接口
     * @apiSuccess (200) {int} code 200 代表无错误 50x代表有错误
     * @apiSuccess (200) {String} msg 信息
     * @apiSuccess (200) {Object} data 数据
     * @apiSuccess (200) {String} name 联系人
     * @apiSuccess (200) {String} phone 联系电话
     * @apiSuccess (200) {String} email 邮箱地址
     * @apiSuccess (200) {String} QQ QQ
     * @apiSuccess (200) {String} gitHub github 账号
     * @apiSuccess (200) {String} xx xx账号
     * @apiSuccessExample {json} 返回样例:
     * {
     *  "code":"200",
     *  "data":{
     *      "name": "Hollis",
     *      "phone": "184****5637",
     *      "email": "HollisY@163.com",
     *      "QQ": "1216361723",
     *      "gitHub": "Hollis",
     *  },
     *  "msg":"登录成功！"
     * }
     * @apiError (Error 4xx) 404 400报错
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 请求错误
     *     {
     *       "error": err
     *     }
     */

	fetch() {

	}


  handleClick(data) {

    console.log(data);
  }

	render() {

		return (<div className="box  box-row">
        <div className="widget-head-color-box navy-bg p-lg text-center">
          <div className="m-b-md">
            <h2 className="font-bold no-margins">
                Hollis
            </h2>
            <small>Web 前端开发 </small>
          </div>
          <img src="http://img.yangser.cn/kawayi.gif" className="img-circle circle-border m-b-md" alt="profile" />
          <div>
              <span>学习 100+</span> |
              <span>工作 100+</span> |
              <span>生活 100+</span>
          </div>
        </div>
        <div className="widget-text-box">
          <h4 className="media-heading">Hollis</h4>
          <p>人生没有激情，和咸鱼有什么区别.</p>
          <div className="text-right">
              <a className="btn btn-xs btn-white"><i className="fa fa-thumbs-up"></i> Like </a>
              <a className="btn btn-xs btn-primary"><i className="fa fa-heart"></i> Love</a>
          </div>
        </div> 

        <div className="container-full ">
          <div id="vertical-timeline" className="vertical-container dark-timeline center-orientation">
            <div className="vertical-timeline-block">
                <div className="vertical-timeline-icon navy-bg">
                    <i className="fa fa-briefcase"></i>
                </div>

                <div className="vertical-timeline-content">
                  <h2>受教</h2>
                  <p>
                    计算机专业出身，2015年开始步入前端工作，在公司任职前端，实战3年经验。
                  </p>
                  <p>
                    受学校专业老师/辅导老师 <strong className="text-success">牟启春老师</strong> 经验指导 ;
                  </p>
                  <p>
                    受曾腾讯大牛 <strong className="text-success">韩翔经理</strong> 半年的经验指导；
                  </p>
                  <p>
                    与善林财富架构师 <strong className="text-success">谢强架构师</strong> 一起探讨各种问题。
                  </p>
                </div>
            </div>

            <div className="vertical-timeline-block">
                <div className="vertical-timeline-icon blue-bg">
                    <i className="fa fa-file-text"></i>
                </div>

                <div className="vertical-timeline-content">

                  <h2>工作经验</h2>
                  <p>
                    2015 在美诺教育实习半年，因此机缘进入 <strong className="text-success">成都码云网络科技有限公司</strong> 担任PHP前端至2017-3月底。
                  </p>
                  <p>
                    2017-4月底 进入成都维迪恩网络科技公司，5月外派到上海 <strong className="text-success">善林财富</strong> 担任java前端工程师至今。
                  </p>
                </div>
            </div>

            <div className="vertical-timeline-block">
                <div className="vertical-timeline-icon lazur-bg">
                    <i className="fa fa-coffee"></i>
                </div>

                <div className="vertical-timeline-content">
                  <h2 onClick={ this.handleClick.bind(this, "专业能力") }>专业能力 <i className="fa fa-hand-o-up"></i></h2>
                  <p>
                    <strong className="text-success">React</strong> 使用年限 2年。
                  </p>
                  <p>
                    使用年限 1年。
                  </p>
                  <p>
                    <strong className="text-success">Ajax</strong> 学习年限 3年。
                  </p>
                  <p>
                    对后台数据处理 2年。
                  </p>
                  <p>
                    <strong className="text-success">BootStrap</strong> 使用年限 3年。
                  </p>
                  <p>
                    <strong className="text-success">JQuery</strong> 使用年限 4年。
                  </p>
                  <p>
                    <strong className="text-success">Chart/Echart/morris</strong> 等 使用年限 2年。
                  </p>
                  <p>
                    <strong className="text-success">Webuploader/Uploader</strong> 等上传工具 使用年限 2年。
                  </p>
                  <p>
                    文本编辑工具：<strong className="text-success">Ueditor</strong> 使用年限 1年。
                  </p>
                  <p>
                    <strong className="text-success">百度地图</strong> 使用年限 1.5年。
                  </p>
                  <p>
                    <strong className="text-success">GIT</strong> 使用年限 2年。
                  </p>
                  <p>
                    <strong className="text-success">SVN</strong> 使用年限 2年。
                  </p>

                </div>
            </div>

            <div className="vertical-timeline-block">
                <div className="vertical-timeline-icon yellow-bg">
                    <i className="fa fa-phone"></i>
                </div>

                <div className="vertical-timeline-content">
                  <h2>架构能力</h2>
                  <p>
                    能够独立根据需求文档，UI效果图架构一个前端项目。
                  </p>
                  <p>
                    <strong className="text-success">nginx</strong> 使用，<strong className="text-success">nginx</strong> 系统上一般安全防护配置详解，nginx规则配置等能力。
                  </p>
                  <p>
                    <strong className="text-success">Linux</strong> 安装 <strong className="text-success">MariaDB</strong>,新建数据库。
                  </p>
                  <p>
                    <strong className="text-success">Node</strong> 使用 一般开发用到的 <strong className="text-success">Node</strong> 的功能，都能随心所欲。
                  </p>
                  <p>
                    <strong className="text-success">Webpack/Gulp</strong>  打包工具的使用，配置，优化性能。
                  </p>
                </div>
            </div>
            <div className="vertical-timeline-block">
                <div className="vertical-timeline-icon navy-bg">
                    <i className="fa fa-comments"></i>
                </div>

                <div className="vertical-timeline-content">
                  <h2>项目经验</h2>

                  <h3>美诺教育内部管理系统和学习类的APP</h3>
                  <p>
                     在美诺教育，项目内容对大数据的统计展示，H5 的 APP 。
                  </p>

                  <h3> <a href="http://www.ease-chinese.cn/" target="_back"> ECC易文中 </a></h3>
                  <p>Web sites still in their infancy. Vari</p>
                  
                  <h3> <a href="http://www.chongmadao.me/" target="_back"> 虫马道 </a></h3>
                  <p>Web sites still in their infancy. Vari</p>
                  
                  <h3> <a href="javascript:;"> Ubao </a></h3>
                  <p>Web sites still in their infancy. Vari</p>

                  <h3> <a href="javascript:;"> 龙久 艾幸福APP </a></h3>
                  <p>Web sites still in their infancy. Vari</p>

                  <h3> <a href="javascript:;"> 药答 </a></h3>
                  <p>Web sites still in their infancy. Vari</p>

                  <h3> <a href="javascript:;"> 中赢智慧餐厅 </a></h3>
                  <p>Web sites still in their infancy. Vari</p>

                  <h3> <a href="javascript:;"> 金融科技委员会官网以及后台管理 </a></h3>
                  <p>Web sites still in their infancy. Vari</p>
                  
                  <h3> <a href="javascript:;"> 金融后台管理系统 </a></h3>
                  <p>Web sites still in their infancy. Vari</p>

                  <h3> <a href="javascript:;"> 商户平台管理系统 </a></h3>
                  <p>Web sites still in their infancy. Vari</p>

                </div>
            </div>

          </div>


























           <hr/><h2></h2>
          <p></p>
          <h2></h2>
          <p></p>
          <h2></h2>
          <p></p>
        </div>   

                 
     </div>              

		);
	}
}

export default AboutMe;