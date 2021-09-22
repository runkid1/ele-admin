import Vue from 'vue'
import { initData } from '@/api/data'

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
  const data = {
    ...options,
    page: {
      page: 1,
      size: 10,
      total: 0
    }
  }
  const crud = Object.assign({}, data)
  const methods = {
    toQuery(pageDefault = true) {
      if (pageDefault) {
        crud.page.page = 1
      }
      crud.refresh()
    },
    refresh() {
      if (!callVmhook(crud, CRUD.callVmhook.beforeRefresh)) {
        return
      }
      return new Promise((resolve, reject) => {
        crud.loading = true
        const paramsData = crud.getQueryParams()
        initData(crud.url, paramsData).then(data => {
          const table = crud.getTable()
          if (table && table.lazy) {
            table.store.states.treeData = {}
            table.store.states.lazyTreeNodeMap = {}
          }
          crud.page.total = data.data.count
          crud.data = data.data
          // crud.resetDataStatus()
        })
      })
    },
    getQueryParams() {
      Object.key(crud.query).length !== 0 && Object.key(crud.query).forEach(item => {
        if (crud.query[item] === null || crud.query[item] === '') crud.query[item] = undefined
      })
      return {
        pageIndex: crud.page.page,
        pageCount: crud.page.size,
        sort: crud.sort,
        ...crud.query
      }
    },
    getTable() {
      return this.findVM('presenter').$refs.table
    },
    // resetDataStatus(){
    //   const dataStatus={}
    //   function resetStatus(datas){
    //     datas&&datas.forEach(e=>{
    //       dataStatus[crud.getDataId(e)]={
    //         delete:0,
    //         edit:0
    //       }
    //       if(e.children){
    //         resetStatus(e.children)
    //       }
    //     })
    //   }
    //   resetStatus(crud.data[crud.listName])
    //   crud.dataStatus=dataStatus
    // },
    getDataId(data) {
      return data[this.idField] || data.aid
    }
  }
  Vue.observable(crud)
  Object.assign(crud, methods)
}

function mergeOptions(src, opts) {
  const optsRet = {
    ...src
  }
  for (const key in src) {
    if (Object.prototype.hasOwnProperty.call(opts, key)) {
      optsRet[key] = opts[key]
    }
  }
  return optsRet
}
