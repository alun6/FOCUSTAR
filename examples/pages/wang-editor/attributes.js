/**
 * 说明文档
 * @name 表格名称
 * @header 表格头部参数,任意定义
 * @table table内容,字段要和header定义的属性保持一直
 * @children 多表使用
 */
export default [{
  name: 'WangEditor',
  children: [{
      name: '@Attributes',
      header: {
        prop: '参数',
        desc: "说明",
        type: '类型',
        enum: "可选值",
        default: "默认值"
      },
      table: [
        {
          prop: 'content',
          desc: '富文本内容',
          type: 'String',
          enum: '',
          default: '',
        },
        {
          prop: 'disabled',
          desc: '富文本是否可编辑',
          type: 'boolean',
          enum: 'true / false',
          default: 'false',
        },
        {
          prop: 'shortConfig',
          desc: '富文本功能按钮模式',
          type: 'boolean',
          enum: 'true / false',
          default: 'false',
        },
        {
          prop: 'uploadImageUlr',
          desc: '富文本图片上传接口',
          type: 'String',
          enum: '',
          default: '',
        },
        {
          prop: 'uploadVideoUrl',
          desc: '富文本视频上传接口',
          type: 'String',
          enum: '',
          default: '',
        },
        {
          prop: 'authToken',
          desc: '富文本上传接口token值',
          type: 'String',
          enum: '',
          default: '',
        },
      ]
    },
  ]
}, ];
