import axios from "axios";

export const NOT_EKLE_ACTIONS = Object.freeze({
  fetchStart: "NOT_EKLE_TALEP_EDILDI",
  fetchSuccess: "NOT_EKLENDI",
  fetchError: "NOT_EKLENEMEDI"
});
export const NOT_SIL_ACTIONS = Object.freeze({
  fetchStart: "NOT_SIL_TALEP_EDILDI",
  fetchSuccess: "NOT_SILINDI",
  fetchError: "NOT_SILINEMEDI"
})

export const NOTLARI_GETIR = "NOTLARI_GETIR"


export function notEkle(not) {
  // ...

  return {type: NOT_EKLE_ACTIONS.fetchSuccess, payload: not}
}

export function notSil(notId) {
  // ...
  return {type: NOT_SIL_ACTIONS.fetchSuccess, payload: notId}
}

export const notEkleAPI = (yeniNot) => dispatch => {
  dispatch({type: NOT_EKLE_ACTIONS.fetchStart})
  axios
    .post("https://httpbin.org/anything", yeniNot)
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data)
        console.log(JSON.parse(res.data.data))

        // res.data objesi içerisinden ihtiyaç duyduğunuz değeri bulun ve oluşturduğunuz notEkle ile dispatch edin
        dispatch(notEkle(JSON.parse(res.data.data)))
      }
    })
    .catch((error) => dispatch({type: NOT_EKLE_ACTIONS.fetchError, payload: error}));
}

export const notSilAPI = (id) => dispatch => {
  dispatch({type: NOT_SIL_ACTIONS.fetchStart})
  axios
    .delete("https://httpbin.org/anything", { data: id })
    .then((res) => {
      if (res.status === 200) {
        dispatch({type: NOT_SIL_ACTIONS.fetchSuccess, payload: res.data.data})
        // res.data objesi içerisinden ihtiyaç duyduğunuz değeri bulun ve oluşturduğunuz notSil ile dispatch edin 
      }
    })
    .catch((error) => dispatch({type: NOT_SIL_ACTIONS.fetchError, payload: error}));
}

export const notlariGetir = () => {

  return {type: NOTLARI_GETIR}
}