
// import { learningService } from 'services/overViewService';


let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    // startd: 2,
    // startm: 5,
    // starty: 2022,
    // endd: 2,
    // endm: 5,
    // endy: 2022
    start: '2023-01-06'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr
  }
]

export function createEventId() {
  return String(eventGuid++)
}

export const dataEven = [
  {
    backgroundColor: "#ffffff",
    borderColor
      :
      "#989da6",
    className
      :
      "expired right",
    coursetype
      :
      "T",
    end
      :
      "2023-01-02",
    endd
      :
      2,
    endhh
      :
      6,
    endm
      :
      5,
    endmin
      :
      30,
    endy
      :
      2022,
    id
      :
      6129,
    start
      :
      "2023-01-02",
    startd
      :
      2,
    starthh
      :
      6,
    startm
      :
      5,
    startmin
      :
      25,
    starty
      :
      2022,
    title
      :
      "C1"
  },
  {
    backgroundColor: "#ffffff",
    borderColor
      :
      "#989da6",
    className
      :
      "expired right",
    coursetype
      :
      "T",
    end
      :
      "2022-12-02",
    endd
      :
      2,
    endhh
      :
      6,
    endm
      :
      5,
    endmin
      :
      30,
    endy
      :
      2022,
    id
      :
      6129,
    start
      :
      "2022-12-02",
    startd
      :
      2,
    starthh
      :
      6,
    startm
      :
      5,
    startmin
      :
      25,
    starty
      :
      2022,
    title
      :
      "C1111"
  }

]