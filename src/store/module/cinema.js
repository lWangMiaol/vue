import {instance} from "@/utils/http"
const cinema = {
    //必须加入命名空间
    namespaced:true,
    state: {
        cinemaList: []
    },
    mutations: {
        setCinemaList(state, cinemaList) {
            state.cinemaList = cinemaList
        },
    },
    actions: {
        getCinemaListAction(context,cityId) {
            instance(`/gateway?cityId=${cityId}&ticketFlag=1&k=3469968`, {
                headers: {
                    'X-Host': 'mall.film-ticket.cinema.list'
                }
            }).then(res => {
                // this.cinemaList = res.data.data.cinemas
                context.commit("setCinemaList", res.data.data.cinemas)
            })
        }
    },
    getters:{
        getCinemaListFive(state) {
            return state.cinemaList.slice(0, 5);
          },
    },
}
export default cinema;