"use client"

import React from 'react'
import { useState } from 'react'
import Script from 'next/script'
import { initiate } from '@/actions/useractions'
import { useSession } from 'next-auth/react'

const PaymentPage = ({ username }) => {
    // const {data:session}=useSession()

    const [paymentform, setPaymentform] = useState({})
    const [currentUser, setcurrentUser] = useState({})


    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
        console.log(paymentform)
    }
    
    const getData =async (params)=>{
     let u=await fetchuser(username)
     setcurrentUser(u)
    }

    const pay = async (amount) => {
    
        //Get the order ID
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id

        var options = {
            "key": process.env.NEXT_PUBLIC_KEY_ID, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get Me A Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new  window.Razorpay(options);
        rzp1.open();

    }

    return (
        <>
  
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>


            <div className='cover w-full  relative'>
                <img className='  object-cover w-full h-[48vh]' src="/node.jpg" alt="" />
                <div className=' absolute  -bottom-16 right-[46%] '>
                    <img className='  w-[100px]  rounded-xl border-2 border-[#545368] ' src="/nodelogo.jpg" alt="" />
                </div>
            </div>
            <div className="info flex justify-center items-center my-20 flex-col gap-1 ml-5">
                <div className='font-bold text-lg'>

                    @{username}
                </div>
                <div className="text-slate-400">Once a NODE always a NODE</div>
                <div className="text-slate-400">9,999 members. 999 posts. $9999/release</div>

                <div className="payment flex gap-3 w-[80%] mt-11  ">
                    <div className="supporters bg-slate-900 w-1/2 rounded-lg p-7 h-[60vh] overflow-auto scrollbar-hide ">
                        <h2 className='text-2xl  font-bold  my-5'>Supporters</h2>
                        <ul className='mx-5'>
                            <li className='my-4 mb-2 flex gap-2 items-center' >
                                <img width={35} src="/avatar.gif" alt="Avatar" />
                                <span> Node donated <span className='font-bold'>$30</span> with a messgae: " ❤️ From NODE "</span></li>
                            <li className='my-4 mb-2 flex gap-2 items-center' >
                                <img width={35} src="/avatar.gif" alt="Avatar" />
                                <span> Node donated <span className='font-bold'>$30</span> with a messgae: " ❤️ From NODE "</span></li>
                            <li className='my-4 mb-2 flex gap-2 items-center' >
                                <img width={35} src="/avatar.gif" alt="Avatar" />
                                <span> Node donated <span className='font-bold'>$30</span> with a messgae: " ❤️ From NODE "</span></li>
                            <li className='my-4 mb-2 flex gap-2 items-center' >
                                <img width={35} src="/avatar.gif" alt="Avatar" />
                                <span> Node donated <span className='font-bold'>$30</span> with a messgae: " ❤️ From NODE "</span></li>
                            <li className='my-4 mb-2 flex gap-2 items-center' >
                                <img width={35} src="/avatar.gif" alt="Avatar" />
                                <span> Node donated <span className='font-bold'>$30</span> with a messgae: " ❤️ From NODE "</span></li>
                            <li className='my-4 mb-2 flex gap-2 items-center' >
                                <img width={35} src="/avatar.gif" alt="Avatar" />
                                <span> Node donated <span className='font-bold'>$30</span> with a messgae: " ❤️ From NODE "</span></li>
                            <li className='my-4 mb-2 flex gap-2 items-center' >
                                <img width={35} src="/avatar.gif" alt="Avatar" />
                                <span> Node donated <span className='font-bold'>$30</span> with a messgae: " ❤️ From NODE "</span></li>
                            <li className='my-4 mb-2 flex gap-2 items-center' >
                                <img width={35} src="/avatar.gif" alt="Avatar" />
                                <span> Node donated <span className='font-bold'>$30</span> with a messgae: " ❤️ From NODE "</span></li>
                            <li className='my-4 mb-2 flex gap-2 items-center' >
                                <img width={35} src="/avatar.gif" alt="Avatar" />
                                <span> Node donated <span className='font-bold'>$30</span> with a messgae: " ❤️ From NODE "</span></li>

                        </ul>
                    </div>
                    <div className="makePayment bg-slate-900 w-1/2 rounded-lg p-7 h-[60vh]">
                        <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>
                        <div className="flex gap-2 flex-col">
                            <div>
                            <input onChange={handleChange} value={paymentform.name} type="" name='name' className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Name' />
                            </div>
                            <input onChange={handleChange} value={paymentform.message} type="" name='message' className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Message' />
                                <input onChange={handleChange} value={paymentform.amount} type="" name='amount' className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Amount' />
                            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  m-2">Pay</button>
                        </div>
                        <div className='flex gap-2 mt-5'>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(1000)} >Pay ₹10</button>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(2000)} >Pay ₹20</button>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(3000)} >Pay ₹30</button>
                        </div>

                    </div>
                </div>
            </div> onClick={() => pay(10)}

        </>
    )
}

export default PaymentPage
