var templates = [
	`<div class='sub-questions' id="sub-questions-${this.count}">
		<div class="sub-questions-title">
			问题：
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
	</div>`,


	`<div class='sub-questions' id="sub-questions-${this.count}">
		<div class="sub-questions-title">
			问题：
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
	</div>`,

	`<div class='sub-questions' id="sub-questions-${this.count}">
		<div class="sub-questions-title">
			问题：
			<div contenteditable="true">单行填空题</div>
		</div>

		<input type="text" name="q${this.count}" class="txt  txt-primary">

		<div class="sub-questions-footer">
			<i class="pull-right"><img src="img/remove.svg" alt="" ng-click="design.removeSubQuestion(${this.count})"></i>
		</div>
	</div>
	`,

	`<div class='sub-questions' id="sub-questions-${this.count}">
		<div class="sub-questions-title">
			问题：
			<div contenteditable="true">多行填空题</div>
		</div>

	
		<textarea name="" id="" cols="60" rows="5"></textarea>

		<div class="sub-questions-footer">
			<i class="pull-right"><img src="img/remove.svg" alt="" ng-click="design.removeSubQuestion(${this.count})"></i>
		</div>
	</div>
	`,

	`<div class='sub-questions' id="sub-questions-${this.count}">
		<div class="sub-questions-title">
			问题：
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
	`,

	`<div class='sub-questions' id="sub-questions-${this.count}">
		<div class="sub-questions-title">
			问题：
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
	`,

	`<div class='sub-questions' id="sub-questions-${this.count}">
		<div class="sub-questions-title">
			问题：
			<div contenteditable="true">请在此写下您对此次调查问卷的其他想法</div>
		</div>

		<div contenteditable="true" class="desc"></div>

		<div class="sub-questions-footer">
			<i class="pull-right"><img src="img/remove.svg" alt="" ng-click="design.removeSubQuestion(${this.count})"></i>
		</div>
		
	</div>
	`,

	`<div class='sub-questions' id="sub-questions-${this.count}">
		<div class="sub-questions-title">
			问题：
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
	</div>`,

	`<div class='sub-questions' id="sub-questions-${this.count}">
		<div class="sub-questions-title">
			问题：
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
	</div>`,

	`<div class='sub-questions' id="sub-questions-${this.count}">
		<div class="sub-questions-title">
			问题：
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
	</div>`,

	`<div class='sub-questions' id="sub-questions-${this.count}">
		<div class="sub-questions-title">
			问题：
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
	</div>`,

	`<div class='sub-questions' id="sub-questions-${this.count}">
		<div class="sub-questions-title">
			问题：
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
	</div>`,

	`<div class='sub-questions' id="sub-questions-${this.count}">
		<div class="sub-questions-title">
			问题：
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
	</div>`
]


//使用data.js分离模板出现this.count为undefined情况，故放弃