const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

class MyDate extends Date {
  augmentNum(num) {
    const str = num.toString()
    return str.length < 2 ? "0" + str : str
  }

  getUTCWeekDayName() {
    return WEEKDAYS[super.getUTCDay()]
  }

  getUTCMonth() {
    return this.augmentNum(super.getUTCMonth()+1)
  }

  getUTCDate() {
    return this.augmentNum(super.getUTCDate())
  }

  getUTCHoursInAmPm() {
    let hours = this.augmentNum(super.getUTCHours())
    hours = hours % 12;
    return this.augmentNum(hours ? hours : 12)
  }

  getUTCMinutes() {
    return this.augmentNum(super.getUTCMinutes())
  }

  getUTCSeconds() {
    return this.augmentNum(super.getUTCSeconds())
  }

  getUTCAmPm() {
    return super.getUTCHours() >= 12 ? "PM" : "AM"
  }
}

var app = new Vue({
    el: '#app',
    data: {
      timestamp: parseInt((new Date()).getTime() / 1000),
      utcTimeString: "",
      localTimeString: ""
    },
    mounted() {
      M.AutoInit()
      this.onSubmit()
      const tsInputField = this.$refs["timestamp_input"]
      tsInputField.focus()
      tsInputField.select()
    },
    methods: {
      onSubmit() {
        let date = new MyDate(this.timestamp*1000)
        this.utcTimeString = `${date.getUTCWeekDayName()}, ${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()},  
        ${date.getUTCHoursInAmPm()}:${date.getUTCMinutes()}:${date.getUTCSeconds()} ${date.getUTCAmPm()}`

        date = new MyDate(date.getTime() - date.getTimezoneOffset()*60*1000)
        this.localTimeString = `${date.getUTCWeekDayName()}, ${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()},  
        ${date.getUTCHoursInAmPm()}:${date.getUTCMinutes()}:${date.getUTCSeconds()} ${date.getUTCAmPm()} ${date.toTimeString().slice(9)}`
      },
    },
})
