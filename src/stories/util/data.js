/** Sample data shared across stories. Story-only — never exported from the kit. */

export const PEOPLE = [
  { name: "Kristin Watson", email: "kristin.watson@gmail.com" },
  { name: "Ronald Richards", email: "ronald.r@gmail.com" },
  { name: "Annette Black", email: "annette@gmail.com" },
  { name: "Jacob Elberg", email: "jacob.j@gmail.com" },
  { name: "Jenny Wilson", email: "jenny.w@gmail.com" },
  { name: "Guy Hawkins", email: "guy.hawkins@gmail.com" },
  { name: "Devon Lane", email: "devon.lane@gmail.com" }
];

export const ORDERS = [
  {
    id: "#PAD4615",
    date: "Jan 25, 2023",
    status: "paid",
    person: PEOPLE[3],
    billing: "Monthly"
  },
  {
    id: "#PAD4620",
    date: "Jan 4, 2023",
    status: "refunded",
    person: PEOPLE[0],
    billing: "Annually"
  },
  {
    id: "#PAD4621",
    date: "Dec 19, 2022",
    status: "paid",
    person: PEOPLE[1],
    billing: "Monthly"
  },
  {
    id: "#PAD4624",
    date: "Nov 21, 2022",
    status: "cancelled",
    person: PEOPLE[2],
    billing: "Monthly"
  },
  {
    id: "#PAD4630",
    date: "Nov 2, 2022",
    status: "pending",
    person: PEOPLE[4],
    billing: "Annually"
  }
];

export const STATUS_TONE = {
  paid: { tone: "success", icon: "check-circle", label: "Paid" },
  refunded: { tone: "neutral", icon: "rotate-ccw", label: "Refunded" },
  cancelled: { tone: "danger", icon: "x-circle", label: "Cancelled" },
  pending: { tone: "warning", icon: "clock", label: "Pending" }
};

export const FILES = [
  { name: "lena-polishko-SDJgdyN2mBc.jpg", type: "JPG", ratio: "Square", time: "3:37 AM" },
  { name: "neom-bA32w6lebJg-unsplash.jpg", type: "JPG", ratio: "Landscape", time: "11:46 PM" },
  { name: "dibakar-roy-OmMieQRaLCo.jpg", type: "JPG", ratio: "Square", time: "11:34 PM" },
  { name: "annual-report-2023-final.pdf", type: "PDF", ratio: "A4", time: "9:02 AM" }
];
