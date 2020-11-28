const calendar = new Vue({
  el: '#calendar',
  data: {
    simplemode: true, //打开时使用canvas绘制gitcalendar，关闭时使用svg绘制gitcalendar
	                  //canvas：dom数少，但图像会发生模糊，自适应一般  svg：dom数多，图像清晰，自适应更佳  
	                  
    user: 'Zfour', //这里填写你的github用户名
    
	fixed: 'fixed',
    px: 'px',
    x: '',
    y: '',
    span1: '',
    span2: '',
    month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthchange: [],
    oneyearbeforeday: '',
    thisday: '',
    amonthago: '',
    aweekago: '',
    weekdatacore: 0,
    datacore: 0,
    total: 0,
    datadate: '',
    data: [],
    positionplusdata: [],
    firstweek: [],
    lastweek: [],
    beforeweek: [],
    thisweekdatacore: 0,
    mounthbeforeday: 0,
    mounthfirstindex: 0,
    crispedges: 'crispedges',
    thisdayindex: 0,
    amonthagoindex: 0,
    amonthagoweek: [],
    firstdate: [],
    first2date: [],
    montharrbefore: [],
    monthindex: 0,
    purple: ['#ebedf0', '#fdcdec', '#fc9bd9', '#fa6ac5', '#f838b2', '#f5089f', '#c4067e', '#92055e', '#540336', '#48022f', '#30021f',],
    green: ['#ebedf0', '#f0fff4', '#dcffe4', '#bef5cb', '#85e89d', '#34d058', '#28a745', '#22863a', '#176f2c', '#165c26', '#144620'],
    blue: ['#ebedf0', '#f1f8ff', '#dbedff', '#c8e1ff', '#79b8ff', '#2188ff', '#0366d6', '#005cc5', '#044289', '#032f62', '#05264c',],
    color: ['#ebedf0', '#fdcdec', '#fc9bd9', '#fa6ac5', '#f838b2', '#f5089f', '#c4067e', '#92055e', '#540336', '#48022f', '#30021f',]
  },
  methods: {
    selectStyle(data, event) {
      $('.angle-wrapper').show();
      this.span1 = data.date;
      this.span2 = data.count;
      this.x = event.clientX - 100;
      this.y = event.clientY - 60
    },
    outStyle() {
      $('.angle-wrapper').hide()
    },
    thiscolor(x) {
      if (x === 0) {
        let i = parseInt(x / 2);
        return this.color[0]
      } else if (x < 2) {
        return this.color[1]
      } else if (x < 20) {
        let i = parseInt(x / 2);
        return this.color[i]
      } else {
        return this.color[9]
      }
    },
  }
});
let githubapiurl = "https://githubapi.ryanchristian.dev/user/" + calendar.user;
$(function () {
  $.ajax({
    type: "GET",
    url: githubapiurl,
    dataType: "json",
    success: function (data) {
      ;
      calendar.data = data.contributions;
      calendar.total = data.total;
      calendar.first2date = calendar.data[48];
      calendar.firstdate = calendar.data[47];
      calendar.firstweek = data.contributions[0];
      calendar.lastweek = data.contributions[52];
      calendar.beforeweek = data.contributions[51];
      calendar.thisdayindex = calendar.lastweek.length - 1;
      calendar.thisday = calendar.lastweek[calendar.thisdayindex].date;
      calendar.oneyearbeforeday = calendar.firstweek[0].date;
      calendar.monthindex = calendar.thisday.substring(5, 7) * 1;
      calendar.montharrbefore = calendar.month.splice(calendar.monthindex, 12 - calendar.monthindex);
      calendar.monthchange = calendar.montharrbefore.concat(calendar.month);
      addweek();
      addlastmonth();

      function responsiveChart() {
        let c = document.getElementById("gitcanvas");
        let cmessage = document.getElementById("gitmessage");
        let ctx = c.getContext("2d");
        c.width = document.getElementById("calendarcanvasbox").offsetWidth;
        let linemaxwitdh = 0.96 * c.width / calendar.data.length;
        c.height = 9 * linemaxwitdh;
        let lineminwitdh = 0.8 * linemaxwitdh;
        let setposition = {
          x: 0.02 * c.width,
          y: 0.025 * c.width
        };
        for (let week in calendar.data) {
          weekdata = calendar.data[week];
          for (let day in weekdata) {
            let dataitem = {date: "", count: "", x: 0, y: 0};
            calendar.positionplusdata.push(dataitem);
            ctx.fillStyle = calendar.thiscolor(weekdata[day].count);
            setposition.y = Math.round(setposition.y * 100) / 100;
            dataitem.date = weekdata[day].date;
            dataitem.count = weekdata[day].count;
            dataitem.x = setposition.x;
            dataitem.y = setposition.y;
            ctx.fillRect(setposition.x, setposition.y, lineminwitdh, lineminwitdh);
            setposition.y = setposition.y + linemaxwitdh
          }
          ;
          setposition.y = 0.025 * c.width;
          setposition.x = setposition.x + linemaxwitdh
        }
        ;
        ctx.font = "600  Arial";
        ctx.fillStyle = '#aaa';
        ctx.fillText("日", 0, 1.9 * linemaxwitdh);
        ctx.fillText("二", 0, 3.9 * linemaxwitdh);
        ctx.fillText("四", 0, 5.9 * linemaxwitdh);
        ctx.fillText("六", 0, 7.9 * linemaxwitdh);
        let monthindexlist = c.width / 24;
        for (let index in calendar.monthchange) {
          ctx.fillText(calendar.monthchange[index], monthindexlist, 0.7 * linemaxwitdh);
          monthindexlist = monthindexlist + c.width / 12
        }
        ;
        cmessage.onmousemove = function (event) {
          $('.angle-wrapper').hide()
        };
        c.onmousemove = function (event) {
          $('.angle-wrapper').hide()
          getMousePos(c, event);
        };

        function getMousePos(canvas, event) {
          var rect = canvas.getBoundingClientRect();
          var x = event.clientX - rect.left * (canvas.width / rect.width);
          var y = event.clientY - rect.top * (canvas.height / rect.height);
          //console.log("x:"+x+",y:"+y);
          for (let item of calendar.positionplusdata) {
            let lenthx = x - item.x;
            let lenthy = y - item.y;
            //console.log(lenthx,lenthy);
            if (0 < lenthx && lenthx < lineminwitdh) {
              if (0 < lenthy && lenthy < lineminwitdh) {
                //console.log(item.date,item.count)
                $('.angle-wrapper').show();
                calendar.span1 = item.date;
                calendar.span2 = item.count;
                calendar.x = event.clientX - 100;
                calendar.y = event.clientY - 60
              }
            }
            //if(0< x - item.x <lineminwitdh&&0< y - item.y <lineminwitdh){
            //console.log(item.count,item.date);
            //}
          }
        }
      }

      responsiveChart();
      $(window).on('resize', responsiveChart);
      window.onscroll = function () {
        $('.angle-wrapper').hide()
      };
      console.log(calendar.positionplusdata)

      function addlastmonth() {
        if (calendar.thisdayindex === 0) {
          thisweekcore(52);
          thisweekcore(51);
          thisweekcore(50);
          thisweekcore(49);
          thisweekcore(48);
          calendar.thisweekdatacore += calendar.firstdate[6].count;
          calendar.amonthago = calendar.firstdate[6].date
        } else {
          thisweekcore(52);
          thisweekcore(51);
          thisweekcore(50);
          thisweekcore(49);
          thisweek2core();
          calendar.amonthago = calendar.first2date[calendar.thisdayindex - 1].date
        }
      };

      function thisweek2core() {
        for (let i = calendar.thisdayindex - 1; i < calendar.first2date.length; i++) {
          calendar.thisweekdatacore += calendar.first2date[i].count
        }
      };

      function thisweekcore(index) {
        for (let item of calendar.data[index]) {
          calendar.thisweekdatacore += item.count
        }
      };

      function addlastweek() {
        for (let item of calendar.lastweek) {
          calendar.weekdatacore += item.count
        }
      };

      function addbeforeweek() {
        for (let i = calendar.thisdayindex; i < calendar.beforeweek.length; i++) {
          calendar.weekdatacore += calendar.beforeweek[i].count
        }
      };

      function addweek() {
        if (calendar.thisdayindex === 6) {
          calendar.aweekago = calendar.lastweek[0].date;
          addlastweek()
        } else {
          lastweek = data.contributions[51];
          calendar.aweekago = lastweek[calendar.thisdayindex + 1].date;
          addlastweek();
          addbeforeweek()
        }
      }
    }
  })
});
if(document.getElementById("calendarcanvasbox").offsetWidth<500){calendar.simplemode=false}