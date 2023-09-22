<template>
    <div class="preview-wrap">
        <div id="bodyContainer" ref="bodyContainer"></div>
    </div>
</template>

<script>
import {  renderAsync } from "docx-preview";
export default {
    name: 'DocxPreview',
    data() {
        return {
            docxOptions: {
                className: "juyuanxing",
                inWrapper: true,
                ignoreWidth: true,
                ignoreHeight: true,
                ignoreFonts: true,
                breakPages: true,
                ignoreLastRenderedPageBreak: true,
                experimental: false,
                trimXmlDeclaration: true,
                useBase64URL: false,
                useMathMLPolyfill: false,
                showChanges: false,
                debug: false,
            }
        }
    },
    methods: {
        // 渲染docx
        docxRender(buffer) {
            let bodyContainer = document.getElementById("bodyContainer");
            renderAsync(
                buffer, // Blob | ArrayBuffer | Uint8Array, 可以是 JSZip.loadAsync 支持的任何类型
                bodyContainer, // HTMLElement 渲染文档内容的元素,
                null, // HTMLElement, 用于呈现文档样式、数字、字体的元素。如果为 null，则将使用 bodyContainer。
                this.docxOptions // 配置
            ).then(res => {
                console.log("res---->", res)
            })
        }
    },
    mounted(){
        this.vdnId = this.$route.query.vdnId;
        // this.getBuffData()
    },
}
</script>

<style></style>