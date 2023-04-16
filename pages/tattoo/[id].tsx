import Image from 'next/image';
import Link from 'next/link';
import AppNavbar from '@/components/navbars/app-navbar';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import prisma from '@/utils/use-prisma';
import { Generation, User } from '@prisma/client';
import { FC } from 'react';
import { GetServerSidePropsContext } from 'next';

const Tattoo = () => {
  return (
    <>
    </>
  )
};

export const getServerSideProps = (context: GetServerSidePropsContext) => {  
  const { query } = context;
  console.log(query)
};

export default Tattoo;
