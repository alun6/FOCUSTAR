<template>
    <div class="editor—wrapper" :class="shortConfig?'shortConfig':''">
      <div :id="'toolbar-container-' + id" class="toolbar-container"><!-- 工具栏 --></div>
      <div :id="'editor-container-' + id" class="editor-container"><!-- 编辑器 --></div>
    </div>
  </template>
  <script>
  export default {
    props: ["content", "disabled", "shortConfig","uploadImageUlr","uploadVideoUrl","authToken"],
    name: "FuWangEditor",
    data() {
      return {
        id: Math.floor(Math.random() * 10000000000),
        toolbarConfig: {
          toolbarKeys: ['bold', 'underline', 'italic', 'through', 'clearStyle', 'color', 'fontSize', 'lineHeight',
          {
            iconSvg: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z\"></path></svg>",
            key: 'group-justify',
            menuKeys: ['justifyLeft', 'justifyRight', 'justifyCenter', 'justifyJustify']
          }, 
          {
            iconSvg: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M0 64h1024v128H0z m384 192h640v128H384z m0 192h640v128H384z m0 192h640v128H384zM0 832h1024v128H0z m0-128V320l256 192z\"></path></svg>",
            key: 'group-indent',
            menuKeys: ['indent', 'delIndent']
          },
          'insertLink', 'uploadImage', 'insertTable']
        },
        toolbarShortConfig: {
          toolbarKeys: ['uploadImage', 'emotion']
        },
        WEditor: null,
        WToolbar: null
      };
    },
    watch: {
      content(val){
        if(this.WEditor){
          this.WEditor.setHtml(val) //重新设置内容
        }
      },
      disabled(val){
        if(this.WEditor){
          if(val){
            this.WEditor.disable() //禁用
          }else{
            this.WEditor.enable() //开启
          }
        }
      }
    },
    mounted() {
      let self = this
      let WEditor, WToolbar;
      //初始化编辑器
      let editorConfig = {
        placeholder: '',
        onChange(editor) {
          //动态获取内容，返回给父组件
          const html = editor.getHtml()
          const text = editor.getText()
          self.$emit('sendContent', {content: html, text: text})
        },
        MENU_CONF: {
          emotion: {
            emotions: [] //表情配置
          },
          uploadImage: {
            server: this.uploadImageUlr,
            maxFileSize: 2 * 1024 * 1024, //2M
            maxNumberOfFiles: 1,
            allowedFileTypes: ['image/*'],
            fieldName: "upfile",
            headers: {
              'Authorization': this.authToken,
            },
            customInsert(res, insertFn) {
              let url = res.url
              insertFn(url);
            },
          },
          uploadVideo: {
            server: this.uploadVideoUrl,
            maxFileSize: 5 * 1024 * 1024, //5M
            maxNumberOfFiles: 1,
            allowedFileTypes: ['video/*'],
            fieldName: "upfile",
            headers: {
              'Authorization': this.authToken,
            },
            customInsert(res, insertFn) {
              let url = res.url
              insertFn(url);
            },
          }
        }
      }
      //初始化自定义表情
      for(let i = 1; i < 110; i++){
        let imgDom = '<img src="./utils/wxemoji/emoji ('+ i +').png" style="width:24px;" />'
        editorConfig.MENU_CONF.emotion.emotions.push(imgDom)
      }
  
      //设定时器是因为单页面打开时，js文件有可能会未加载完，导致初始化失败
      setTimeout(()=>{
        WEditor = window.wangEditor.createEditor({
          selector: '#editor-container-' + self.id,
          config: editorConfig,
          mode: 'default'
        })
  
        //初始化工具栏
        let toolbarConfig = this.toolbarConfig //默认配置
        if(this.shortConfig){
          //使用第二套少按钮配置
          toolbarConfig = this.toolbarShortConfig
        }
        WToolbar = window.wangEditor.createToolbar({
          editor: WEditor,
          selector: '#toolbar-container-' + self.id,
          config: toolbarConfig,
          mode: 'default'
        })
  
        if(this.content){
          WEditor.setHtml(this.content) //设置内容
        }
        if(this.disabled){
          WEditor.disable() //禁用
        }
  
        // console.log(WEditor.getAllMenuKeys()) //打印全部按钮配置
  
        this.WEditor = Object.seal(WEditor)
        this.WToolbar = Object.seal(WToolbar)
      }, 100)
  
    },
    methods: {
  
    }
  };
  </script>
  <style>
  .editor—wrapper {
    border: 1px solid #E4E7ED;
    z-index: 100;
  }
  
  .toolbar-container {
    border-bottom: 1px solid #E4E7ED;
  }
  
  .editor-container {
    height: 300px;
  }
  .shortConfig .editor-container{
    height: 180px;
  }
  .w-e-text-container{
    color: #535862;
  }
  .w-e-text-container [contenteditable=false]{
    background-color: #f5f7fa;
    cursor: not-allowed;
  }
  </style>