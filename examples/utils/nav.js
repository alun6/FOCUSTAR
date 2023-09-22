/**
 * @navList 配置导航目录
 * {component}是pages下每个文件夹的index.vue的name, 命名规则第一个字母大写Doc结尾
 * {path}, 动态路由
 * {name}, 目录的中文名以及页面标题
 */
const navList = {
  "guide": [{
    name: '快速上手',
    path: 'getting-started',
    component: 'GettingStartedDoc'
  }],
  "components": [
    {
      name: 'SplitPane 分割面板',
      path: 'split-pane',
      component: 'SplitPaneDoc'
    },
    {
      name: 'wang 富文本',
      path: 'wang-editor',
      component: 'wangEditorDoc'
    },
    {
      name: 'FileView文件查看',
      path: 'file-view',
      component: 'FileViewDoc'
    },
    {
      name: '数据添加分栏弹窗',
      path: 'change-calendar',
      component: 'BaseUseDoc'
    },
    {
      name: '聊天表情',
      path: 'emoji-picker',
      component: 'emoDoc'
    },
  ],
  "filters": [],
  "directives": [
    {
      name: '图片放大指令',
      path: 'direct-preview',
      component: 'previewDoc'
    },
  ],
}
/**
 * @type ({name: string, value: string})[]
 */
const type = [
  {
    name: '开发指南',
    value: 'guide'
  },
  {
    name: '组件',
    value: 'components'
  },
  {
    name: '过滤器',
    value: 'filters'
  },
  {
    name: '指令',
    value: 'directives'
  },
]

/**
 * @getTypeName 将一级分类的value转name
 */
function getTypeName(val) {
  let name
  type.map(item => {
    if (val === item.value) {
      name = item.name
    }
  })
  return name || '组件'
}

export {
  navList,
  getTypeName
}
