<template>
    <div>
        <el-button type="primary" @click="dialogVisible = true">添加数据</el-button>
        <fu-change-calendar v-if="dialogVisible" :conWidth="60" :dialogVisible="dialogVisible" :defaultData="groupBringList"
            :calendarTitleObj="calendarTitleObj" :nodeKey="'roleId'" :treeData="treeData" @changeCalendarSave="save"
            @closeDialogVisible="close"></fu-change-calendar>
    </div>
</template>
  
<script>
export default {
    name: "BaseUse",
    data() {
        return {
            dialogVisible: false,
            groupBringList: [
                { flag: 1, roleId: "1", roleName: "新管理员1", },
            ],
            treeData: [
                { flag: 1, roleId: "1", roleName: "新管理员1", },
                { flag: 2, roleId: "2", roleName: "新管理员2", },
                { flag: 3, roleId: "3", roleName: "新管理员3", },
                { flag: 4, roleId: "4", roleName: "新管理员4", },
                { flag: 5, roleId: "5", roleName: "新管理员5", },
                { flag: 6, roleId: "6", roleName: "新管理员6", },
            ],
            calendarTitleObj: {
                calendarTitle: '选择群聊',
                leftTitle: '可供选择的群',
                rightTitle: '已选择的群'
            },
        };
    },
    methods: {
        save(ids) {

        },
        close() {
            this.dialogVisible = false;
        },
    },
};
</script>
<style lang="scss" scoped>
.component-block {
    margin-top: 40px;

    p {
        font-size: 14px;
        color: #5e6d82;
        line-height: 1.5em;
    }

    h2 {
        font-weight: 400;
        color: #1f2f3d;
    }
}
</style>