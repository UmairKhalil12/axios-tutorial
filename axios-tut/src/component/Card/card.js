import { useState } from 'react';
import Modal from '../Modal/Modal';
import { updateProduct, deleteProduct,getDataById } from '../../axios/axios'
import './card.css'

export default function Card({ name, detail, price, updateId }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form, setForm] = useState({
        name: name,
        detail: detail,
        price: price
    })

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log('form', form);
        try {
            const response = await updateProduct(form, updateId);
            closeModal();
            // console.log(response);
        }
        catch (error) {
            console.log(error.message);
        }
    }

    const handleDelete = async () => {
        try {
            const res = await deleteProduct(updateId);
            console.log(res); 
        }
        catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className='card-div' onClick={()=>getDataById(updateId)}>
            <div>
                <h3>{name}</h3>
                <p>{detail}</p>
                <div className='price-edit'>
                    <p>{price}</p>
                    <button className='edit-btn' onClick={openModal}>Edit</button>
                    <button className='edit-btn' onClick={handleDelete}>Delete</button>
                </div>
                <Modal isOpen={isModalOpen} onClose={closeModal} >
                    <h2>Edit Product Model </h2>
                    <form onSubmit={handleFormSubmit}>
                        <input placeholder='name' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        <input placeholder='detail' value={form.detail} onChange={(e) => setForm({ ...form, detail: e.target.value })} />
                        <input placeholder='price' value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                        <button type='submit'>save changes</button>
                    </form>
                </Modal>
            </div>
        </div>
    )
}
