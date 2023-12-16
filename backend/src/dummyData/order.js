const orderEntries = [
  {
    date: new Date(),
    items: [
      {
        medicine: "652a6ac4e5d17c29140f6d4f",
        quantity: 2,
        price: 5,
        name: "Paracetamol",
      },
    ],
    totalPrice: 10,
    status: "Shipped",
    patient: "65516be8a5e03db59c0d9a35",
    number: 1,
    address: "1234 Main St",
  },
  {
    date: new Date(),
    items: [
      {
        medicine: "652a6ac4e5d17c29140f6d52",
        quantity: 3,
        price: 7,
        name: "Salbutamol",
      },
    ],
    totalPrice: 21,
    status: "Delivered",
    patient: "65516be8a5e03db59c0d9a35",
    number: 2,
    address: "1234 Main St",
  },
  {
    date: new Date(),
    items: [
      {
        medicine: "652a6ac4e5d17c29140f6d53",
        quantity: 1,
        price: 8,
        name: "Diazepam",
      },
      {
        medicine: "652a6ac4e5d17c29140f6d51",
        quantity: 2,
        price: 6,
        name: "Omeprazole",
      },
    ],
    totalPrice: 20,
    status: "Pending",
    patient: "65516be8a5e03db59c0d9a35",
    number: 3,
    address: "1234 Main St",
  },
  {
    date: new Date(),
    items: [
      {
        medicine: "652a6ac4e5d17c29140f6d54",
        quantity: 2,
        price: 4,
        name: "Simvastatin",
      },
      {
        medicine: "652a6ac4e5d17c29140f6d58",
        quantity: 3,
        price: 9,
        name: "Ciprofloxacin",
      },
    ],
    totalPrice: 26,
    status: "Pending",
    patient: "65516be8a5e03db59c0d9a35",
    number: 4,
    address: "1234 Main St",
  },
  {
    date: new Date(),
    items: [
      {
        medicine: "652a6ac4e5d17c29140f6d55",
        quantity: 1,
        price: 10,
        name: "Metformin",
      },
    ],
    totalPrice: 10,
    status: "Pending",
    patient: "65516be8a5e03db59c0d9a35",
    number: 5,
    address: "1234 Main St",
  },
  // Add more order entries as needed
];

module.exports = orderEntries;
