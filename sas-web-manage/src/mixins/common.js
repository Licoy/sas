import dayjs from 'dayjs'

export default{
    data(){
        return {
            g:{ //gobal params
               loading:false,
               _false:false,
               _true:true
            }
        }
    },
    methods: {
        showLoading(content,duration=0){
            this.g.loading = true
            return this.$message.loading(content,duration)
        },
        closeLoading(loadingHide=null){
            this.g.loading = false
            if(loadingHide){
                loadingHide()
            }
        },
        openUrl(url,targer='_blank'){
            window.open(url, targer).location;
        },
        dateFormat(date,format='YYYY年MM月DD日 HH:mm:ss'){
            return dayjs(date).format(format)
        },
        notBlank(s){
            return s && s.trim()!=''
        },
        copy(jsonObject){
            return JSON.parse(JSON.stringify(jsonObject))
        },
        dayjs(){
            return dayjs
        }
    },
}