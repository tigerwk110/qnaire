(function () {
	var app = angular.module('questionnaire', []);

	//字符过滤函数
	function filter(value) {
		if (value == null || value == undefined || value == "") {
			return false;
		} 

		value = value.replace(/{*/g, "");
		value = value.replace(/}*/g, "");
		value = value.replace(/\s+?/g, "");

		return value;
	}

	//获取字符串长度函数
	function getByteLen(val) {
	  var len = 0;
	  for (var i = 0; i < val.length; i++) {
	    var a = val.charAt(i);
	    if (a.match(/[^\x00-\xff]/ig) != null) {
	      len += 2;
	    }
	    else {
	      len += 1;
	    }
	  }
	  return len;
    }

	//引入头部模板
	app.directive('questionnaireHeader', function () {
		return {
			restrict: 'E',
			templateUrl: 'layout/header.html',
			replace: true
		};
	});

	//引入底部模板
	app.directive('questionnaireFooter', function () {
		return {
			restrict: 'E',
			templateUrl: 'layout/footer.html',
			replace: true
		};
	});

	app.controller('FooterController', function () {
		this.currentYear = new Date().getFullYear();
	});
	//底部模板引入结束

	//container控制器

	//进度控制器(问卷调研、问卷编辑)
	var completeState = [true, false];

	var stepsCompleteState = [true, false, false];

	app.controller('ContainerController', function () {
		this.steps = [true, false, false];

		this.title = "我是默认的title";
		this.tip = "欢迎参加调查！答卷数据仅用于统计分析，请放心填写。题目选项无对错之分，按照实际情况选择即可。感谢您的帮助！";

		this.nextStep = function (i) {
			//已经创建了问卷标题，所以编辑问卷、收集设置都激活
			completeState[1] = true;
			stepsCompleteState[1] = true;

			this.steps[i - 1] = false;

			this.steps[i] = true;
			this.steps[i + 1] = true;

			this.title = document.getElementsByClassName("txt")[0].value;
			
			//去除container的padding以免下一个标签无法居中
			document.getElementsByClassName("container")[0].id = "container-nopadding";
		};

		//修改标题
		this.alterTitle = function () {
			var title = document.getElementsByClassName("questionnaire-title")[0].innerText;

			title = filter(title);

			var length = getByteLen(title);

			if (length < 0 || length > 34) {
				document.getElementsByClassName("questionnaire-title")[0].innerText = "标题不得超过17个字";
				this.title = "标题不得超过17个字";
			} else {
				document.getElementsByClassName("questionnaire-title")[0].innerText = title;
				this.title = title;
			}	
		};

		//修改提示
		this.alterTip = function () {
			var tip = document.getElementsByClassName("questionnaire-tip")[0].innerText;

			tip = filter(tip);

			var length = getByteLen(tip);

			if (length < 0 || length > 120) {
				document.getElementsByClassName("questionnaire-tip")[0].innerText = "提示不得超过17个字";
				this.tip = "提示不得超过50个字";
			} else {
				document.getElementsByClassName("questionnaire-tip")[0].innerText = tip;
				this.tip = tip;
			}	
		}

		//已经保存了问卷，相应激活步骤3
		this.completeAll = function () {
			stepsCompleteState[2] = true;
		}
	});

	app.controller('StepController', function () {
		this.completeState = completeState;
	});

	//设计模块
	app.controller('DesignController', function ($scope, $compile) {
		this.completeState = stepsCompleteState; //阶段

		this.questionTypes = [
			{
				icon: '单选题.svg',
				desc: '单选题'
			},

			{
				icon: '多选题.svg',
				desc: '多选题'
			},

			{
				icon: '单行填空题.svg',
				desc: '单行填空题'
			},

			{
				icon: '多行填空题.svg',
				desc: '多行填空题'
			},

			{
				icon: '矩阵单选.svg',
				desc: '矩阵单选题'
			},

			{
				icon: '矩阵复选题.svg',
				desc: '矩阵多选题'
			},

			{
				icon: '描述.svg',
				desc: '描述说明'
			},
		];

		this.commonQuestions = [
			{
				icon: '性别.svg',
				desc: '您的性别'
			},

			{
				icon: '年龄.svg',
				desc: '您的年龄'
			},

			{
				icon: '职业.svg',
				desc: '您的职业'
			},

			{
				icon: '年限.svg',
				desc: '工作年限'
			},

			{
				icon: '教育.svg',
				desc: '教育程度'
			},

			{
				icon: '婚姻.svg',
				desc: '婚姻状况'
			}
		];	

		//列表
		this.list = 0;

		//展示问题列表
		this.selectList = function (i) {
			this.list = this.list === i ? 0 : i;
		}

		//是否选中
		this.isSelected = function (i) {
			return this.list === i;
		};

		//添加问题到问卷
		this.count = 0;

		this.addQuestion = function (type) {
			var el;

			switch(type) {
				case "单选题": 

				this.count++;

				var html = `<div class='sub-questions' id="sub-questions-${this.count}">
								<div class="sub-questions-title">
									Q${this.count}
									<div id="sub-questions-title-${this.count}" contenteditable="true">单选题</div>
								</div>

								<div class="sub-questions-body" id="sub-questions-body-${this.count}">
									<div class="sub-questions-question">
										<input type="radio" name="q${this.count}">
										<div class="sub-questions-eidt-question" contenteditable="true">选项</div>
									</div>

									<div class="sub-questions-question">
										<input type="radio" name="q${this.count}">
										<div contenteditable="true" class="sub-questions-eidt-question">选项</div>
									</div>
								</div>

								<div class="sub-questions-footer">
									<i class="pull-left"><img src="img/add.svg" alt="" ng-click="design.addSubQuestion(${this.count}, 0)"></i>
									<i class="pull-right"><img src="img/remove.svg" alt="" ng-click="design.removeSubQuestion(${this.count})"></i>
								</div>
							</div>;`

				el = $compile(html)($scope);
							   
				break;

				case "多选题": 
				this.count++;

				var html = `<div class='sub-questions' id="sub-questions-${this.count}">
								<div class="sub-questions-title">
									Q${this.count}
									<div contenteditable="true">多选题</div>
								</div>

								<div class="sub-questions-body" id="sub-questions-body-${this.count}">
									<div class="sub-questions-question">
										<input type="checkbox" name="q${this.count}">
										<div class="sub-questions-eidt-question" contenteditable="true">选项</div>
									</div>

									<div class="sub-questions-question">
										<input type="checkbox" name="q${this.count}">
										<div contenteditable="true" class="sub-questions-eidt-question">选项</div>
									</div>
								</div>

								<div class="sub-questions-footer">
									<i class="pull-left"><img src="img/add.svg" alt="" ng-click="design.addSubQuestion(${this.count}, 1)"></i>
									<i class="pull-right"><img src="img/remove.svg" alt="" ng-click="design.removeSubQuestion(${this.count})"></i>
								</div>
							</div>`;

				el = $compile(html)($scope);
							   
				break;

				case "单行填空题": 
				this.count++;

				var html = `<div class='sub-questions' id="sub-questions-${this.count}">
								<div class="sub-questions-title">
									Q${this.count}
									<div contenteditable="true">单行填空题</div>
								</div>

								<input type="text" name="q${this.count}" class="txt  txt-primary">

								<div class="sub-questions-footer">
									<i class="pull-right"><img src="img/remove.svg" alt="" ng-click="design.removeSubQuestion(${this.count})"></i>
								</div>
							</div>
							`;

				el = $compile(html)($scope);
							   
				break;

				case "多行填空题": 
				this.count++;

				var html = `<div class='sub-questions' id="sub-questions-${this.count}">
								<div class="sub-questions-title">
									Q${this.count}
									<div contenteditable="true">多行填空题</div>
								</div>

							
								<textarea name="" id="" cols="60" rows="5"></textarea>

								<div class="sub-questions-footer">
									<i class="pull-right"><img src="img/remove.svg" alt="" ng-click="design.removeSubQuestion(${this.count})"></i>
								</div>
							</div>
							`;

				el = $compile(html)($scope);
							   
				break;


				case "矩阵单选题": 
				this.count++;

				var html = `<div class='sub-questions' id="sub-questions-${this.count}">
								<div class="sub-questions-title">
									Q${this.count}
									<div contenteditable="true">矩阵单选题</div>
								</div>

							
								<div class="matrix">
									<div class="matrix-addBtn-right">
										<i class="pull-left"><img src="img/add.svg" alt="" ng-click="design.addColumn(0, ${this.count})"></i>
									</div>

									<table border=1 cellpadding="0" cellspacing="0" id="table-${this.count}">
										<tr>
											<td contenteditable="true"></td>
											<td contenteditable="true">选项1</td>
											<td contenteditable="true">选项2</td>
										</tr>
										<tr>
											<td contenteditable="true">行1</td>
											<td>
												<input type="radio">
											</td>
											<td>
												<input type="radio">
											</td>
										</tr>
										<tr>
											<td contenteditable="true">行2</td>
											<td>
												<input type="radio">
											</td>
											<td>
												<input type="radio">
											</td>
										</tr>
									</table>


									<div class="sub-questions-footer">
										<i class="pull-left"><img src="img/add.svg" alt="" ng-click="design.addRow(0, ${this.count})"></i>
										<i class="pull-right"><img src="img/remove.svg" alt="" ng-click="design.removeSubQuestion(${this.count})"></i>
									</div>
								</div>
							</div>
							`;

				el = $compile(html)($scope);
							   
				break;


				case "矩阵多选题": 
				this.count++;

				var html = `<div class='sub-questions' id="sub-questions-${this.count}">
								<div class="sub-questions-title">
									Q${this.count}
									<div contenteditable="true">矩阵单选题</div>
								</div>

							
								<div class="matrix">
									<div class="matrix-addBtn-right">
										<i class="pull-left"><img src="img/add.svg" alt="" ng-click="design.addColumn(1, ${this.count})"></i>
									</div>

									<table border=1 cellpadding="0" cellspacing="0" id="table-${this.count}">
										<tr>
											<td contenteditable="true"></td>
											<td contenteditable="true">选项1</td>
											<td contenteditable="true">选项2</td>
										</tr>
										<tr>
											<td contenteditable="true">行1</td>
											<td>
												<input type="checkbox">
											</td>
											<td>
												<input type="checkbox">
											</td>
										</tr>
										<tr>
											<td contenteditable="true">行2</td>
											<td>
												<input type="checkbox">
											</td>
											<td>
												<input type="checkbox">
											</td>
										</tr>
									</table>


									<div class="sub-questions-footer">
										<i class="pull-left"><img src="img/add.svg" alt="" ng-click="design.addRow(1, ${this.count})"></i>
										<i class="pull-right"><img src="img/remove.svg" alt="" ng-click="design.removeSubQuestion(${this.count})"></i>
									</div>
								</div>
							</div>
							`;

				el = $compile(html)($scope);
							   
				break;

				case "描述说明": 
				this.count++;

				var html = `<div class='sub-questions' id="sub-questions-${this.count}">
								<div class="sub-questions-title">
									Q${this.count}
									<div contenteditable="true">请在此写下您对此次调查问卷的其他想法</div>
								</div>

								<div contenteditable="true" class="desc"></div>

								<div class="sub-questions-footer">
									<i class="pull-right"><img src="img/remove.svg" alt="" ng-click="design.removeSubQuestion(${this.count})"></i>
								</div>
								
							</div>
							`;

				el = $compile(html)($scope);
							   
				break;

				case "您的性别": 

				this.count++;

				var html = `<div class='sub-questions' id="sub-questions-${this.count}">
								<div class="sub-questions-title">
									Q${this.count}
									<div id="sub-questions-title-${this.count}" contenteditable="true">您的性别</div>
								</div>

								<div class="sub-questions-body" id="sub-questions-body-${this.count}">
									<div class="sub-questions-question">
										<input type="radio" name="q${this.count}">
										<div class="sub-questions-eidt-question" contenteditable="true">男</div>
									</div>

									<div class="sub-questions-question">
										<input type="radio" name="q${this.count}">
										<div contenteditable="true" class="sub-questions-eidt-question">女</div>
									</div>
								</div>

								<div class="sub-questions-footer">
									<i class="pull-left"><img src="img/add.svg" alt="" ng-click="design.addSubQuestion(${this.count}, 0)"></i>
									<i class="pull-right"><img src="img/remove.svg" alt="" ng-click="design.removeSubQuestion(${this.count})"></i>
								</div>
							</div>;`

				el = $compile(html)($scope);
							   
				break;


				case "您的年龄": 

				this.count++;

				var html = `<div class='sub-questions' id="sub-questions-${this.count}">
								<div class="sub-questions-title">
									Q${this.count}
									<div id="sub-questions-title-${this.count}" contenteditable="true">您的年龄</div>
								</div>

								<div class="sub-questions-body" id="sub-questions-body-${this.count}">
									<div class="sub-questions-question">
										<input type="radio" name="q${this.count}">
										<div class="sub-questions-eidt-question" contenteditable="true">14岁及以下</div>
									</div>

									<div class="sub-questions-question">
										<input type="radio" name="q${this.count}">
										<div class="sub-questions-eidt-question" contenteditable="true">15-20</div>
									</div>

									<div class="sub-questions-question">
										<input type="radio" name="q${this.count}">
										<div class="sub-questions-eidt-question" contenteditable="true">21-30</div>
									</div>

									<div class="sub-questions-question">
										<input type="radio" name="q${this.count}">
										<div class="sub-questions-eidt-question" contenteditable="true">31-40</div>
									</div>

									<div class="sub-questions-question">
										<input type="radio" name="q${this.count}">
										<div class="sub-questions-eidt-question" contenteditable="true">50及以上</div>
									</div>
								</div>

								<div class="sub-questions-footer">
									<i class="pull-left"><img src="img/add.svg" alt="" ng-click="design.addSubQuestion(${this.count}, 0)"></i>
									<i class="pull-right"><img src="img/remove.svg" alt="" ng-click="design.removeSubQuestion(${this.count})"></i>
								</div>
							</div>;`

				el = $compile(html)($scope);
							   
				break;


				case "您的职业": 

				this.count++;

				var html = `<div class='sub-questions' id="sub-questions-${this.count}">
								<div class="sub-questions-title">
									Q${this.count}
									<div id="sub-questions-title-${this.count}" contenteditable="true">您的职业</div>
								</div>

								<div class="sub-questions-body" id="sub-questions-body-${this.count}">
									<div class="sub-questions-question">
										<input type="radio" name="q${this.count}">
										<div class="sub-questions-eidt-question" contenteditable="true">在校学生</div>
									</div>

									<div class="sub-questions-question">
										<input type="radio" name="q${this.count}">
										<div class="sub-questions-eidt-question" contenteditable="true">政府/机关干部/公务员</div>
									</div>

									<div class="sub-questions-question">
										<input type="radio" name="q${this.count}">
										<div class="sub-questions-eidt-question" contenteditable="true">企业管理者（包括基层及中高层管理者）</div>
									</div>

									<div class="sub-questions-question">
										<input type="radio" name="q${this.count}">
										<div class="sub-questions-eidt-question" contenteditable="true">普通职员（办公室/写字楼工作人员）</div>
									</div>

									<div class="sub-questions-question">
										<input type="radio" name="q${this.count}">
										<div class="sub-questions-eidt-question" contenteditable="true">商业服务业职工（如销售人员/商店职员/服务员等）</div>
									</div>

									<div class="sub-questions-question">
										<input type="radio" name="q${this.count}">
										<div class="sub-questions-eidt-question" contenteditable="true">个体经营者/承包商</div>
									</div>

									<div class="sub-questions-question">
										<input type="radio" name="q${this.count}">
										<div class="sub-questions-eidt-question" contenteditable="true">自由职业者</div>
									</div>

									<div class="sub-questions-question">
										<input type="radio" name="q${this.count}">
										<div class="sub-questions-eidt-question" contenteditable="true">退休</div>
									</div>

									<div class="sub-questions-question">
										<input type="radio" name="q${this.count}">
										<div class="sub-questions-eidt-question" contenteditable="true">暂无职业</div>
									</div>

									<div class="sub-questions-question">
										<input type="radio" name="q${this.count}">
										<div class="sub-questions-eidt-question" contenteditable="true">其他</div>
									</div>
								</div>

								<div class="sub-questions-footer">
									<i class="pull-left"><img src="img/add.svg" alt="" ng-click="design.addSubQuestion(${this.count}, 0)"></i>
									<i class="pull-right"><img src="img/remove.svg" alt="" ng-click="design.removeSubQuestion(${this.count})"></i>
								</div>
							</div>;`

				el = $compile(html)($scope);
							   
				break;


				case "工作年限": 

				this.count++;

				var html = `<div class='sub-questions' id="sub-questions-${this.count}">
								<div class="sub-questions-title">
									Q${this.count}
									<div id="sub-questions-title-${this.count}" contenteditable="true">工作年限</div>
								</div>

								<div class="sub-questions-body" id="sub-questions-body-${this.count}">
									<div class="sub-questions-question">
										<input type="radio" name="q${this.count}">
										<div class="sub-questions-eidt-question" contenteditable="true">1年及以下</div>
									</div>

									<div class="sub-questions-question">
										<input type="radio" name="q${this.count}">
										<div class="sub-questions-eidt-question" contenteditable="true">2-3年</div>
									</div>

									<div class="sub-questions-question">
										<input type="radio" name="q${this.count}">
										<div class="sub-questions-eidt-question" contenteditable="true">4-5年</div>
									</div>

									<div class="sub-questions-question">
										<input type="radio" name="q${this.count}">
										<div class="sub-questions-eidt-question" contenteditable="true">6-9年</div>
									</div>

									<div class="sub-questions-question">
										<input type="radio" name="q${this.count}">
										<div class="sub-questions-eidt-question" contenteditable="true">10年及以上</div>
									</div>
								</div>

								<div class="sub-questions-footer">
									<i class="pull-left"><img src="img/add.svg" alt="" ng-click="design.addSubQuestion(${this.count}, 0)"></i>
									<i class="pull-right"><img src="img/remove.svg" alt="" ng-click="design.removeSubQuestion(${this.count})"></i>
								</div>
							</div>;`

				el = $compile(html)($scope);
							   
				break;


				case "教育程度": 

				this.count++;

				var html = `<div class='sub-questions' id="sub-questions-${this.count}">
								<div class="sub-questions-title">
									Q${this.count}
									<div id="sub-questions-title-${this.count}" contenteditable="true">教育程度</div>
								</div>

								<div class="sub-questions-body" id="sub-questions-body-${this.count}">
									<div class="sub-questions-question">
										<input type="radio" name="q${this.count}">
										<div class="sub-questions-eidt-question" contenteditable="true">初中及以下</div>
									</div>

									<div class="sub-questions-question">
										<input type="radio" name="q${this.count}">
										<div class="sub-questions-eidt-question" contenteditable="true">高中</div>
									</div>

									<div class="sub-questions-question">
										<input type="radio" name="q${this.count}">
										<div class="sub-questions-eidt-question" contenteditable="true">本科</div>
									</div>

									<div class="sub-questions-question">
										<input type="radio" name="q${this.count}">
										<div class="sub-questions-eidt-question" contenteditable="true">硕士及以上</div>
									</div>
								</div>

								<div class="sub-questions-footer">
									<i class="pull-left"><img src="img/add.svg" alt="" ng-click="design.addSubQuestion(${this.count}, 0)"></i>
									<i class="pull-right"><img src="img/remove.svg" alt="" ng-click="design.removeSubQuestion(${this.count})"></i>
								</div>
							</div>;`

				el = $compile(html)($scope);
				
				break;

				case "婚姻状况": 

				this.count++;

				var html = `<div class='sub-questions' id="sub-questions-${this.count}">
								<div class="sub-questions-title">
									Q${this.count}
									<div id="sub-questions-title-${this.count}" contenteditable="true">婚姻状况</div>
								</div>

								<div class="sub-questions-body" id="sub-questions-body-${this.count}">
									<div class="sub-questions-question">
										<input type="radio" name="q${this.count}">
										<div class="sub-questions-eidt-question" contenteditable="true">已婚</div>
									</div>

									<div class="sub-questions-question">
										<input type="radio" name="q${this.count}">
										<div class="sub-questions-eidt-question" contenteditable="true">未婚</div>
									</div>

									<div class="sub-questions-question">
										<input type="radio" name="q${this.count}">
										<div class="sub-questions-eidt-question" contenteditable="true">其他</div>
									</div>
								</div>

								<div class="sub-questions-footer">
									<i class="pull-left"><img src="img/add.svg" alt="" ng-click="design.addSubQuestion(${this.count}, 0)"></i>
									<i class="pull-right"><img src="img/remove.svg" alt="" ng-click="design.removeSubQuestion(${this.count})"></i>
								</div>
							</div>;`

				el = $compile(html)($scope);
				
				break;			
			}

			$('#questions-container').append(el);
		} 

		// 添加问题的子问题
		this.addSubQuestion = function (index, type) {
			var objName = "#sub-questions-body-" + index; 

			var html;

			switch (type) {
				case 0:
					html = `
						<div class="sub-questions-question">
							<input type="radio" name="q${this.count}">
							<div contenteditable="true" class="sub-questions-eidt-question" ng-blur="design.editQuestion(${++this.k}, ${this.count})">选项</div>
						</div>
					`;
					break;

				case 1:
					html = `
						<div class="sub-questions-question">
							<input type="checkbox" name="q${this.count}">
							<div contenteditable="true" class="sub-questions-eidt-question" ng-blur="design.editQuestion(${++this.k}, ${this.count})">选项</div>
						</div>
					`;
					break;
			}
			

			var el = $compile(html)($scope);

			$(objName).append(el);
		}

		// 移除子问题
		this.removeSubQuestion = function (index) {
			var subObjId = "sub-questions-" + index;

			document.getElementById("questions-container").removeChild(document.getElementById(subObjId));
			
			--this.count;
		}


		//矩阵添加列
		this.addColumn = function (index, count) {
			var id = "table-" + count;

			var tableNode = document.getElementById(id);

			var parentNode = tableNode.getElementsByTagName('tr');

			var subObj;

			if (index > 0) {
				subObj = "<input type='checkbox'>";
			} else {
				subObj = "<input type='radio'>";
			}

			for (var i = 0; i < parentNode.length; i++) {

				var childEl = document.createElement("td");
				childEl.contenteditable = "true";
				
				if (i < 1) {
					childEl.innerHTML = "<div contenteditable='true' style='width: 100%; height: 100%'>新选项</div>";
				} else  {
					childEl.innerHTML = subObj;
				}

				parentNode[i].appendChild(childEl);
			}

		}

		//矩阵添加行
		this.addRow = function (index, count) {
			var id = "table-" + count;

			var parentNode = document.getElementById(id);

			var tdLength = parentNode.getElementsByTagName('tr')[0].getElementsByTagName('td').length;

			console.log("td: ", tdLength);

			var subObj;

			if (index > 0) {
				subObj = "<tr><td contenteditable=\"true\">新添加行</td>";

				for (var i = 1; i < tdLength; i++) {
					subObj += "<td><input type=\"checkbox\"></td>";
				}

				subObj += "</tr>";
			} else {
				subObj = "<tr><td contenteditable=\"true\">新添加行</td>";

				for (var i = 1; i < tdLength; i++) {
					subObj += "<td><input type=\"radio\"></td>";
				}

				subObj += "</tr>";
			}

			var childEl = document.createElement("tr");
						
			childEl.innerHTML = subObj;

			parentNode.appendChild(childEl);
			
		}
	})
})();
