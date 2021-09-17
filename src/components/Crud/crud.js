// import Vue from 'vue'

function CRUD(options) {
  /**
   * @idField  id字段名
   * @listName  列表字段名
   * @title  标题
   * @url  请求数据的url
   * @data  表格数据
   * @query  查询数据的参数
   * @form  Form 表单
   * @sort  排序规则，默认 id 降序， 支持多字段排序 ['id,desc', 'createTime,asc']
   */
  const defaultOptions = {
    tag: 'default',
    idField: 'id',
    listName: 'list',
    title: '',
    url: '',
    data: [],
    query: {},
    form: {},
    sort: ['id,desc']
  }
  options = mergeOptions(defaultOptions, options)
}

function mergeOptions(src, opts) {
  // const optsRet = {
  //   ...src
  // }
  // for(const key in src){
  //   if(optsRet)
  // }
}
CRUD()
