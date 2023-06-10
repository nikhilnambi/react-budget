import { Container } from "semantic-ui-react";
import "./App.css";
import MainHeader from "./components/MainHeader";
import NewEntryForm from "./components/NewEntryForm";
import DisplayBalance from "./components/DisplayBalance";
import DisplayBalances from "./components/DisplayBalances";
import { useEffect, useState } from "react";
import EntryLines from "./components/EntryLines";
import ModalEdit from "./components/ModalEdit";

function App() {
  const [entries, setEntries] = useState(initialEntries);
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [isExpense, setIsExpense] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [entryId, setEntryId] = useState();
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!isOpen && entryId) {
      const index = entries.findIndex((entry) => entry.id === entryId);
      const newEntries = [...entries];
      console.log(newEntries);
      newEntries[index].description = description;
      newEntries[index].isExpense = isExpense;
      newEntries[index].value = value;
      setEntries(newEntries);
     
    }
    // eslint-disable-next-line 
  }, [isOpen]);

  useEffect(() => {
    let totalIncome = 0;
    let totalExpense = 0;

    entries.map((entry) => {
      if (entry.isExpense) {
        return (totalExpense += Number(entry.value));
      }
      return (totalIncome +=  Number(entry.value));
    });
    setTotal(totalIncome - totalExpense);
    setExpenseTotal(totalExpense);
    setIncomeTotal(totalIncome);
  }, [entries]);

  function deleteEntry(id) {
    const result = entries.filter((entry) => entry.id !== id);
    setEntries(result);
  }

  function addEntry() {
    const result = entries.concat({
      id: entries.length + 1,
      description,
      value,
      isExpense,
    });
    setEntries(result);
    resetEntry();
  }

  function resetEntry() {
    setDescription("");
    setValue("");
    setIsExpense(true);
  }

  function editEntry(id) {
    console.log(`edit entry with id ${id}`);
    if (id) {
      console.log(id);
      const index = entries.findIndex((entry) => entry.id === id);
      const entry = entries[index];
      setEntryId(id);
      setDescription(entry.description);
      setValue(entry.value);
      setIsExpense(entry.isExpense);
      setIsOpen(true);
    }
  }

  return (
    <Container>
      <MainHeader title={"Budget"} />
      <DisplayBalance title="Your Balance" value={total} size="small" />
      <DisplayBalances expenseTotal={expenseTotal} incomeTotal={incomeTotal}/>
      <MainHeader title="History" type="h3" />
      <EntryLines
        entries={entries}
        deleteEntry={deleteEntry}
        editEntry={editEntry}
      />
      <MainHeader title="Add new transaction" type="h3" />
      <NewEntryForm
        addEntry={addEntry}
        description={description}
        value={value}
        isExpense={isExpense}
        setDescription={setDescription}
        setValue={setValue}
        setIsExpense={setIsExpense}
      />
      <ModalEdit
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addEntry={addEntry}
        description={description}
        value={value}
        isExpense={isExpense}
        setDescription={setDescription}
        setValue={setValue}
        setIsExpense={setIsExpense}
      />
    </Container>
  );
}

export default App;

var initialEntries = [
  {
    id: 1,
    description: "Work income",
    value: 1000.0,
    isExpense: false,
  },
  {
    id: 2,
    description: "Water bill",
    value: 20.0,
    isExpense: true,
  },
  {
    id: 3,
    description: "Rent",
    value: 20.0,
    isExpense: true,
  },
  {
    id: 4,
    description: "Power bill",
    value: 50.0,
    isExpense: true,
  },
];
