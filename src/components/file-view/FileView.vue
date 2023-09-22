<template>
    <div style="text-align: center;">
        <excel-view :src="src" v-if="fileType == 'xlsx'" ref="excelRef" style="height: 100vh;"></excel-view>
        <div class="file-pre" v-else-if="fileType == 'xls'">
            <el-tabs v-model="activeName" type="border-card">
                <el-tab-pane v-for="(item, index) in src" :key="index" :label="item.name" :name="item.name">
                    <div class="table" v-html="item.innerHTML"></div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div id="pptxssssss" v-if="fileType == 'pptx'">
            <iframe :src="pptsrc" frameborder="0" id="mainIframe" ref="mainIframe" name="mainIframe" width="100%"
                height="100%" scrolling="auto" style="position:absolute;left: 0px;z-index:1000"></iframe>
        </div>
        <docx-view :src="src" v-if="fileType == 'docx'" ref="docxRef"></docx-view>
        <pdf-view :src="src" v-if="fileType == 'pdf'"></pdf-view>
        <template v-else-if="fileType == 'txt'">
            <iframe ref="textFrame" :src="src" frameborder="0" width="100%" height="100%" scrolling="auto"
                style="position:absolute;left: 0px;z-index:1000"></iframe>
        </template>
        <template
            v-else-if="fileType == 'png' || fileType == 'jpg' || fileType == 'jpeg' || fileType == 'gif' || fileType == 'psd'">
            <el-image :src="src" :fit="'fill'" :preview-src-list="allLi"></el-image>
        </template>
        <div class="downLoad_Buttom" v-if="shoDow">
            <div class="buttomRow" title="下载" @click="dowmLoadFile()">下载</div>
        </div>
    </div>
</template>

<script>
import XLSX from "xlsx";
import axios from 'axios'
export default {
    name: 'FuFileView',
    components: {
        "excel-view": () => import("./excel.vue"),
        "docx-view": () => import("./docx.vue"),
        "pdf-view": () => import("./pdf.vue"),
    },
    props: {
        shoDow: {
            type: Boolean,
            default: false,
        },
        fileType: {
            type: String,
            default: 'docx',
        },
        resType: {
            validator: (val) => ["Binary", "Url"].includes(val),
            default: "Url",
        },
        urlParams: {
            type: Object,
            default: ()=>{
                return {};
            },
        },
        fileUrl: String,
        fileBinary: [Blob, ArrayBuffer],
    },
    data() {
        return {
            src: null,
            fileId: '',
            allLi: [],
            url: '',
            activeName: "",
            pptsrc: '',
        }
    },
    methods: {
        dowmLoadFile() {
            const instance = axios.create({
                baseURL: "",
                timeout: 5000,
            });
            instance.defaults.responseType = 'blob';
            instance.get(this.fileUrl, this.urlParams).then(res => {
                if (res && res.data) {
                    const url = window.URL.createObjectURL(new Blob([res.data]))
                    const link = document.createElement('a')
                    link.href = url
                    link.setAttribute('download', this.Page_title)
                    document.body.appendChild(link)
                    link.click()
                }
            })
                .catch(error => {
                    // 请求失败，处理错误
                    console.error(error);
                });
        },
        cansetSrc(res) {
            let excelSheet = [];
            const data = new Uint8Array(res);
            const workbook = XLSX.read(data, {
                type: 'array'
            });
            // 删除掉没有数据的sheet
            Object.values(workbook.Sheets).forEach((sheet, index) => {
                if (Object.keys(sheet).indexOf('!ref') === -1) {
                    delete workbook.Sheets[workbook.SheetNames[index]];
                }
            });
            const sheetList = workbook.SheetNames.filter(v => v.indexOf('数据源') === -1);
            this.activeName = sheetList[0];
            sheetList.forEach(sheet => {
                const worksheet = workbook.Sheets[sheet];
                if (worksheet) {
                    const innerHTML = XLSX.utils.sheet_to_html(worksheet);
                    excelSheet.push({
                        name: sheet,
                        innerHTML: innerHTML
                    });
                } else {
                    excelSheet.push({
                        name: sheet,
                        innerHTML: '暂无数据',
                    });
                }
            });
            this.src = excelSheet;
        },
        getBuffData() {
            const instance = axios.create({
                baseURL: "",
                timeout: 5000,
            });
            if (this.fileType === 'xls') {
                instance.defaults.responseType = 'arraybuffer';//数组类型
            } else {
                instance.defaults.responseType = 'blob';
            }
            instance.get(this.fileUrl, this.urlParams).then(res => {
                if (res && res.data) {
                    if (this.fileType == 'xlsx' || this.fileType == 'xls') {
                        if (this.fileType == 'xls') {
                            this.cansetSrc(res.data)
                        } else {
                            this.src = window.URL.createObjectURL(new Blob([res.data]))  //xls
                        }
                    } else if (this.fileType == 'docx') {
                        setTimeout(() => {
                            this.$refs.docxRef.docxRender(res.data)//docx
                        }, 200)
                    } else if (this.fileType == 'pdf') {
                        let url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
                        this.src = url;
                    } else if (this.fileType == 'txt') {
                        const reader = new FileReader();
                        reader.readAsText(new Blob([res.data]));
                        reader.onload = (() => {
                            let content = reader.result
                            let arr = new Array();
                            let newConten = content.substring(0, 20)
                            arr = newConten.split("�")
                            if (arr.length != 1) {
                                let url = window.URL.createObjectURL(new Blob([res.data], { type: 'text/plain; charset=gb18030' }))
                                this.src = url;
                            } else {
                                let url = window.URL.createObjectURL(new Blob([res.data]))
                                this.src = url;
                            }
                        })
                    } else if (this.fileType == 'png' || this.fileType == 'jpg' || this.fileType == 'jpeg' || this.fileType == 'gif' || this.fileType == 'psd') {
                        let url = window.URL.createObjectURL(res.data)
                        this.src = url;
                        this.allLi = [url]
                    } else if (this.fileType == 'pptx') {
                        let url = window.URL.createObjectURL(res.data)
                        const obj1 = window.frames[0]// 获得对应iframe的window对象
                        setTimeout(() => {
                            obj1.getData(url)
                        }, 1000);
                    }else{
                        this.$message.error('文件格式不正或不支持该文件预览')
                    }

                }
            })
                .catch(error => {
                    // 请求失败，处理错误
                    console.error(error);
                });
        },
        renderData(res) {
            if (this.fileType == 'xlsx' || this.fileType == 'xls') {
                if (this.fileType == 'xls') {
                    this.cansetSrc(this.fileBinary)
                } else {
                    this.src = window.URL.createObjectURL(new Blob([this.fileBinary]))  //xls
                }
            } else if (this.fileType == 'docx') {
                setTimeout(() => {
                    this.$refs.docxRef.docxRender(this.fileBinary)//docx
                }, 200)
            } else if (this.fileType == 'pdf') {
                let url = window.URL.createObjectURL(new Blob([this.fileBinary], { type: 'application/pdf' }));
                this.src = url;
            } else if (this.fileType == 'txt') {
                const reader = new FileReader();
                reader.readAsText(new Blob([this.fileBinary]));
                reader.onload = (() => {
                    let content = reader.result
                    let arr = new Array();
                    let newConten = content.substring(0, 20)
                    arr = newConten.split("�")
                    if (arr.length != 1) {
                        let url = window.URL.createObjectURL(new Blob([this.fileBinary], { type: 'text/plain; charset=gb18030' }))
                        this.src = url;
                    } else {
                        let url = window.URL.createObjectURL(new Blob([this.fileBinary]))
                        this.src = url;
                    }
                })
            } else if (this.fileType == 'png' || this.fileType == 'jpg' || this.fileType == 'jpeg' || this.fileType == 'gif' || this.fileType == 'psd') {
                let url = window.URL.createObjectURL(this.fileBinary)
                this.src = url;
                this.allLi = [url]
            } else if (this.fileType == 'pptx') {
                let url = window.URL.createObjectURL(new Blob([this.fileBinary], { type: 'application/pptx' }));
                const obj1 = window.frames[0]// 获得对应iframe的window对象
                setTimeout(() => {
                    obj1.getData(url)
                }, 1000);
            }
        },
    },
    mounted() {
        this.pptsrc = './PPTXjs/index.html';
        if (this.resType === 'Url') {//接口文件
            if (this.fileUrl) {
                this.getBuffData()
            } else {
                this.$message.error('请传入文件地址')
                return
            }
        }


    },
}
</script>

<style scoped>
body {
    overflow: auto;
    height: 100%;
}

.code-area {
    white-space: break-spaces;
    text-align: left;
}

.downLoad_Buttom {
    position: absolute;
    z-index: 9999;
    top: 80%;
    right: 4rem;
}

.buttomRow {
    background: #409EFF;
    height: 70px;
    width: 70px;
    line-height: 70px;
    border-radius: 48px;
    cursor: pointer;
    color: #ffffff;
}

.file-pre {
    height: calc(100vh - 20px);
    padding: 0px 20px 20px 20px;
}

.file-pre /deep/ table {
    border-right: 1px solid #e8eaec;
    border-bottom: 1px solid #e8eaec;
    border-collapse: collapse;
    margin: auto;
}

.file-pre /deep/ table td {
    border-left: 1px solid #e8eaec;
    border-top: 1px solid #e8eaec;
    white-space: wrap;
    text-align: left;
    min-width: 100px;
    padding: 4px;
}

.file-pre /deep/ table {
    border-top: 1px solid #EBEEF5;
    border-left: 1px solid #EBEEF5;
    width: 100%;
    overflow: auto;
}

.file-pre /deep/ table tr {
    height: 44px;
}

.file-pre /deep/ table td {
    min-width: 200px;
    max-width: 400px;
    padding: 4px 8px;
    border-right: 1px solid #EBEEF5;
    border-bottom: 1px solid #EBEEF5;
}
</style>