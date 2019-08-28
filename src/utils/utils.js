export default {
  formateDate: (time) => {
    if (!time) {
      alert('hello')
      return ''
    }
    let date = new Date(time)
    return date.getFullYear() + '-' +
      (date.getMonth()+1) + '-' +
      date.getDate() + '  ' +
      date.getHours() + ':' +
      (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':' +
      (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  },

  pagination(data, callback) {
    return {
      // 属性名是根据 pagination 组件的属性名写的
      onChange: (current) => {
        callback(current)
      },
      current: data.result.page, // 从数据里面去取
      pageSize: data.result.page_size,
      total: data.result.total_count,
      showTotal: () => {
        return `共${data.result.total_count}条`
      },
      showQuickJumper: true
    }
  }
}