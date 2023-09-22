/**
 * 说明文档
 * @name 表格名称
 * @header 表格头部参数,任意定义
 * @table table内容,字段要和header定义的属性保持一直
 * @children 多表使用
 */
export default [{
  name: 'FileView',
  children: [{
      name: '@Attributes',
      header: {
        prop: '参数',
        desc: "说明",
        type: '类型',
        enum: "可选值",
        default: "默认值"
      },
      table: [{
          prop: 'fileType',
          desc: '文件类型(必须)',
          type: 'String',
          enum: 'xlsx / xls/ docx/ pdf/ txt/ pptx/ png/jpg/jpeg/gif/psd',
          default: '-',
        },
        {
          prop: 'fileUrl',
          desc: '文件接口地址(必须)',
          type: 'String',
          enum: '-',
          default: '-',
        },
        {
          prop: 'shoDow',
          desc: '是否需要下载按钮',
          type: 'Boolean',
          enum: 'true / false',
          default: 'false',
        },
        {
          prop: 'urlParams',
          desc: '接口参数',
          type: 'Object',
          enum: '-',
          default: '-',
        },
      ]
    },
  ]
}, ];
