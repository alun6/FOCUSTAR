<template>
    <el-dialog :title="calendarTitleObj.calendarTitle" custom-class='addOperator center-dialog Operator-add new-dialog-box'
        :visible="dialogVisible" :close-on-press-escape="false" :close-on-click-modal="false" :modal-append-to-body='false'
        :width="conWidth + '%'" @close="dialogVisibleFalse">
        <div class="import-body">
            <el-form ref="form" :model="form" label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="10">
                        <p style="font-weight: bold;margin-bottom: 10px;">
                            {{ calendarTitleObj.leftTitle }}({{ setTitleNumber(leftDataList) }})</p>
                        <el-input v-model="findKey" placeholder="关键词" size="small" clearable @clear="searchFn">
                            <el-button slot="append" size="small" @click="searchFn">查询</el-button>
                        </el-input>
                        <div class="transfer_item">
                            <el-tree ref="tree" :data="leftDataList" :props="defaultProps" :node-key="nodeKey" show-checkbox
                                highlight-current check-on-click-node></el-tree>
                        </div>
                    </el-col>
                    <el-col :span="4" style="text-align:center;">
                        <div style="margin: 200px 0 15px 0;">
                            <el-button type="primary" plain size="small" @click="setDataRightFn">选择&gt;&gt;</el-button>
                        </div>
                        <div>
                            <el-button type="info" plain size="small" @click="setDataLeftFn">&lt;&lt;移除</el-button>
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <p style="font-weight: bold;margin: 0 0 10px;">
                            {{ calendarTitleObj.rightTitle }}({{ nowChangeList.length }})</p>
                        <el-input v-model="findKeyTwo" placeholder="关键词" size="small" clearable @clear="searchRight">
                            <el-button slot="append" size="small" @click.native="searchRight">查询</el-button>
                        </el-input>
                        <div class="transfer_item">
                            <el-tree ref="treeRight" :data="nowChangeList" :props="defaultProps" node-key="id" show-checkbox
                                highlight-current check-on-click-node></el-tree>
                        </div>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <span>
                <el-button type="primary" size="small" @click="dialogVisibleSave">确定</el-button>
                <el-button size="small" @click="dialogVisibleFalse">取 消</el-button>
            </span>
            <span>
            </span>
        </div>
    </el-dialog>
</template>

<script>
import { distinct, setShowHideFn } from './auth.js'
export default {
    name: 'FuChangeCalendar',
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        conWidth: {
            type: Number,
            default: 60,
        },
        calendarTitleObj: {
            type: Object,
            default() {
                return {};
            }
        },
        defaultData: {
            type: Array,
            default() {
                return [];
            }
        },
        apiType: {
            type: String,
            default: "",
        },
        nodeKey: {
            type: String,
            default: "id",
        },
        defaultProps: {
            type: Object,
            default() {
                return {  label: 'roleName'};
            }
        },
        treeData: {
            type: Array,
            default() {
                return [];
            }
        },
    },
    watch: {
        dialogVisible: {
            immediate: true,
            deep: true,
            handler: function (newV, oldV) {
                if (newV) {
                    this.findKeyTwo = "";
                    this.findKey = "";
                    this.getLeftDataListFn();
                }

            },
        },
    },
    data() {
        return {
            form: {},
            leftDataList: [],
            nowChangeList: [],
            findKeyTwo: "",
            findKey: "",
            oldDataList: []
        }
    },
    methods: {
        dialogVisibleFalse() {
            this.$emit('closeDialogVisible')
        },
        dialogVisibleSave() {
            let ids = []
            if (this.nowChangeList.length == 0) console.log('为空')
            this.nowChangeList.map((o) => {
                ids.push(o[this.nodeKey])
            })
            if (ids.length == 0) {
                ids = []
            }
            this.$emit('changeCalendarSave', ids)
        },
        getLeftDataListFn() {
            let mapData = this.treeData.map((item) => {
                item['disabled'] = false;
                return item
            })
            this.leftDataList = mapData;
            this.oldDataList = mapData
            this.openDataListFn();
        },
        //回填数据
        openDataListFn() {
            if (this.defaultData.length > 0) {
                let list = JSON.parse(JSON.stringify(this.defaultData))
                list.map((o, i) => {
                    o[this.nodeKey] = o[this.nodeKey];
                    o['label'] = o.name;
                    o['disabled'] = false;
                })
                this.nowChangeList = list
                setShowHideFn(this.leftDataList, this.nowChangeList, this.nodeKey, true)
                this.$nextTick(()=>{
                    this.$refs.tree.setCheckedKeys([]);
                })
            }
        },
        setDataRightFn() {
            let nodes = this.$refs.tree.getCheckedNodes(true)
            if (nodes.length > 0) {
                let nodesRight = JSON.parse(JSON.stringify(nodes))
                nodesRight.map((r) => {
                    this.nowChangeList.push(r)
                })
                this.nowChangeList = distinct(this.nowChangeList, this.nodeKey)
                setShowHideFn(this.leftDataList, nodes, this.nodeKey, true)
                this.$nextTick(()=>{
                    this.$refs.tree.setCheckedKeys([]);
                })
               
            }
        },
        setDataLeftFn() {
            let nodes = this.$refs.treeRight.getCheckedNodes(true);
            if (nodes.length > 0) {
                setShowHideFn(this.leftDataList, nodes, this.nodeKey, false)
                let nodesRight = JSON.parse(JSON.stringify(nodes))
                let len = this.nowChangeList.length
                nodesRight.map((r) => {
                    for (var i = 0; i < len; i++) {
                        if (this.nowChangeList[i][this.nodeKey] == r[this.nodeKey]) {
                            this.nowChangeList.splice(i, 1)
                            i = i - 1
                            len = len - 1
                        }
                    }
                })
            }
        },
        searchRight() {
            this.nowChangeList.map((o) => {
                if (o[this.defaultProps.label].indexOf(this.findKeyTwo) > -1 || !this.findKeyTwo) {
                    o.disabled = false;
                } else {
                    o.disabled = true;
                }
            })
        },
        setTitleNumber(array) {
            return array.filter((item) => { return item.disabled == false }).length;
        },
        searchFn() {
            if (this.findKey) {
                let arr = []
                this.oldDataList.map((o) => {
                    if (o[this.defaultProps.label].indexOf(this.findKey) > -1) {
                        arr.push(o)
                    }
                })
                this.leftDataList = [...arr]
            } else {
                this.leftDataList = [...this.oldDataList]
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.transfer_item {
    border: #DCDFE6 1px solid;
    height: 360px;
    margin-top: 10px;
    overflow: auto;
}

.transfer_item>>>.el-tree-node[aria-disabled="true"] {
    display: none;
}

.dialog-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.import-body {
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
}

.abow_dialog11 {
    >>>.el-dialog__body {
        color: #606266;
        font-size: 14px;
        word-break: break-all;
        height: 450px;
        overflow: auto;
    }
}

.addcollaboTitle {
    font-weight: 600;
    display: flex;
    flex-direction: row;
    margin-bottom: 8px;
}
</style>