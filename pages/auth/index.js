import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
import Head from 'next/head'

import useAuth from '../../hooks/useAuth'
import { withPublic } from '../../hooks/route'

import Layout from '../../components/layout'
import { Button } from '../../components/Button'
import LoginButton from '../../components/LoginButton'

function authPage() {
  const { loginGoogle, loginGithub } = useAuth()

  const denyLogin = () => {
    sessionStorage.clear()
    Router.push('/auth')
  }

  return (
    <Layout>
      <Head>
        <title>Login - Bootcamp Web3Dev</title>
      </Head>
      <div className="bg-gray-50 dark:bg-black-300 ">
        <div className="items-center justify-center px-4 py-9 sm:px-6 md:flex md:px-10 md:py-20 xl:px-20 2xl:container 2xl:mx-auto ">
          <div className="mb-6 flex items-center justify-center sm:mb-8 sm:flex sm:items-center md:hidden lg:hidden">
            <Image src="/assets/img/w3d-logo-symbol-ac.svg" width={42} height={42} />
            <h2 className="pl-3 text-xl font-bold leading-normal text-black-300 dark:text-white-100 sm:block">
              web3dev
            </h2>
          </div>
          {sessionStorage.getItem('credential') ? (
            <>
              <div className="w-full rounded bg-white-100 px-6 py-6 shadow-lg dark:bg-black-200 sm:px-6 sm:py-10 md:w-1/2 lg:w-5/12 lg:px-10 xl:w-1/3">
                <h3>Deseja vincular o github à sua conta já cadastrada?</h3>
                <div className="flex w-full justify-around">
                  <Button customClass={'bg-slate-300'} onClick={() => denyLogin()}>
                    Não
                  </Button>
                  <Button onClick={() => loginGoogle()}>Sim</Button>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full rounded bg-white-100 px-6 shadow-lg dark:bg-black-200 sm:px-6 sm:py-10 md:w-1/2 lg:w-5/12 lg:px-10 xl:w-1/3">
                  <div className="mt-8"> 

                    <Link href='/auth/signup'>
                      <a>
                        <Button customClass={'w-full'}>
                          Login com e-mail
                        </Button>
                      </a>
                    </Link>

                  </div>
                
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
                loginGoogle={() => loginGoogle()}
                textContent={'Login com o Google'}
                imgSize={'40'}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default withPublic(authPage)
