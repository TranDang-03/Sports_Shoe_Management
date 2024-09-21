import moment from "moment/moment";

export const cardsData = [
  {
    title: "Revenue",
    change: 24,
    amount: 42056,
  },
  {
    title: "Orders",
    change: -14,
    amount: 52125.03,
  },
  {
    title: "Expenses",
    change: 18,
    amount: 1216.5,
  },
  {
    title: "Profit",
    change: 12,
    amount: 10125.0,
  },
];

export const ordersData = [
  {
    name: "Skatebnoard",
    type: "Illustration",
    items: 58,
    change: 290,
  },
  {
    name: "Language courses",
    type: "Illustration",
    items: 12,
    change: 72,
  },
  {
    name: "Office Collaboration",
    type: "Illustration",
    items: 7,
    change: 70,
  },
  {
    name: "Robot",
    type: "Illustration",
    items: 21,
    change: 15,
  },
];

//* get the value in group number format
export const groupNumber = (number) => {
  return parseFloat(number.toFixed(2)).toLocaleString("en", {
    useGrouping: true,
  });
};

//* calendar Events
let eventGuid = 0;
let todayStr = moment().format("YYYY-MM-DD"); // YYYY-MM-DD of today
export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: "Lunch Pary",
    start: todayStr + "T09:00:00",
  },
  {
    id: createEventId(),
    title: "Timed event",
    start: moment(todayStr).add(1, "days").format("YYYY-MM-DD") + "T16:00:00",
  },
  {
    id: createEventId(),
    title: "Head Meetup",
    start: moment(todayStr).add(2, "days").format("YYYY-MM-DD") + "T20:00:00",
  },
  {
    id: createEventId(),
    title: "VC Meeting",
    start: moment(todayStr).add(3, "days").format("YYYY-MM-DD") + "T09:00:00",
  },
  {
    id: createEventId(),
    title: "Payment Shedules",
    start: moment(todayStr).add(5, "days").format("YYYY-MM-DD") + "T13:00:00",
  },
  {
    id: createEventId(),
    title: "VC Meeting",
    start: moment(todayStr).add(6, "days").format("YYYY-MM-DD") + "T13:00:00",
  },
];

export function createEventId() {
  return String(eventGuid++);
}

// * tasks
export const boardData = {
  columns: [
    {
      id: 1,
      title: "Backlog",
      cards: [
        {
          id: 1,
          title: "Database Setup",
          description: "Firebase Integration",
        },
        {
          id: 2,
          title: "Data Flow",
          description: "Setup Diagram with other developers",
        },
      ],
    },
    {
      id: 2,
      title: "TODO",
      cards: [
        {
          id: 9,
          title: "Data Table Page",
          description: "Server side Pagination",
        },
      ],
    },
    {
      id: 3,
      title: "Doing",
      cards: [
        {
          id: 10,
          title: "Full Calendar Extension",
          description: "Make new events and store in global states",
        },
        {
          id: 11,
          title: "Custom Kanban Board",
          description:
            "Setup react-kanban dep within Dashboard as seperate page",
        },
      ],
    },
    {
      id: 4,
      title: "Completed",
      cards: [
        {
          id: 12,
          title: "Vite Server Setup",
          description: "Configure required modules and starters",
        },
        {
          id: 13,
          title: "Modular structre",
          description:
            "Write css in form of modules to reduce the naming conflicts",
        },
      ],
    },
  ],
};

// * user table data
export const userData = [
  {
    id: 1,
    ma_san_pham: "SP001",
    ten_san_pham: "Sản phẩm 1",
    ten_thuong_hieu: "Adidas",
    danh_sach_ten_danh_muc: ["Giày đá bóng", "Giày chạy bộ"],
    trang_thai: 1,
  },
  {
    id: 2,
    ma_san_pham: null,
    ten_san_pham: "Sản phẩm 2",
    ten_thuong_hieu: "Nike",
    danh_sach_ten_danh_muc: ["Giày chạy bộ"],
    trang_thai: 1,
  },
  {
    id: 3,
    ma_san_pham: "SP003",
    ten_san_pham: "Sản phẩm 3",
    ten_thuong_hieu: "Adidas",
    danh_sach_ten_danh_muc: ["Giày chạy bộ"],
    trang_thai: 1,
  },
  {
    id: 4,
    ma_san_pham: "SP004",
    ten_san_pham: "Sản phẩm 4",
    ten_thuong_hieu: "Nike",
    danh_sach_ten_danh_muc: ["Giày chạy bộ"],
    trang_thai: 1,
  },
  {
    id: 5,
    ma_san_pham: "SP005",
    ten_san_pham: "Sản phẩm 5",
    ten_thuong_hieu: "Adidas",
    danh_sach_ten_danh_muc: ["Giày bóng rổ"],
    trang_thai: 1,
  },
  {
    id: 6,
    ma_san_pham: "SP006",
    ten_san_pham: "Sản phẩm 6",
    ten_thuong_hieu: "Nike",
    danh_sach_ten_danh_muc: ["Giày chạy bộ"],
    trang_thai: 1,
  },
  {
    id: 7,
    ma_san_pham: "SP007",
    ten_san_pham: "Sản phẩm 7",
    ten_thuong_hieu: "Adidas",
    danh_sach_ten_danh_muc: ["Giày đá bóng", "Giày chạy bộ"],
    trang_thai: 1,
  },
  {
    id: 8,
    ma_san_pham: "SP008",
    ten_san_pham: "Sản phẩm 8",
    ten_thuong_hieu: "Nike",
    danh_sach_ten_danh_muc: ["Giày chạy bộ"],
    trang_thai: 1,
  },
  {
    id: 9,
    ma_san_pham: "SP009",
    ten_san_pham: "Sản phẩm 9",
    ten_thuong_hieu: "Adidas",
    danh_sach_ten_danh_muc: ["Giày đá bóng", "Giày tennis"],
    trang_thai: 1,
  },
  {
    id: 10,
    ma_san_pham: "SP010",
    ten_san_pham: "Sản phẩm 10",
    ten_thuong_hieu: "Nike",
    danh_sach_ten_danh_muc: ["Giày chạy bộ", "Giày bóng rổ"],
    trang_thai: 1,
  },
  {
    id: 11,
    ma_san_pham: "SP011",
    ten_san_pham: "Sản phẩm 11",
    ten_thuong_hieu: "Adidas",
    danh_sach_ten_danh_muc: [
      "Giày đá bóng",
      "Giày chạy bộ",
      "Giày thể thao nam",
    ],
    trang_thai: 1,
  },
  {
    id: 12,
    ma_san_pham: "SP012",
    ten_san_pham: "Sản phẩm 12",
    ten_thuong_hieu: "Nike",
    danh_sach_ten_danh_muc: [
      "Giày chạy bộ",
      "Giày thể thao nữ",
      "Giày thể thao nam",
    ],
    trang_thai: 1,
  },
  // Bạn có thể thêm các sản phẩm khác ở đây với danh mục tương ứng
];
