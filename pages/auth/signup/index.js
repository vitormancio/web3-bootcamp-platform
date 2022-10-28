import Link from 'next/link'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import useAuth from '../../../hooks/useAuth'
import { withPublic } from '../../../hooks/route'
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import Layout from '../../../components/layout'
import LoginButton from '../../../components/LoginButton'

const actionCodeSettings = {
  url:'http://localhost:3000/auth/email-confirm-login',
  handleCodeInApp:true
};


function signUpPage() {
  
  const { loginGoogle, loginGithub } = useAuth()

  const { register, handleSubmit } = useForm()
  
  const onSignUpSubmit = (data) => {
    const email = data.email
    
    const auth = getAuth();
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem('emailForSignIn', email);
        toast.success('Email enviado com sucesso, verifique seu e-mail', {
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
      })
      .catch((error) => { 
        toast.error(error.code,error.message,{
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        
        
      });
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


  return (
    <>
      <Layout>
        <Head>
          <title>Cadastro - Bootcamp Web3Dev</title>
        </Head>
        <div className="bg-gray-50 dark:bg-black-300">
          <div className="items-center justify-center px-4 py-9 sm:px-6 md:flex md:px-10 md:py-12 xl:px-20 2xl:container 2xl:mx-auto">
            <div className="w-full rounded bg-white-100 px-6 py-6 shadow-lg dark:bg-black-200 sm:px-6 sm:py-10 md:w-1/2 lg:w-5/12 lg:px-10 xl:w-1/3">
              <form onSubmit={handleSubmit(onSignUpSubmit, onSignUpError)}>
                <div className="pt-6">
                  <label htmlFor="email">
                    
                  </label>
                  <p className='text-sm'>Informe seu e-mail para enviarmos o link de acesso à plataforma.</p>
                  <p className='font-bold text-xs'>⚠️ Não esqueça de verificar a caixa de spam.</p>
                  <input
                    id="email"
                    aria-labelledby="email"
                    type="email"
                    className="mt-2 w-full rounded border bg-gray-200 py-3 pl-3 text-xs font-medium leading-none text-gray-800 placeholder-gray-800"
                    placeholder="Digite aqui seu e-mail"
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
                    Login com e-mail
                  </button>
                </div>
              </form>

              <div className="flex w-full items-center justify-between py-5">
                <hr className="w-full bg-gray-400" />
                <p className="px-2.5 text-base font-medium leading-4 text-gray-500">OU</p>
                <hr className="w-full bg-gray-400" />
              </div>
              <LoginButton
                id={'sign-in-with-github'}
                imgSrc={'/assets/img/GitHub-Logo.svg'}
                alt="GitHub-Login-Icon"
                loginGithub={() => loginGithub()}
                textContent={'Login com o Github'}
                imgSize={'32'}
              />
              <LoginButton
                id={'sign-in-with-google'}
                imgSrc={'/assets/img/google-logo.svg'}
                alt="Google-Login-Icon"
                textContent={'Login com o Google'}
                loginGoogle={() => loginGoogle()}
                imgSize={'40'}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}


export default withPublic(signUpPage)
