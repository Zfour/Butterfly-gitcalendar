
const calendar = new Vue({
        el: '#calendar',
        data: {
			
		//---------------------------------------------------------------//	
			
			user:'Zfour', //用户名称,请填写你的github用户名称
			
			
		//---------------------------------------------------------------//		
			
			
			
		    fixed:'fixed',
			px:'px',
			x:'',
            y:'',
            span1:'',
            span2:'',
			month:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
            monthchange:[],
            oneyearbeforeday:'',
            thisday:'',
            amonthago:'',
            aweekago:'',
            weekdatacore:0,
            datacore: 0,
            total:0,
            datadate: '',
            data: [],
            firstweek:[],
            lastweek:[],
            beforeweek:[],
            thisweekdatacore:0,
            mounthbeforeday:0,
            mounthfirstindex:0,
            crispedges:'crispedges',
			thisdayindex:0,
			amonthagoindex:0,
			amonthagoweek:[],
			firstdate:[],
			first2date:[],
            purple: [
            '#ebedf0',
            '#fdcdec',
            '#fc9bd9',
            '#fa6ac5',
            '#f838b2',
            '#f5089f',
            '#c4067e',
            '#92055e',
            '#540336',
            '#48022f',
            '#30021f',
			],
		    green: [//绿色
            '#ebedf0',
            '#f0fff4',
            '#dcffe4',
            '#bef5cb',
            '#85e89d',
            '#34d058',
            '#28a745',
            '#22863a',
            '#176f2c',
            '#165c26',
            '#144620'
             ],
			 blue:[
			'#ebedf0',
            '#f1f8ff',
            '#dbedff',
            '#c8e1ff',
            '#79b8ff',
            '#2188ff',
            '#0366d6',
            '#005cc5',
            '#044289',
            '#032f62',
            '#05264c',
			 ],
             color: [ //这里是颜色配置，当前为蓝色，若需更换请对应数组内容进行替换
            '#ebedf0',
            '#fdcdec',
            '#fc9bd9',
            '#fa6ac5',
            '#f838b2',
            '#f5089f',
            '#c4067e',
            '#92055e',
            '#540336',
            '#48022f',
            '#30021f',
             ]
        },
        methods:{
			selectStyle(data,event){
                $('.angle-wrapper').show();
                this.span1 = data.date;
                this.span2 = data.count;
                this.x = event.clientX -100;
                this.y = event.clientY -60;
                //console.log(event);
            },
            outStyle(){
                $('.angle-wrapper').hide();
                //console.log();
            },
            thiscolor(x){
                if(x===0){
                    let i = parseInt(x/2);
                    return this.color[0]
                }
                else if(x<2){
                    return this.color[1]
                }
                else if(x<20){
                    let i = parseInt(x/2) ;
                    return this.color[i]
                }
                else{
                    return this.color[9]
                }
            },

        }
    })

    let githubapiurl = "https://githubapi.ryanchristian.dev/user/"+calendar.user

    $(function () {
        $.ajax({
            //请求方式
            type: "GET",
            //文件位置
            url: githubapiurl,
            //返回数据格式为json,也可以是其他格式如
            dataType: "json",
            beforeSend: function (XMLHttpRequest) {
                //alert('远程调用开始...');


            },
            //请求成功后要执行的函数，拼接html
            success: function (data) {
                //console.log(data);
                calendar.data = data.contributions;
                calendar.total = data.total;
                calendar.firstweek= data.contributions[0];
                calendar.lastweek= data.contributions[52];
                calendar.beforeweek= data.contributions[51];
                calendar.thisdayindex = calendar.lastweek.length - 1;
                calendar.thisday = calendar.lastweek[calendar.thisdayindex].date;
                calendar.oneyearbeforeday = calendar.firstweek[0].date;
                calendar.amonthagoindex =  6 - (30-calendar.lastweek.length)%7;
                calendar.mounthfirstindex = 52 - Math.ceil((30- calendar.lastweek.length*1)/7);
                calendar.amonthagoweek =  calendar.data[calendar.mounthfirstindex];
                calendar.amonthago = calendar.amonthagoweek[calendar.amonthagoindex].date;
                addlastmonth();
				reloadmonth(calendar.thisday);
                function addlastmonth(){
                    if(calendar.thisdayindex === 0){
                        thisweekcore(52);
                        thisweekcore(51);
                        thisweekcore(50);
                        thisweekcore(49);
                        thisweekcore(48);
                        calendar.firstdate = calendar.data[47]
                        calendar.thisweekdatacore += calendar.firstdate[6].count
                        //console.log('月'+ calendar.firstdate[6].date);
                    }
                    else {
                        thisweekcore(52);
                        thisweekcore(51);
                        thisweekcore(50);
                        thisweekcore(49);
                        calendar.first2date = calendar.data[48]
                        thisweek2core();
                    }

                };
                function thisweek2core(){for( let i=calendar.thisdayindex-2;i<calendar.first2date.length;i++){

                    calendar.thisweekdatacore += calendar.first2date[i].count*1;
                    //console.log('月'+ calendar.first2date[i].date);

                }};
                function thisweekcore(index){for( let item of calendar.data[index]){

                    calendar.thisweekdatacore += item.count*1;
                    //console.log('月'+ item.date);

                }};
                function addlastweek(){for( let item of calendar.lastweek){

                    calendar.weekdatacore += item.count*1;
                    //console.log('日'+ item.date);

                }};
				function reloadmonth(thisday){
                  let  str = thisday.substring(5, 7);
                     let arr = calendar.month.splice(str,12-str*1);
                     //console.log(arr);
                    calendar.monthchange = arr.concat(calendar.month)
                };
                function addbeforeweek(){for( let i=calendar.thisdayindex;i<calendar.beforeweek.length;i++){
                    calendar.weekdatacore += calendar.beforeweek[i].count*1;
                    //console.log('日'+ calendar.beforeweek[i].date);

                }};
                if(calendar.thisdayindex === 6 ){
                    calendar.aweekago  = calendar.lastweek[0].date;
                    addlastweek();
                }else{
                    lastweek = data.contributions[51];
                    calendar.aweekago  = lastweek[calendar.thisdayindex].date;
                    addlastweek();
                    addbeforeweek();
                };

            }
        });
    });