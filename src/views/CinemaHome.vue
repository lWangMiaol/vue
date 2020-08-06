<template>
  <div>{{data}} </div>
</template>

<script>
import {instance} from "@/utils/http"
export default {
    data(){
        return {
            data:""
        }
    },
    created(){
        instance.get("/gateway/?cinemaId="+this.$route.params.id+"&k=7580118",{
            headers:{
                'X-Host': 'mall.film-ticket.cinema.info'
            }
        }).then(res=>{
            console.log(res)
            // this.data=res.data.data.cinema.cinemaId
        })
        instance.get("/gateway/?cinemaId="+this.$route.params.id+"&k=9940068",{
              headers:{
                'X-Host': 'mall.film-ticket.cinema.info'
            }
        }).then(res=>{
            console.log(res)
        })
    }
}

</script>

<style lang='scss' scoped>

</style>
