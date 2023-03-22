import Image from 'next/image';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import {
    ArrayParam,
    NumberParam,
    StringParam,
    useQueryParams,
    withDefault,
  } from 'use-query-params';
import { IHeaderOptions } from '@/types/IHeader';
import Link from 'next/link'


export function Header({postsLoading}: IHeaderOptions) {
    const [query, setQuery] = useQueryParams({
        text: withDefault(StringParam, null),
        page: withDefault(NumberParam, 1),
        tags: withDefault(ArrayParam, []),
        selectedPostId: StringParam,
      });

    return <header className="border-b border-gray-light p-4 md:py-6">
    <section className="container flex justify-center items-center flex-wrap gap-3 md:justify-start md:flex-nowrap ">
      <section className="flex justify-center items-center w-full md:w-1/4 md:justify-start">
      <Link href="/" className='text-black'>
          <Image
            alt=""
            src={'/assets/Logo.svg'}
            width={40}
            height={40}
            className="object-contain object-center"
          />
          <h1 className="font-medium text-2xl inline-block">Puravida</h1>
        </Link>
      </section>
      <Input
        className="rounded-full md:max-w-md"
        size="large"
        prefix={<SearchOutlined />}
        placeholder="Restaurants"
        suffix={postsLoading && query.text ? <LoadingOutlined /> : null}
        onChange={(event) =>
          setQuery({ text: event.target.value.trim() || null })
        }
        value={query?.text as string}
      />
    </section>
  </header>
}