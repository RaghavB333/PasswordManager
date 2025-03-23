import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {

  const ref = useRef()
  const passwordRef = useRef()
  const [form, setForm] = useState({ site: '', username: '', password: '' })
  const [passwordArray, setPasswordArray] = useState([])

  const getpasswords = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    console.log(passwords)
    setPasswordArray(passwords)
  }

  useEffect(() => {
    getpasswords()
  }, [])


  const showPassword = () => {
    // alert("Show the password")
    // console.log(ref.current.src)
    passwordRef.current.type = "text"
    if (ref.current.src.includes("/eyeclose.png")) {
      ref.current.src = "/eye.png"
      passwordRef.current.type = "password"
    }
    else {
      ref.current.src = "/eyeclose.png"
      passwordRef.current.type = "text"
    }
  }

  const savePassword = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      //if any suh id exists in db,delete it

      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
      await fetch("http://localhost:3000/", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() })
      })
      // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
      setForm({ site: '', username: '', password: '' })
      toast('Password Saved Successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        // transition: Bounce,
      });
    }
    else {
      toast('Password not saved!', {
        theme: "dark",
      })
    }
  }
  const deletePassword = async (id) => {
    setPasswordArray(passwordArray.filter(item => item.id !== id))
    let res = await fetch("http://localhost:3000/", {
      method: "DELETE", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    })
    toast('Password deleted successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      // transition: Bounce,
    });


    // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))




  }
  const editPassword = async (id) => {
    setForm({ ...passwordArray.filter(i => i.id === id)[0], id: id })
    setPasswordArray(passwordArray.filter(item => item.id !== id))
    console.log(form)
    await fetch("http://localhost:3000/", {
      method: "DELETE", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: form.id })
    })

    // toast('Password Edited Successfully!', {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "dark",
    //   // transition: Bounce,
    // });
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })

  }

  const copyText = (text) => {
    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      // transition: Bounce,
    });
    navigator.clipboard.writeText(text)
  }


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition='Bounce'
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full bg-green-50 w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]">


      </div></div>
      <div className="p-2 md:p-0 md:mycontainer md:mx-48 md:w-[calc(100vw-24rem)]">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-700">&lt;</span>
          <span>MyPass</span>
          <span className="text-green-500">Man/&gt;</span>
        </h1>
        <p className='text-green-900 text-lg text-center'>Your very own password manager to manage your important passwords</p>
        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input value={form.site} onChange={handleChange} className='rounded-xl w-full border border-green-500 py-1 px-4' type="text" name="site" id="site" placeholder='Enter Website URL' />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input value={form.username} onChange={handleChange} className='rounded-xl w-full border border-green-500 py-1 px-4' type="text" name="username" id="username" placeholder='Enter Username' />
            <div className='relative'>
              <input ref={passwordRef} value={form.password} onChange={handleChange} className='rounded-xl w-full border border-green-500 py-1 px-4' type="password" name="password" id="" password placeholder='Enter Password' />
              <span className='absolute right-[1px] top-[3px] cursor-pointer' onClick={showPassword}>
                <img ref={ref} className='p-1' src="/eye.png" alt="eye" width={30} />
              </span>
            </div>
          </div>
          <button onClick={savePassword} className='flex gap-2 justify-center items-center bg-green-400 hover:bg-green-300 rounded-full px-4 py-2 w-fit border-green-900 border'>
            <lord-icon
              src="https://cdn.lordicon.com/ftndcppj.json"
              trigger="hover"
              colors="primary:#000000,secondary:#d1f3fa">
            </lord-icon>
            Save Password</button>
        </div>
        <div className="passwords">
          <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-5 max-w-[80vw]">
            <thead className='bg-green-800 text-white'>
              <tr>
                <th className='py-3'>Site</th>
                <th className='py-2'>Username</th>
                <th className='py-2'>Password</th>
                <th className='py-2'>Action</th>
              </tr>
            </thead>
            <tbody className='bg-green-100'>
              {passwordArray.map((item, index) => {
                if (item.site) {
                  return <tr key={index}>
                    <td className='py-2 border border-white'>
                      <div className='flex justify-center items-center gap-4'>
                        <a href={item.site} target="_blank">{item.site}</a>
                        <div >
                          <lord-icon
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                            colors="primary:#000000"
                            class="cursor-pointer size-7 pt-1"
                            onClick={() => copyText(item.site)}>
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='py-2 border border-white text-center'>
                      <div className='flex justify-center items-center gap-4'>
                        <span>{item.username}</span>
                        <div>
                          <lord-icon
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                            colors="primary:#000000"
                            class="cursor-pointer size-7 pt-1"
                            onClick={() => copyText(item.username)}>
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='py-2 border border-white text-center'>
                      <div className='flex justify-center items-center gap-4'>
                        <span>{"*".repeat(item.password.length)}</span>
                        <div>
                          <lord-icon
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                            colors="primary:#000000"
                            class="cursor-pointer size-7 pt-1"
                            onClick={() => copyText(item.password)}>
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='py-2 border border-white text-center'>
                      <span className='cursor-pointer' onClick={() => editPassword(item.id)}><lord-icon
                        src="https://cdn.lordicon.com/wuvorxbv.json"
                        trigger="hover"
                        stroke="bold"
                        state="hover-line"
                        colors="primary:#000000,secondary:#109173"
                      >
                      </lord-icon></span>

                      <span className='cursor-pointer' onClick={() => confirm("Are you sure u want to delete this password") ? deletePassword(item.id) : ""}><lord-icon
                        src="https://cdn.lordicon.com/skkahier.json"
                        trigger="hover"
                        colors="primary:#000000"
                      >
                      </lord-icon></span>
                    </td>
                  </tr>

                }
              })}
            </tbody>
          </table>}
        </div>
      </div>
    </>
  )
}

export default Manager
