import { getLocale } from 'next-intl/server';
import {setRequestLocale} from 'next-intl/server';
import { redirect } from 'next/navigation';



export default async function IndexPage() {
  const locale = await getLocale()
  setRequestLocale(locale);
  redirect( `${locale}/start`)
  return (
    <></>
  );
}
