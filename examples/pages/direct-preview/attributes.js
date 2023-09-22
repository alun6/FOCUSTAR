/**
 * 说明文档
 * @name 表格名称
 * @header 表格头部参数,任意定义
 * @table table内容,字段要和header定义的属性保持一直
 * @children 多表使用
 */
export default [{
  name: 'ImgView',
  children: [{
      name: '@Attributes',
      header: {
        prop: '参数',
        desc: "说明",
        type: '类型',
        enum: "可选值",
        default: "默认值"
      },
      table: [],
    },
    {
      name: '@Events',
      header: {
        event: '事件名',
        desc: "说明",
        value: '回调参数',
        valueType: '传入参数'
      },
      table: [{
        event: '$openPreview',
        desc: '指令名称',
        value: '-',
        valueType: '[url]'
      }, ]
    },
  ]
}, ];
