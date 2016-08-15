export const cardList =
  [
    {
      id: 1,
      title: "Read the Book",
      description: "I should read the whole book",
      color: "#BD8D310",
      status: 'in-progress',
      tasks: []
    },
    {
      id: 2,
      title: "Write some code",
      description: "Code along with the samples in the book",
      color : "#3A7E280",
      status: "todo",
      tasks: [
        {
          id: 1,
          name: "Contact List Example",
          done: true
        },
        {
          id: 2,
          name: "Kanban Example",
          done: false
        },
        {
          id: 3,
          name: "My own Experiment",
          done: false
        }
      ]
    }
  ];

