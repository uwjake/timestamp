class DatetimeModel {
  constructor(type, data) {
    this.utcTimeObj = {}
    this.localTimeObj = {}
    this.init(type, data)
  }

  init(type, data) {
    switch (type) {
      case "local":
        break;
      case "utc":
        this.fromUTCTimeObj(data)
        break;
      default:
        this.fromTimestamp(data)
    }
  }

  fromTimestamp(timestamp) {
    if (timestamp) {
      this.setData(new Date(timestamp*1000))
    } else {
      this.setData(new Date(this.timestamp*1000))
    }
  }

  fromUTCTimeObj(utcTimeObj) {
    if (utcTimeObj) {
      this.setData(new Date(
          utcTimeObj.year,
          utcTimeObj.month-1,
          utcTimeObj.day,
          utcTimeObj.hour,
          utcTimeObj.minute,
          utcTimeObj.second,
        )
      )
    } else {
      this.setData(new Date(this.utcTimeObj))
    }
  }

  fromLocalTimeObj(localTimeObj) {
    if (localTimeObj) {
      this.setData(new Date(
          localTimeObj.year,
          localTimeObj.month-1,
          localTimeObj.day,
          localTimeObj.hour,
          localTimeObj.minute,
          localTimeObj.second,
        )
      )
    } else {
      this.setData(new Date(this.localTimeObj))
    }
  }

  setData(date) {
      this.timestamp = date.getTime()/1000

      this.utcTimeObj.year = date.getUTCFullYear(),
      this.utcTimeObj.month = date.getUTCMonth()+1,
      this.utcTimeObj.day = date.getUTCDate(),
      this.utcTimeObj.hour = date.getUTCHours(),
      this.utcTimeObj.minute = date.getUTCMinutes(),
      this.utcTimeObj.second = date.getUTCSeconds()

      this.localTimeObj.year = date.getFullYear(),
      this.localTimeObj.month = date.getMonth()+1,
      this.localTimeObj.day = date.getDate(),
      this.localTimeObj.hour = date.getHours(),
      this.localTimeObj.minute = date.getMinutes(),
      this.localTimeObj.second = date.getSeconds()
    }
}

var app = new Vue({
    el: '#app',
    data: {
      datetimeModel: new DatetimeModel("timestamp", parseInt((new Date()).getTime() / 1000))
    },
    mounted() {
      M.AutoInit()
      // this.timestamp = parseInt((new Date()).getTime() / 1000)
      // this.onSubmit()
    },
    methods: {
      onSubmit(from) {
        // console.log(this.timestamp)
        // const datetimeModel = new DatetimeModel("timestamp", this.timestamp)
        console.log(from)
        this.datetimeModel.init(from)
        console.log(this.datetimeModel)
        // this.utcTimeString = this.getUtcTimeObjFromTimestamp(this.timestamp)
        // console.log(this.utcTimeString)
      },

      getUtcTimeObjFromTimestamp(timestamp) {
        var date = new Date(timestamp*1000)
        var datetime = {
          "year": date.getUTCFullYear(),
          "month": date.getUTCMonth(),
          "day": date.getUTCDate(),
          "hour": date.getUTCHours(),
          "minute": date.getUTCMinutes(),
          "second": date.getUTCSeconds()
        }
        return datetime
      },

    },
})
