

var app = new Vue({
    el: '#app',
    data: {
      timestamp: parseInt((new Date()).getTime() / 1000),
      utcTimeString: "",
      localTimeString: ""
    },
    mounted() {
      M.AutoInit()
      // this.timestamp = parseIt((new Date()).getTime() / 1000)
      this.onSubmit()
    },
    methods: {
      onSubmit() {
        const date = new Date(this.timestamp*1000)
        this.utcTimeString = date.toUTCString()
        this.localTimeString = date.toTimeString()
      },


    },
})
