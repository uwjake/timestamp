const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

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
    },
    mounted() {
      const tsInputField = this.$refs["timestamp_input"]
      tsInputField.focus()
      tsInputField.select()
    },
    methods: {
      addOneDay() {
        this.timestamp += 86400
      },
      subtractOneDay() {
        this.timestamp -= 86400
      },
    },

    computed: {
      utcTimeString() {
        const date = new MyDate(this.timestamp*1000)
        return utcTimeString = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}, 
          ${date.getUTCHoursInAmPm()}:${date.getUTCMinutes()}:${date.getUTCSeconds()} ${date.getUTCAmPm()}, 
          ${date.getUTCWeekDayName()}`
      },
      localTimeString() {
        const date =  new MyDate(this.timestamp*1000 - new Date().getTimezoneOffset()*60*1000)
        return localTimeString = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()},  
          ${date.getUTCHoursInAmPm()}:${date.getUTCMinutes()}:${date.getUTCSeconds()} ${date.getUTCAmPm()}, 
          ${date.getUTCWeekDayName()}, ${date.toTimeString().slice(9)}`
      },
    }
})
