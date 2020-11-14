/**
* 基础菜单 商品管理
*/
<template>
	<div class="goods">
		<el-form :inline="true" :model="formInline" class="user-search">
			<el-form-item>
				<el-button size="small" type="primary" icon="el-icon-plus" @click="handlcenter()">添加</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="listData" stripe style="width: 100%">
			<el-table-column prop="deptName" label="商家手机号码" />
			<el-table-column prop="deptNo" label="销售金额" />
			<el-table-column prop="addTime" label="时间" />
			<el-table-column prop="tag" label="代办事项" width="100" :filter-method="filterTag" filter-placement="bottom-end">
				<template slot-scope="scope">
					<el-tag :type="scope.row.tag === '未完成' ? 'danger' : 'success'" disable-transitions>{{scope.row.tag}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="handlcemos(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 添加界面 -->
		<el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click="closeDialog">
			<el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
				<el-form-item label="部门名称" prop="deptName">
					<el-input size="small" v-model="editForm.deptName" auto-complete="off" placeholder="请输入部门名称"></el-input>
				</el-form-item>
				<el-form-item label="部门代码" prop="deptNo">
					<el-input size="small" v-model="editForm.deptNo" auto-complete="off" placeholder="请输入部门代码"></el-input>
				</el-form-item>
				<el-form-item label="时间" prop="addTime" style="withe: 100%">
					<el-date-picker v-model="editForm.addTime" format="yyyy 年 MM 月 dd 日" value-format="yyyy年M月d日" type="date"
					 placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="代办事项" prop="addTime" style="withe: 100%">
					<el-select v-model="editForm.tag" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"  @click.native="labels(item.label)" />
					</el-select>
				</el-form-item>
				<!-- <div class="block">
          <span class="demonstration">默认</span>
          
        </div> -->
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="small" @click="closeDialog">取消</el-button>
				<el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm(editForm)">保存</el-button>
			</div>
		</el-dialog>
		<!-- 编辑界面 -->
		<el-dialog :title="title2" :visible.sync="addVisible" width="30%" @click="closeDialog">
			<el-form label-width="120px" :model="editForm2" :rules="rules" ref="editForm">
				<el-form-item label="部门名称" prop="deptName">
					<el-input size="small" v-model="editForm2.deptName" auto-complete="off" placeholder="请输入部门名称"></el-input>
				</el-form-item>
				<el-form-item label="部门代码" prop="deptNo">
					<el-input size="small" v-model="editForm2.deptNo" auto-complete="off" placeholder="请输入部门代码"></el-input>
				</el-form-item>
				<el-form-item label="时间" prop="addTime" style="withe: 100%">
					<el-date-picker v-model="editForm2.addTime" format="yyyy 年 MM 月 dd 日" value-format="yyyy年M月d日" type="date"
					 placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="代办事项" prop="addTime" style="withe: 100%">
					<el-select v-model="editForm2.tag" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"  @click.native="labels(item.label)" />
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer" style="width: 100%;">
				<el-button size="small" @click="closeDialog">取消</el-button>
				<el-button size="small" type="primary" :loading="loading" class="title" @click="Form(editForm2)">保存</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				nshow: true, //switch开启
				fshow: false, //switch关闭
				loading: false, //是显示加载
				editFormVisible: false, //控制编辑页面显示与隐藏
				addVisible: false,
				title: "添加",
				title2: "编辑",
				value1: "",
				search: "",
				editForm: {
					deptName: "",
					deptNo: "",
					addTime: "",
					tag: ""
				},
				editForm2: {
					deptName: "",
					deptNo: "",
					addTime: "",
					tag: ""
				},
				// rules表单验证
				rules: {
					deptName: [{
						required: true,
						message: "请输入部门名称",
						trigger: "blur"
					}, ],
					deptNo: [{
						required: true,
						message: "请输入部门代码",
						trigger: "blur"
					}, ],
				},
				formInline: {
					page: 1,
					limit: 10,
					varLable: "",
					varName: "",
					token: localStorage.getItem("logintoken"),
				},
				// 删除部门
				seletedata: {
					ids: "",
					token: localStorage.getItem("logintoken"),
				},
				listData: [{
						addUser: null,
						editUser: null,
						addTime: "2020年11月14日",
						editTime: 1526700200000,
						deptId: 2,
						deptName: "XX分公司",
						deptNo: "1",
						parentId: 1,
						tag: "未完成"
					},
					{
						addUser: null,
						editUser: null,
						addTime: "2020年11月13日",
						editTime: 1526652291000,
						deptId: 3,
						deptName: "上海测试",
						deptNo: "02",
						parentId: 1,
						tag: "完成"
					},
					{
						addUser: null,
						editUser: null,
						addTime: "2020年11月12日",
						editTime: 1526349565000,
						deptId: 12,
						deptName: "1",
						deptNo: "11",
						parentId: 1,
						tag: "完成"
					},
					{
						addUser: null,
						editUser: null,
						addTime: "2020年11月11日",
						editTime: 1526373178000,
						deptId: 13,
						deptName: "5",
						deptNo: "5",
						parentId: 1,
						tag: "未完成"
					},
					{
						addUser: null,
						editUser: null,
						addTime: "2020年11月10日",
						editTime: 1526453107000,
						deptId: 17,
						deptName: "v",
						deptNo: "v",
						parentId: 1,
						tag: "完成"
					},
				], //用户数据
				options: [{
					value: '选项1',
					label: '完成'
				}, {
					value: '选项2',
					label: '未完成'
				}],
				value: ''
			};
		},
		// 注册组件
		// components: {
		//   Pagination
		// },
		/**
		 * 数据发生改变
		 */

		/**
		 * 创建完毕
		 */
		created() {
			// this.getdata(this.formInline);
		},

		/**
		 * 里面的方法只有被调用才会执行
		 */
		methods: {
			//显示添加界面
			handlcenter(index, row) {
				this.editFormVisible = true;
				console.log(index, row);
			},
			// 增加页面保存方法
			submitForm(editData) {
				this.editFormVisible = false;
				this.listData.unshift({
					deptName: editData.deptName,
					deptNo: editData.deptNo,
					deptId: editData.deptId,
					addTime: editData.addTime,
					tag: this.value
				});
			},
			//显示编辑界面
			handlcemos(index, res) {
				this.addVisible = true;
				console.log(index, res);
				this.editForm2.deptName = res.deptName;
				this.editForm2.deptNo = res.deptNo;
				this.editForm2.deptId = res.deptId;
				this.editForm2.addTime = res.addTime;
				this.editForm2.tag = res.tag;
			},
			// 确定修改数组内容
			Form(res) {
				this.addVisible = false;
				console.log(res);
				this.listData.map((item) => {
					if (item.deptId == res.deptId) {
						(item.deptName = res.deptName),
						(item.deptNo = res.deptNo),
						(item.deptId = res.deptId),
						(item.addTime = res.addTime);
						(item.tag = this.value);
					}
				});
			},
			// 删除公司
			deleteUser(index, row) {
				console.log(index, row);
				this.listData.splice(index, 1);
			},
			filterTag(value, row) {
				return row.tag === value;
				console.log(value,row);
			},
			labels(e){
				this.value = e;
			},
			// 关闭编辑、增加弹出框
			closeDialog() {
				this.editFormVisible = false;
			},
		},
	};
</script>

<style scoped>
	.user-search {
		margin-top: 20px;
	}

	.userRole {
		width: 100%;
	}

	.goods {
		background-color: #Fff;
		width: 90%;
		margin: auto;
	}
	.el-select {
		width: 100%;
	}
</style>
