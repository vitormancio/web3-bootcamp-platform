import Layout from '../../../components/layout'
import { withPublic } from '../../../hooks/route'
import Head from 'next/head'
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { toast } from 'react-toastify'
import { useState} from 'react';
import { useForm } from 'react-hook-form'
import { useEffect } from 'react';

function emailConfirmLogin () {
const auth = getAuth();
const [email,setEmail] = useState(undefined)

const { register, handleSubmit } = useForm()
    const onSignUpSubmit = (data) => {
    const emailFromInput = data.email
    setEmail(emailFromInput)  
}

const onSignUpError = (errors, e) => {
  toast.error(errors, e, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}

useEffect(() => {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    

    setEmail(window.localStorage.getItem('emailForSignIn'));

    if (!email) return
  
    signInWithEmailLink(auth, email, window.location.href)
      .then((result) => {
  
        window.localStorage.removeItem('emailForSignIn');
        toast.success('Login confirmado', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      })
      .catch((error) => {
        toast.error(error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      });
    }},[email])



 return (
    <Layout>
        <Head>
            <title>Confirmação email - Bootcamp Web3Dev</title>
        </Head>
        { !email ?  
        <div className="bg-gray-50 dark:bg-black-300">
        <div className="items-center justify-center px-4 py-9 sm:px-6 md:flex md:px-10 md:py-12 xl:px-20 2xl:container 2xl:mx-auto">
          
          <div className="w-full rounded bg-white-100 px-6 py-6 shadow-lg dark:bg-black-200 sm:px-6 sm:py-10 md:w-1/2 lg:w-5/12 lg:px-10 xl:w-1/3">
            <form onSubmit={handleSubmit(onSignUpSubmit, onSignUpError)}>
                <div className="pt-6">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium leading-none text-black-300 dark:text-white-100"
                  >
                    {' '}
                    E-mail{' '}
                  </label>
                  <input
                    id="email"
                    aria-labelledby="email"
                    type="email"
                    className="mt-2 w-full rounded border bg-gray-200 py-3 pl-3 text-xs font-medium leading-none text-gray-800 placeholder-gray-800"
                    placeholder="ex: silva@gmail.com"
                    {...register('email', {
                      required: 'Por favor, insira seu e-mail',
                      message: 'E-mail invalido',
                      pattern:
                        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i,
                    })}
                  />
                </div>
                
                <div className="mt-8">
                  <button
                    role="button"
                    className="w-full rounded bg-primary-300 py-4 text-sm font-semibold leading-none text-white-100 transition duration-150 ease-in-out hover:bg-primary-400 focus:outline-none focus:ring-0 focus:ring-primary-300 focus:ring-offset-2 dark:text-black-300"
                    type="submit"
                  >
                    Confirmar
                  </button>
                </div>
              </form>
                    </div>
                    </div>
                    </div>
                    
            
              : null
              } 
    </Layout>
 )
}

export default withPublic(emailConfirmLogin)

