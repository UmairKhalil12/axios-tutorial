import './App.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { getAllData, addProduct } from './axios/axios';
import Card from './component/Card/card';
import Modal from './component/Modal/Modal';

function App() {
  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    name: '',
    detail: '',
    price: ''
  })

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchdata = async () => {
      const res = await getAllData();
      setData(res)
    }
    fetchdata();

  }, [data])

  // console.log(data);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addProduct(form);
      console.log(res);
      closeModal();
    }
    catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Axios Tutorial</h1>
        <button onClick={openModal} className='btn-add' >Add Product</button>
        <Modal isOpen={isModalOpen} onClose={closeModal} >
          <form onSubmit={handleFormSubmit}>
            <input placeholder='name' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input placeholder='detail' value={form.detail} onChange={(e) => setForm({ ...form, detail: e.target.value })} />
            <input placeholder='price' value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            <button type='submit'>Add product</button>
          </form>
        </Modal>
        <div className='products'>
          {data?.map((d) => {
            return (
              <Card name={d.name} detail={d.detail} price={d.price} updateId={d.id} key={d.id} />
            )
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
