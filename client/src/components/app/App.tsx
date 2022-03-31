import React, { useEffect, useState } from 'react';
import logo from '../../logo.svg';
import { Input } from "../input";
import axios from 'axios'

import './App.scss';

type FormInput = {
  id: string,
  name: string,
  label: string,
  type?: string
}

type IClients = {
  id: number,
  name: string,
  surname: string,
  identificationType: string,
  identification: string,
  age: number,
  birthplace: string,
  img: string
};

function App() {

  const defaultForm: IClients = {
    id: -1,
    name: "",
    surname: "",
    identificationType: "",
    identification: "",
    age: 0,
    birthplace: "",
    img: ""
  }

  const [form, setForm] = useState<IClients>(defaultForm);
  const [clients, setClients] = useState<Array<IClients | any>>();
  const [img, setImg] = useState<any>();
  const [btnText, setBtnText] = useState<string>("Crear Cliente");

  const toBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = err => reject(err);
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0)
      toBase64(e.currentTarget.files[0])
        .then((baseFile) => setImg(baseFile))
        .catch(err => alert(err))
    else
      setForm({
        ...form,
        [e.currentTarget.name]:
          e.currentTarget.type === 'number' ? Number(e.currentTarget.value) : e.currentTarget.value
      });
  }

  const getClients = () =>
    axios
      .get<Array<IClients>>('http://localhost:5000/clients')
      .then(res => setClients(res.data))
      .catch(err => console.log(err));

  const createClient = () => {
    if (isValidObject({ ...form, img }))
      axios
        .post('http://localhost:5000/clients', {
          ...form,
          img
        })
        .then((res) => { console.log('res', res); getClients(); setForm(defaultForm); })
        .catch(err => console.log(err))
    else alert('no podemos crear el cliente, faltan campos por completar')
  }

  const deleteUser = (id: number) => {
    if (window.confirm('Seguro de eliminar este usuario ?'))
      axios.delete('http://localhost:5000/clients/' + id.toString()).then(res => { alert(res.data.msg); getClients(); }).catch(err => alert(err))
  }

  const updateClient = () => {
    if (isValidObject({ ...form, img }))
      axios.put('http://localhost:5000/clients', form).then(() => {
        setForm(defaultForm)
        setImg("")
        getClients()
        setForm(defaultForm)
        setBtnText("Crear Cliente")
      }).catch(err => alert(err))
  }

  const isValidObject = (obj: IClients): boolean =>
    !Object.values(obj).every(value => value !== null || value !== 0 || value !== "")


  const setClientToUpdate = (client: IClients) => { setForm({ ...client }); setImg(client.img); setBtnText("Actualizar Cliente") };


  useEffect(() => {
    getClients()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        <section className='App-content'>
          <section className="App-form">
            {/* {
              inputs.map((input, key) => {
                return <Input key={key} id={input.id} name={input.name} label={input.label} type={input.type} onChange={handleChange} />
              })
            } */}
            <Input id={"name"} name={"name"} label={"Nombre"} type={"text"} value={form.name} onChange={handleChange} />
            <Input id={"surname"} name={"surname"} label={"Apellido"} type={"text"} value={form.surname} onChange={handleChange} />
            <Input id={"identificationType"} name={"identificationType"} label={"Tipo Identificación"} type={"text"} value={form.identificationType} onChange={handleChange} />
            <Input id={"identification"} name={"identification"} label={"Identificación"} type={"text"} value={form.identification} onChange={handleChange} />
            <Input id={"age"} name={"age"} label={"edad"} type={"number"} value={form.age.toString()} onChange={handleChange} />
            <Input id={"birthplace"} name={"birthplace"} label={"Lugar de Nacimiento"} type={"text"} value={form.birthplace} onChange={handleChange} />
            <Input id={"img"} name={"img"} label={"Cargar Foto"} type={"file"} value={""} onChange={handleChange} />
          </section>
          <section className="App-image">
            <img src={img ? img : logo} alt="client_image" width="300" />
            <button onClick={btnText !== "Actualizar Cliente" ? createClient : updateClient}>{btnText}</button>
          </section>
        </section>
        <section className="App-data">
          <table>
            <thead>
              <tr>
                <th>Identificacion</th>
                <th>Nombre Completo</th>
                <th>Edad</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {
                clients && clients?.length > 0 ?
                  clients.map((client, key) => (
                    <tr key={key}>
                      <td>{client.identification}</td>
                      <td>{client.name + ' ' + client.surname}</td>
                      <td><img src={client.img} alt={client.name} width="100" /></td>
                      <td>
                        <button className='__delete' onClick={() => { deleteUser(client.id) }}>eliminar</button>
                        <button className='__update' onClick={() => { setClientToUpdate(client) }}>actualizar</button>
                      </td>
                    </tr>
                  )) :
                  <></>
              }
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default App;
