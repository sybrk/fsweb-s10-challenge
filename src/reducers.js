import { NOTLARI_GETIR, NOT_EKLE_ACTIONS, NOT_SIL_ACTIONS } from "./actions";
import { toast } from 'react-toastify';
const s10chLocalStorageKey = "s10ch";

const baslangicDegerleri = {
  notlar: [
    {
      id: "75g1IyB8JLehAr0Lr5v3p",
      date: "Fri Feb 03 2023 09:40:27 GMT+0300 (GMT+03:00)",
      body: "Bugün hava çok güzel!|En iyi arkadaşımın en iyi arkadaşı olduğumu öğrendim :)|Kedim iyileşti!",
    },
  ],
};

function localStorageStateYaz(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function localStorageStateOku(key) {
  return JSON.parse(localStorage.getItem(key));
}

function baslangicNotlariniGetir(key) {
  const eskiNotlar = localStorage.getItem(key);

  if (eskiNotlar) {
    return localStorageStateOku(key);
  } else {
    return baslangicDegerleri
  }
}

export const reducer = (state= baslangicDegerleri, action) => {
  switch (action.type) {
    case NOT_EKLE_ACTIONS.fetchStart:
      
      return(
        {
          ...state, isFetching: true, error: ""
        }
      )
    case NOT_EKLE_ACTIONS.fetchSuccess:
      let eskiNotlar = localStorageStateOku(s10chLocalStorageKey);
      let yeniNotlar = eskiNotlar ? [...eskiNotlar, action.payload] : [action.payload]
      
      localStorageStateYaz(s10chLocalStorageKey, yeniNotlar)
      toast("Not Eklendi")
      return(
        {
          ...state, isFetching: false, notlar: yeniNotlar, error: ""
        }
      )
    case NOT_EKLE_ACTIONS.fetchError:
      toast(`Not eklemede hata ${action.payload}`)
      return({
        ...state, isFetching: false, error: action.payload
      })
    case NOTLARI_GETIR:
      let notlar;
      let storageNotlar = localStorageStateOku(s10chLocalStorageKey);
      if (storageNotlar) {
        notlar = storageNotlar
      } else {
        notlar = baslangicDegerleri;
      }
      return({
        ...state, notlar: notlar
      })
    case NOT_SIL_ACTIONS.fetchStart:
      
      return(
        {
          ...state, isFetching: true, error: ""
        }
      )
    case NOT_SIL_ACTIONS.fetchSuccess:
      const localNotlar = localStorageStateOku(s10chLocalStorageKey);
      if (localNotlar.length) {
        const yeniLocalNotlar = localNotlar.filter(not => not.id !== action.payload);
        localStorageStateYaz(s10chLocalStorageKey, yeniLocalNotlar)
      }
      toast("Not silindi")
      return({
        ...state, notlar: state.notlar.filter(not => not.id !== action.payload), isFetching: false, error: ""
      })
    case NOT_SIL_ACTIONS.fetchError:
      toast(`Not silmede hata ${action.payload}`)
      return({
        ...state, isFetching: false, error: action.payload
      })
      
    default:
      return state
  }

}